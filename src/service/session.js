import jwt from 'jsonwebtoken';

const addSession = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export { addSession };