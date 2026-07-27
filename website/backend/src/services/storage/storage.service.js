const pinataProvider = require('./pinata.provider');
const { pinata } = require('../../config/env');

class StorageService {
  constructor(provider) {
    this.provider = provider;
  }

  async uploadImage(fileBuffer, originalName, mimeType) {
    try {
      console.log(`[StorageService] Upload Started for image: ${originalName}`);
      const cid = await this.provider.uploadFile(fileBuffer, originalName, mimeType);
      console.log(`[StorageService] Upload Completed for image: ${originalName} (CID: ${cid})`);
      
      return {
        success: true,
        cid,
        ipfsUrl: `ipfs://${cid}`,
        gatewayUrl: `${pinata.gatewayUrl}/ipfs/${cid}`
      };
    } catch (error) {
      console.error(`[StorageService] Upload Failed for image: ${originalName}`, error.message);
      throw error;
    }
  }

  async uploadJSON(jsonData, name) {
    try {
      console.log(`[StorageService] Upload Started for JSON: ${name}`);
      const cid = await this.provider.uploadJSON(jsonData, name);
      console.log(`[StorageService] Upload Completed for JSON: ${name} (CID: ${cid})`);

      return {
        success: true,
        cid,
        ipfsUrl: `ipfs://${cid}`,
        gatewayUrl: `${pinata.gatewayUrl}/ipfs/${cid}`
      };
    } catch (error) {
      console.error(`[StorageService] Upload Failed for JSON: ${name}`, error.message);
      throw error;
    }
  }
}

// Instantiate with pinataProvider for now. Easily swappable.
module.exports = new StorageService(pinataProvider);
