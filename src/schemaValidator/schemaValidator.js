export const createUserValidation = {
    username: {
        isLength: {
            options: {
                min: 3,
                max: 20
            },
            errorMessage: 'Username must be between 3 and 20 characters long.'
        },
        notEmpty: true,
        isString: {
            errorMessage: "Username must be a string"
        }
    }
}