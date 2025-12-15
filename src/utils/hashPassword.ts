
import * as bcrypt from 'bcrypt';

// Recommended number of salt rounds for bcrypt.
// Higher is more secure but slower. 10 is a good balance.
const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password using bcrypt.
 * @param password The plain text password to hash.
 * @returns A promise that resolves to the hashed password string.
 */
export async function hashPassword(password: string): Promise<string> {
    // Generate a salt and hash the password in one go
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a stored hash.
 * @param password The plain text password provided by the user.
 * @param hash The stored hashed password from the database.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    // Compare the password with the hash
    return bcrypt.compare(password, hash);
}
