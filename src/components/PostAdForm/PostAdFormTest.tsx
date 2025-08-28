import React, { useState, useEffect } from 'react';
import './PostAdFormTest.css';
import { categories, vehicleSubcategories, propertySubcategories } from '../../data/categories';
import { kenyanCounties } from '../../data/counties';
import { validateString, validatePrice } from '../../validation/validators';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { formatString, formatNumberString } from '../../utils/formatters';
import { createApiUrl } from '../../utils/api';

interface PostAdFormTestProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface ProcessedImage {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  compressedSize: number;
}

const PostAdFormTest: React.FC<PostAdFormTestProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    category: '',
    subcategory: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'used',
    transmission: 'automatic',
    fuelType: '',
    bedrooms: '',
    bathrooms: '',
    landSize: '',
    petFriendly: 'false',
  });

  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    location: '',
    images: '',
    server: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isExtraFieldsVisible, setIsExtraFieldsVisible] = useState(true);

  // Image processing utility functions
  const resizeImageTo1080p = (file: File, quality: number = 0.85): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = function() {
        // 1080p dimensions (1920x1080)
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        
        let { width, height } = img;
        
        // Check if image is already within 1080p limits
        if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
          // Image is already small enough, return original file as blob
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: file.type });
            resolve(blob);
          };
          reader.readAsArrayBuffer(file);
          return;
        }
        
        // Calculate aspect ratio for resizing
        const aspectRatio = width / height;
        
        // Resize to fit within 1080p while maintaining aspect ratio
        if (aspectRatio > MAX_WIDTH / MAX_HEIGHT) {
          // Image is wider than 16:9 ratio
          width = MAX_WIDTH;
          height = MAX_WIDTH / aspectRatio;
        } else {
          // Image is taller than 16:9 ratio
          height = MAX_HEIGHT;
          width = MAX_HEIGHT * aspectRatio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw the resized image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with quality control (only for oversized images)
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const processImages = async (files: FileList): Promise<ProcessedImage[]> => {
    const processedImages: ProcessedImage[] = [];
    
    for (let i = 0; i < Math.min(files.length, 10); i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} is not an image file`);
      }
      
      // Check original file size (20MB max before processing)
      if (file.size > 20 * 1024 * 1024) {
        throw new Error(`${file.name} is too large. Please select a smaller image.`);
      }
      
      try {
        // Resize to 1080p max (or keep original if smaller)
        const resizedBlob = await resizeImageTo1080p(file, 0.85);
        
        // Check if the image was actually resized (different size means it was processed)
        const wasResized = resizedBlob.size !== file.size || resizedBlob.type !== file.type;
        
        // Create new file object with appropriate name and type
        const processedFile = new File([resizedBlob], 
          wasResized ? `processed_${file.name.replace(/\.[^/.]+$/, '.jpg')}` : file.name, {
          type: resizedBlob.type,
          lastModified: Date.now()
        });
        
        const processedImage: ProcessedImage = {
          id: `img_${Date.now()}_${i}`,
          file: processedFile,
          preview: URL.createObjectURL(resizedBlob),
          originalSize: file.size,
          compressedSize: resizedBlob.size
        };
        
        processedImages.push(processedImage);
      } catch (error) {
        throw new Error(`Error processing ${file.name}`);
      }
    }
    
    return processedImages;
  };

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        error = validateString(value, 'Name');
        break;
      case 'price':
        error = validatePrice(value);
        break;
      case 'location':
        error = value ? '' : 'Location is required';
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsProcessingImages(true);
    setErrors((prev) => ({ ...prev, images: '' }));
    
    try {
      // Check if adding these images would exceed the limit
      const totalImages = images.length + e.target.files.length;
      if (totalImages > 10) {
        throw new Error(`You can only upload up to 10 images. You currently have ${images.length} image(s) and are trying to add ${e.target.files.length} more.`);
      }
      
      const newProcessedImages = await processImages(e.target.files);
      setImages(prev => [...prev, ...newProcessedImages]);
      
      // Clear the input to allow selecting the same files again if needed
      e.target.value = '';
    } catch (error) {
      setErrors((prev) => ({ 
        ...prev, 
        images: error instanceof Error ? error.message : 'Error processing images' 
      }));
    } finally {
      setIsProcessingImages(false);
    }
  };

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, images: 'Please select a valid image file' }));
        return;
      }
      
      // Check file size (20MB max)
      if (selectedFile.size > 20 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, images: 'Image is too large. Please select a smaller image.' }));
        return;
      }

      try {
        // Process the main image through the same resizing function
        const resizedBlob = await resizeImageTo1080p(selectedFile, 0.85);
        const wasResized = resizedBlob.size !== selectedFile.size || resizedBlob.type !== selectedFile.type;
        
        const processedFile = new File([resizedBlob], 
          wasResized ? `processed_${selectedFile.name.replace(/\.[^/.]+$/, '.jpg')}` : selectedFile.name, {
          type: resizedBlob.type,
          lastModified: Date.now()
        });

        setMainImage(processedFile);
        setMainImagePreview(URL.createObjectURL(resizedBlob));
      } catch (error) {
        setErrors((prev) => ({ ...prev, images: 'Error processing image' }));
      }
    } else {
      setMainImage(null);
      setMainImagePreview(null);
    }
  };

  const removeImage = (imageId: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== imageId);
    });
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === null || prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === null || prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Handle keyboard navigation for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex]);

  useEffect(() => {
    // Cleanup object URLs on component unmount
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, server: '' }));

    const nameError = validateString(formData.name, 'Name');
    const priceError = validatePrice(formData.price);
    const locationError = formData.location ? '' : 'Location is required';

    if (nameError || priceError || locationError) {
      setErrors({ 
        name: nameError, 
        price: priceError, 
        location: locationError, 
        images: '',
        server: '' 
      });
      return;
    }

    setIsLoading(true);

    const postData = new FormData();
    postData.append('name', formatString(formData.name));
    postData.append('description', formatString(formData.description));
    postData.append('location', formatString(formData.location));
    postData.append('price', formatNumberString(formData.price));
    postData.append('category', formData.category);
    postData.append('subcategory', formatString(formData.subcategory));

    // Append main ad image
    if (mainImage) {
      postData.append('ad_image', mainImage);
    }

    // Append all gallery images
    images.forEach((image, index) => {
      postData.append(`ad_image_gallery_${index}`, image.file);
    });

    if (formData.category === 'Vehicles') {
      postData.append('make', formData.make);
      postData.append('model', formData.model);
      postData.append('year', formData.year);
      postData.append('mileage', formData.mileage);
      postData.append('condition', formData.condition);
      postData.append('transmission', formData.transmission);
      postData.append('fuelType', formData.fuelType);
    }

    if (formData.category === 'Property & Rentals') {
      postData.append('bedrooms', formData.bedrooms);
      postData.append('bathrooms', formData.bathrooms);
      postData.append('landSize', formData.landSize);
      postData.append('petFriendly', formData.petFriendly);
    }

    try {
        const response = await fetch('https://n8n.jazamarket.com/webhook-test/testing', {
        method: 'POST',
        body: postData,
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorText = await response.text();
        setErrors((prev) => ({ ...prev, server: errorText || 'Failed to post ad.' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: 'An error occurred. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = !errors.name && !errors.price && formData.name && formData.price && formData.category;

  const renderSubcategoryOptions = () => {
    if (formData.category === 'Vehicles') {
      return vehicleSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>);
    }
    if (formData.category === 'Property & Rentals') {
      return propertySubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>);
    }
    return <option value="" disabled>Select a category first</option>;
  };

  const renderVehicleFields = () => (
    <>
      <div className="form-group">
        <label>Make</label>
        <input type="text" name="make" value={formData.make} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Model</label>
        <input type="text" name="model" value={formData.model} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Year</label>
        <input type="number" name="year" value={formData.year} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Mileage</label>
        <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Condition</label>
        <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="used">Used</option>
          <option value="new">New</option>
        </select>
      </div>
      <div className="form-group">
        <label>Transmission</label>
        <select name="transmission" value={formData.transmission} onChange={handleChange}>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div className="form-group">
        <label>Fuel Type</label>
        <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} />
      </div>
    </>
  );

  const renderPropertyFields = () => (
    <>
      <div className="form-group">
        <label>Bedrooms</label>
        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Bathrooms</label>
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Land Size (sq meters)</label>
        <input type="text" name="landSize" value={formData.landSize} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Pet Friendly</label>
        <select name="petFriendly" value={formData.petFriendly} onChange={handleChange}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isLoading && <LoadingSpinner />}
        <h3>Post a New Ad (Test Version)</h3>
        <form onSubmit={handleSubmit} className="post-ad-form">
          {errors.server && <p className="error-message">{errors.server}</p>}
          
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'invalid' : ''}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'invalid' : ''}
              required
            >
              <option value="">Select County</option>
              {kenyanCounties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? 'invalid' : ''}
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={!formData.category ? 'invalid' : ''}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              disabled={!formData.category || (formData.category !== 'Vehicles' && formData.category !== 'Property & Rentals')}
            >
              <option value="" disabled>Select a subcategory</option>
              {renderSubcategoryOptions()}
            </select>
          </div>

          {(formData.category === 'Vehicles' || formData.category === 'Property & Rentals') && (
            <div className="collapsible-section">
              <button type="button" onClick={() => setIsExtraFieldsVisible(!isExtraFieldsVisible)} className="collapsible-toggle">
                {isExtraFieldsVisible ? 'Hide' : 'Show'} Extra Details
              </button>
              {isExtraFieldsVisible && (
                <div className="extra-fields">
                  {formData.category === 'Vehicles' && renderVehicleFields()}
                  {formData.category === 'Property & Rentals' && renderPropertyFields()}
                </div>
              )}
            </div>
          )}

          {/* Main Ad Image Section */}
          <div className="form-group">
            <label htmlFor="ad_image">Main Ad Image (Profile Picture)</label>
            <input
              type="file"
              id="ad_image"
              name="ad_image"
              accept="image/*"
              onChange={handleMainImageChange}
            />
            <div className="image-upload-info">
              <small>
                Upload the main image that will represent your ad. Images will be automatically resized to 1080p resolution.
              </small>
            </div>
            {mainImagePreview && (
              <div className="main-image-preview">
                <div className="main-image-container">
                  <img src={mainImagePreview} alt="Main ad preview" />
                  <button
                    type="button"
                    className="remove-main-image-btn"
                    onClick={() => {
                      if (mainImagePreview) {
                        URL.revokeObjectURL(mainImagePreview);
                      }
                      setMainImage(null);
                      setMainImagePreview(null);
                      // Clear the file input
                      const input = document.getElementById('ad_image') as HTMLInputElement;
                      if (input) input.value = '';
                    }}
                    title="Remove main image"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Image Gallery Section */}
          <div className="form-group">
            <label htmlFor="ad_images">Image Gallery (Up to 10 additional images)</label>
            <input
              type="file"
              id="ad_images"
              name="ad_images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={isProcessingImages || images.length >= 10}
            />
            <div className="image-upload-info">
              <small>
                Upload additional images for your ad gallery. Images will be automatically resized to 1080p resolution. 
                {images.length > 0 && ` Currently ${images.length}/10 images selected.`}
              </small>
            </div>
            {errors.images && <p className="error-message">{errors.images}</p>}
            {isProcessingImages && <p className="processing-message">Processing images...</p>}
          </div>

          {/* Image Gallery Previews */}
          {images.length > 0 && (
            <div className="image-previews">
              <h4>Image Gallery Previews</h4>
              <div className="image-grid">
                {images.map((image, index) => (
                  <div key={image.id} className="image-preview-item">
                    <div className="image-container">
                      <img 
                        src={image.preview} 
                        alt={`Gallery Preview ${index + 1}`}
                        onClick={() => openImageModal(index)}
                        className="clickable-image"
                        title="Click to view full size"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(image.id);
                        }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImageIndex !== null && (
            <div className="image-modal-overlay" onClick={closeImageModal}>
              <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeImageModal}
                  title="Close (Esc)"
                >
                  ×
                </button>
                
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="modal-nav-btn prev"
                      onClick={() => navigateImage('prev')}
                      title="Previous image (←)"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="modal-nav-btn next"
                      onClick={() => navigateImage('next')}
                      title="Next image (→)"
                    >
                      ›
                    </button>
                  </>
                )}
                
                <div className="modal-image-container">
                  <img
                    src={images[selectedImageIndex].preview}
                    alt={`Full size preview ${selectedImageIndex + 1}`}
                    className="modal-image"
                  />
                </div>
                
                <div className="modal-image-info">
                  <p>Image {selectedImageIndex + 1} of {images.length}</p>
                </div>
              </div>
            </div>
          )}

          <div className="form-buttons">
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-submit" disabled={!isFormValid || isLoading || isProcessingImages}>
              {isLoading ? 'Submitting...' : isProcessingImages ? 'Processing Images...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdFormTest;
