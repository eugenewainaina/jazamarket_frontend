import React, { useState, useEffect } from 'react';
import './PostAdForm.css';
import { categories, vehicleSubcategories, propertySubcategories } from '../../data/categories';
import { validateString, validatePrice } from '../../validation/validators';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { formatString, formatNumberString } from '../../utils/formatters';
import { createApiUrl } from '../../utils/api';

interface PostAdFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PostAdForm: React.FC<PostAdFormProps> = ({ onClose, onSuccess }) => {
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
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    server: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isExtraFieldsVisible, setIsExtraFieldsVisible] = useState(true);

  const validate = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        error = validateString(value, 'Name');
        break;
      case 'price':
        error = validatePrice(value);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    // Cleanup the object URL on component unmount
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, server: '' }));

    const nameError = validateString(formData.name, 'Name');
    const priceError = validatePrice(formData.price);

    if (nameError || priceError) {
      setErrors({ name: nameError, price: priceError, server: '' });
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
    if (file) {
      postData.append('ad_image', file);
    }

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
      const response = await fetch(createApiUrl('/post_ad'), {
        method: 'POST',
        body: postData,
        // Note: Don't set 'Content-Type' header when using FormData,
        // the browser will set it automatically with the correct boundary.
      });

      if (response.ok) {
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        setErrors((prev) => ({ ...prev, server: errorData.message || 'Failed to post ad.' }));
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
        <h3>Post a New Ad</h3>
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
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
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

          <div className="form-group">
            <label htmlFor="ad_image">Image (Optional)</label>
            <input
              type="file"
              id="ad_image"
              name="ad_image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Ad preview" />
              </div>
            )}
          </div>

          <div className="form-buttons">
            <button type="button" className="btn btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-submit" disabled={!isFormValid || isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdForm;
