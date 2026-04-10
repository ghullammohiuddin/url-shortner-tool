import Joi from 'joi';

const urlSchema = Joi.object({
    redirectUrl: Joi.string()
        .trim()
        .uri({
            scheme: ['http', 'https']
        })
        .required()
        .messages({
            'string.uri': 'Redirect URL must be a valid URL',
            'string.empty': 'Redirect URL is required',
            'any.required': 'Redirect URL is required'
        })
        .lowercase()
})
    .required()
    .messages({
        'object.required': 'URL schema is required',
        'any.required': 'URL schema is required'
    })


export default urlSchema;