const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { port, nodeEnv, corsOrigin } = require('./config/env');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const routesV1 = require('./routes/v1');

const app = express();

// Connect to Database
connectDB();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: corsOrigin,
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Parsing & Compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// Logging
if (nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  // Structured JSON logging for production
  app.use(morgan((tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseInt(tokens.status(req, res), 10),
      content_length: tokens.res(req, res, 'content-length'),
      response_time_ms: Number.parseFloat(tokens['response-time'](req, res)),
      timestamp: new Date().toISOString()
    });
  }));
}

// API Routes
app.use('/api/v1', routesV1);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server running in ${nodeEnv} mode on port ${port}`);
});
