import Joi from 'joi';

export const userValidationSchema = Joi.object({
  firstName: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string()
    .min(6)
    .when('googleId', {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.required(),
    })
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'any.unknown': 'Password is not allowed when googleId is present',
    }),
  avatar: Joi.string().uri().optional().messages({
    'string.uri': 'Avatar must be a valid URI',
  }),
  role: Joi.string().valid('User', 'Admin').optional().messages({
    'any.only': 'Role must be either User or Admin',
  }),
  created: Joi.date().optional().messages({
    'date.base': 'Created must be a valid date',
  }),
  googleId: Joi.string().optional(),
});
