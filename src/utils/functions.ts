import * as crypto from 'crypto';
import * as argon2 from 'argon2';
export const generateSalt = async () => {
    // generate a random salt string 
    // using crypto library
    // return the salt string
    return crypto.randomBytes(32).toString('hex');
}

export const hashPassword = async (password: string) => {
    // hash the password with argon2
    // return the hashed password
    const salt = await generateSalt();
    return await argon2.hash(salt + password);
}