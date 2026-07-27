const axios = require('axios');
const FormData = require('form-data');
const { pinata } = require('../../config/env');

class PinataError extends Error {
  constructor(message, statusCode, originalError) {
    super(message);
    this.name = 'PinataError';
    this.statusCode = statusCode || 500;
    this.originalError = originalError;
  }
}

class PinataProvider {
  constructor() {
    if (!pinata.jwt) {
      throw new Error('PINATA_JWT is not configured');
    }
    
    this.client = axios.create({
      baseURL: 'https://api.pinata.cloud',
      headers: {
        Authorization: `Bearer ${pinata.jwt}`
      },
      timeout: 30000, // 30 seconds timeout
    });
  }

  async uploadFile(fileBuffer, originalName, mimeType) {
    try {
      const formData = new FormData();
      formData.append('file', fileBuffer, {
        filename: originalName,
        contentType: mimeType,
      });

      const pinataMetadata = JSON.stringify({ name: originalName });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({ cidVersion: 1 });
      formData.append('pinataOptions', pinataOptions);

      const response = await this.client.post('/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
        }
      });

      return response.data.IpfsHash;
    } catch (error) {
      this._handleError(error, 'File upload to Pinata failed');
    }
  }

  async uploadJSON(jsonData, name) {
    try {
      const payload = {
        pinataContent: jsonData,
        pinataMetadata: { name: name || 'metadata.json' },
        pinataOptions: { cidVersion: 1 }
      };

      const response = await this.client.post('/pinning/pinJSONToIPFS', payload);
      
      return response.data.IpfsHash;
    } catch (error) {
      this._handleError(error, 'JSON upload to Pinata failed');
    }
  }

  _handleError(error, defaultMessage) {
    if (error.response) {
      throw new PinataError(
        `Pinata API Error: ${error.response.data?.error?.details || error.response.data?.error || defaultMessage}`,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      throw new PinataError('Pinata Network Error: No response received', 503, error.message);
    } else {
      throw new PinataError(`Pinata Setup Error: ${error.message}`, 500, error.message);
    }
  }
}

module.exports = new PinataProvider();
