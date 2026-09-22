import * as Joi from "joi";

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),
  PORT: Joi.number().port().default(3000),

  DATABASE_URL: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().min(32).invalid("change-me").required(),

  FRONT_END_URL: Joi.string().uri().required(),

  REDIRECT_HOST: Joi.string().hostname().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),

  GEOLOCATION_TOKEN: Joi.string().required(),
  GEO_FALLBACK_IP: Joi.string().ip().default("8.8.8.8"),
});
