import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number()
    .default(5000),

  MONGO_URI: Joi.string()
    .required(),

  JWT_SECRET: Joi.string()
    .min(32)
    .required(),

  JWT_EXPIRES_IN: Joi.string()
    .default('1h'),

  CLIENT_URL: Joi.string()
    .uri()
    .required()
}).unknown(); // allow extra vars

const { value: envVars, error } = schema.validate(process.env);

if (error) {
  throw new Error(`❌ Environment validation error: ${error.message}`);
}

export default {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpiresIn: envVars.JWT_EXPIRES_IN,
  clientUrl: envVars.CLIENT_URL
};
