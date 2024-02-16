import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { errorHandler } from '../helpers/errorsHandler.js'

dotenv.config();

/**
 * @description Verifies the token sent by the user is valid or not. 
 * If it is, returns decoded data of that token otherwise throws an error
 * @description Verifies the token sent by user in headers of request
*/


const secret = process.env.JWT_SECRET; // Assuming you have defined JWT secret in your environment variables

const verifyToken = (req, res, next) => {
    try {
        // Checks if the request headers contain an "authorization" field
        const authHeader = req.headers['authorization'] || 'Basic ' + req.headers['www-authenticate'];
        
        if (!authHeader) {
            throw new Error('Token not found in request headers');
        }

        // Extracting token from authorization header
        const token = authHeader.split(' ')[1];

        // Decoding the JWT using jsonwebtoken
        const decodedData = jwt.verify(token, secret);
        
        // Attach decoded data to the request object for future use
        req.userData = decodedData;
        
        // Call next middleware
        next();
    } catch (err) {
        // If the token is missing or decoding process fails
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyToken;
