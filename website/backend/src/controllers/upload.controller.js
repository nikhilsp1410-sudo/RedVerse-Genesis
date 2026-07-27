const storageService = require('../services/storage/storage.service');

const handleUploadError = (error, res) => {
  let statusCode = 500;
  let message = 'An unexpected error occurred during upload';

  if (error.name === 'PinataError') {
    statusCode = error.statusCode;
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error.toString()
  });
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided', error: 'Missing file' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const result = await storageService.uploadImage(buffer, originalname, mimetype);
    
    return res.status(200).json(result);
  } catch (error) {
    return handleUploadError(error, res);
  }
};

const uploadJSON = async (req, res) => {
  try {
    const { data, name } = req.body;
    if (!data) {
      return res.status(400).json({ success: false, message: 'No JSON data provided in body.data', error: 'Missing data' });
    }

    const result = await storageService.uploadJSON(data, name);
    return res.status(200).json(result);
  } catch (error) {
    return handleUploadError(error, res);
  }
};

module.exports = {
  uploadImage,
  uploadJSON
};
