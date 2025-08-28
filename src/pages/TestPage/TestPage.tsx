import React, { useState } from 'react';
import MainLayout from '../MainLayout';
import PostAdFormTest from '../../components/PostAdForm/PostAdFormTest';
import './TestPage.css';

const TestPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);

  const handleOpenForm = () => {
    setShowForm(true);
    setSubmissionResult(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSuccess = () => {
    setSubmissionResult('Form submitted successfully! Check your browser network tab to see the POST request to /testing');
  };

  return (
    <MainLayout>
      <div className="test-page">
        <div className="test-container">
          <h1>Post Ad Form Test Page</h1>
          <p className="test-description">
            This page is for testing the new Post Ad Form with image upload functionality.
            The form supports uploading up to 10 images with automatic 1080p resolution resizing.
          </p>
          
          <div className="test-features">
            <h2>Features being tested:</h2>
            <ul>
              <li>Upload up to 10 images</li>
              <li>Automatic image resizing to max 1080p resolution</li>
              <li>Image preview with remove functionality</li>
              <li>File size compression</li>
              <li>Form submission to /testing endpoint</li>
            </ul>
          </div>

          <div className="test-instructions">
            <h2>How to test:</h2>
            <ol>
              <li>Click the "Open Test Form" button below</li>
              <li>Fill in the required fields (Name, Location, Price, Category)</li>
              <li>Select multiple images (try different sizes and formats)</li>
              <li>Observe the image processing and preview</li>
              <li>Try removing images using the × button</li>
              <li>Submit the form and check browser network tab for the POST to /testing</li>
            </ol>
          </div>

          {submissionResult && (
            <div className="submission-result success">
              {submissionResult}
            </div>
          )}

          <div className="test-actions">
            <button className="btn btn-primary" onClick={handleOpenForm}>
              Open Test Form
            </button>
            
            <div className="test-info">
              <p><strong>Endpoint:</strong> POST /testing</p>
              <p><strong>Max Images:</strong> 10</p>
              <p><strong>Max Resolution:</strong> 1080p (1920×1080)</p>
            </div>
          </div>

          {showForm && (
            <PostAdFormTest
              onClose={handleCloseForm}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TestPage;
