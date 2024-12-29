import Joi from 'joi';

export const createPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required'
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content is required'
  })
});
