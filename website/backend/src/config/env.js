const dotenv = require('dotenv');
const Joi = require('joi');

// Load environment variables from .env file
dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  JWT_SECRET: Joi.string().required(),
  CORS_ORIGIN: Joi.string().default('*'),
  MONGO_URI: Joi.string().uri().required(),
  PINATA_JWT: Joi.string().required(),
  PINATA_GATEWAY_URL: Joi.string().uri().default('https://gateway.pinata.cloud'),
  MAX_UPLOAD_SIZE: Joi.number().default(10485760), // 10MB default
  // Public configs to expose
  PUBLIC_CONTRACT_ADDRESS: Joi.string().required(),
  PUBLIC_CHAIN_ID: Joi.number().required(),
  PUBLIC_EXPLORER_URL: Joi.string().uri().required(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  jwtSecret: envVars.JWT_SECRET,
  corsOrigin: envVars.CORS_ORIGIN,
  mongoUri: envVars.MONGO_URI,
  pinata: {
    jwt: envVars.PINATA_JWT,
    gatewayUrl: envVars.PINATA_GATEWAY_URL,
    maxUploadSize: envVars.MAX_UPLOAD_SIZE,
  },
  publicConfig: {
    contractAddress: envVars.PUBLIC_CONTRACT_ADDRESS,
    chainId: envVars.PUBLIC_CHAIN_ID,
    explorerUrl: envVars.PUBLIC_EXPLORER_URL,
  }
};
