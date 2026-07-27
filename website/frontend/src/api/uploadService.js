/**
 * Frontend helper to upload files and metadata to the backend API.
 * The backend securely manages Pinata credentials and handles IPFS pinning.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const uploadService = {
  /**
   * Uploads an image file to decentralized storage via the backend.
   * @param {File} file - The file object to upload
   * @returns {Promise<{success: boolean, cid: string, ipfsUrl: string, gatewayUrl: string}>}
   */
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload/image`, {
      method: 'POST',
      body: formData,
      // Note: the browser automatically sets Content-Type to multipart/form-data with boundary
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Image upload failed');
    }

    return response.json();
  },

  /**
   * Uploads JSON metadata to decentralized storage via the backend.
   * @param {Object} data - The JSON metadata payload.
   * @param {string} [name='metadata.json'] - Optional filename for the metadata
   * @returns {Promise<{success: boolean, cid: string, ipfsUrl: string, gatewayUrl: string}>}
   */
  async uploadJSON(data, name = 'metadata.json') {
    const response = await fetch(`${API_URL}/upload/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, name }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'JSON upload failed');
    }

    return response.json();
  }
};
