const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPassword = 'secret';

const zEmail = zod.string().email()
const zPassword = zod.string().length(6);
const jwtSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().length(6),
    iat: zod.number()
})
/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const userNameValidation = zEmail.safeParse(username);
    const  passworValidation = zPassword.safeParse(password)
    if(!userNameValidation.success || !passworValidation.success) {
        return null;
    }
    const token = jwt.sign({username, password}, jwtPassword);
    return token;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    if(!zod.string().safeParse(token).success) {
        return false;
    }
    try {
        
        const result = jwt.verify(token, jwtPassword);
        console.log(48, result);
        const jwtValidation = jwtSchema.safeParse(result);
        if(jwtValidation) return true;
    else return false;
    } catch (error) {
        return false;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const ans = jwt.decode(token);
    if(ans) return true;
    else return false;
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
