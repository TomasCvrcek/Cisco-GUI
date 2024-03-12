import React, { useState } from 'react';
import axios from 'axios'; 

const ConfigureButton = ({ mergedConfig }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfigure = () => {
    setLoading(true);
    setError(null);

    // Example endpoint for configuring the device
    const configureEndpoint = 'http://localhost:5555/brume';

    // Send a POST request with the merged configuration
    axios.post(configureEndpoint, mergedConfig)
      .then(response => {
        // Handle successful configuration
        console.log('Configuration successful:', response.data);
        setLoading(false);
      })
      .catch(error => {
        // Handle configuration error
        console.error('Configuration failed:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <button onClick={handleConfigure} disabled={loading}>
        {loading ? 'Configuring...' : 'Configure'}
      </button>
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ConfigureButton;