const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { pinata } = require('../../config/env');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

// Rate limiter for upload routes: 20 requests per minute per IP
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: 'Too many upload requests from this IP, please try again after a minute',
    error: 'Rate limit exceeded'
  }
});

// Configure Multer
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPEG, and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: pinata.maxUploadSize // Default 10MB
  },
  fileFilter
});

// Middleware to catch Multer errors cleanly
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        success: false, 
        message: 'File too large', 
        error: `Maximum file size is ${pinata.maxUploadSize / (1024 * 1024)}MB` 
      });
    }
    return res.status(400).json({ success: false, message: 'Upload error', error: err.message });
  } else if (err) {
    return res.status(400).json({ success: false, message: 'Invalid file type', error: err.message });
  }
  next();
};

router.post(
  '/image',
  uploadLimiter,
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      handleMulterError(err, req, res, next);
    });
  },
  uploadController.uploadImage
);

router.post(
  '/json',
  uploadLimiter,
  uploadController.uploadJSON
);

module.exports = router;
