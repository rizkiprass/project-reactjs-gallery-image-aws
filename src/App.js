import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('File uploaded successfully');
      fetchImages(); // After successful upload, fetch updated list of images
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Failed to upload file');
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/images');
      setImageUrls(response.data);
    } catch (error) {
      console.error('Error fetching images: ', error);
      alert('Failed to fetch images');
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>All Uploaded Images</h2>
      <div>
        {imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: '200px', height: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
}

export default App;
