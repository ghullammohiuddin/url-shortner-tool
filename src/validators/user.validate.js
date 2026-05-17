import joi from 'joi'

const userRegisterSchema = joi.object({
    username: joi.string()
        .required()
        .lowercase()
        .messages({
            'string.empty': 'username is required',
            'any.required': 'username is required'
        }),

    email: joi.string()
        .email()
        .required()
        .messages({
            'email.empty': "email is required",
            'any.required': "email is required"
        }),

    password: joi.string()
        .min(8)                      // at least 8 characters
        .max(128)                    // max length (optional but recommended)
        .pattern(/[a-z]/)            // at least one lowercase
        .pattern(/[A-Z]/)            // at least one uppercase
        .pattern(/[0-9]/)            // at least one digit
        .pattern(/[^a-zA-Z0-9]/)     // at least one special character
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be less than 128 characters',
            'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
        })

})

const userLoginSchema = joi.object({
    email: joi.string()
        .email()
        .required()
        .messages({
            'email.empty': "email is required",
            'any.required': "email is required"
        }),
    password: joi.string()
        .min(8)
        .max(128)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must be less than 128 characters'
        })
        .pattern(/[a-z]/)
        .pattern(/[A-Z]/)
        .pattern(/[0-9]/)
        .pattern(/[^a-zA-Z0-9]/)
        .messages({
            'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
        })
})

export { userRegisterSchema, userLoginSchema };