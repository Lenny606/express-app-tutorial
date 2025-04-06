import bcrypt from 'bcrypt';

// Helper function to hash a password
export async function hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    try {
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
}