import React, { useState } from 'react';
import type { MyAdSummary } from '../../types/ads';
import { categories, vehicleSubcategories, propertySubcategories } from '../../data/categories';
import { createApiUrl } from '../../utils/api';
import './EditAdForm.css';

interface EditAdFormProps {
  ad: MyAdSummary;
  onClose: () => void;
  onSuccess: () => void;
}

const EditAdForm: React.FC<EditAdFormProps> = ({ ad, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ ...ad });
  const [adImage, setAdImage] = useState<File | null>(null);
  const [removeAdImage, setRemoveAdImage] = useState(false);
  const [isExtraFieldsVisible, setIsExtraFieldsVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAdImage(e.target.files[0]);
      setRemoveAdImage(false);
    }
  };

  const handleRemoveImage = () => {
    setAdImage(null);
    setRemoveAdImage(true);
    const adImageURLInput = document.getElementById('adImageURL') as HTMLInputElement;
    if (adImageURLInput) {
      adImageURLInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = new FormData();
    
    Object.keys(formData).forEach(key => {
        const adKey = key as keyof MyAdSummary;
        if (formData[adKey] !== undefined && formData[adKey] !== null) {
            postData.append(key, String(formData[adKey]));
        }
    });

    if (adImage) {
      postData.append('ad_image', adImage);
    }
    if (removeAdImage) {
      postData.append('removeAdImage', 'true');
    }

    try {
      const response = await fetch(createApiUrl(`/edit_ad?ad_id=${ad._id}`), {
        method: 'POST',
        credentials: 'include',
        body: postData,
      });

      if (response.ok) {
        onSuccess();
      } else {
        console.error('Failed to update ad');
      }
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const renderSubcategoryOptions = () => {
    if (formData.category === 'Vehicles') {
      return vehicleSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>);
    }
    if (formData.category === 'Property & Rentals') {
      return propertySubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>);
    }
    return null;
  };

  const renderVehicleFields = () => (
    <>
      <label>Make:</label>
      <input type="text" name="make" value={formData.make || ''} onChange={handleInputChange} />
      <label>Model:</label>
      <input type="text" name="model" value={formData.model || ''} onChange={handleInputChange} />
      <label>Year:</label>
      <input type="number" name="year" value={formData.year || ''} onChange={handleInputChange} />
      <label>Mileage:</label>
      <input type="number" name="mileage" value={formData.mileage || ''} onChange={handleInputChange} />
      <label>Condition:</label>
      <select name="condition" value={formData.condition || 'used'} onChange={handleInputChange}>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
      <label>Transmission:</label>
      <select name="transmission" value={formData.transmission || 'automatic'} onChange={handleInputChange}>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
      <label>Fuel Type:</label>
      <input type="text" name="fuelType" value={formData.fuelType || ''} onChange={handleInputChange} />
    </>
  );

  const renderPropertyFields = () => (
    <>
      <label>Bedrooms:</label>
      <input type="number" name="bedrooms" value={formData.bedrooms || ''} onChange={handleInputChange} />
      <label>Bathrooms:</label>
      <input type="number" name="bathrooms" value={formData.bathrooms || ''} onChange={handleInputChange} />
      <label>Land Size:</label>
      <input type="text" name="landSize" value={formData.landSize || ''} onChange={handleInputChange} />
      <label>Pet Friendly:</label>
      <select name="petFriendly" value={formData.petFriendly ? 'true' : 'false'} onChange={handleInputChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </>
  );

  return (
    <div className="edit-ad-form-modal">
      <div className="edit-ad-form-content">
        <form onSubmit={handleSubmit}>
          <button type="button" className="close-button" onClick={onClose}>×</button>
          <h2>Edit Ad</h2>
          
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>

          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} />

          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleInputChange} />

          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <label>Subcategory:</label>
          <select name="subcategory" value={formData.subcategory} onChange={handleInputChange}>
            {renderSubcategoryOptions()}
          </select>

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

          <label>Ad Image:</label>
          <input type="file" id="adImageURL" onChange={handleFileChange} />
          {formData.adImageURL && !adImage && <img src={formData.adImageURL} alt="Ad" style={{width: '100px', height: '100px'}} />}
          {formData.adImageURL && <button type="button" onClick={handleRemoveImage}>Remove Image</button>}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditAdForm;
