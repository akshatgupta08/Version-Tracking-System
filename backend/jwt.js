import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

/*const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

       
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}*/

/*The function checks if it received a valid JSON token from the front-end.*/
const jwtAuthMiddle = (req,res) => {
// first check request headers has authorization or not
const authorization = req.headers.authorization
if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

// Extract the jwt token from the request headers
const token = req.headers.authorization.split(' ')[1];
if(!token) return res.status(401).json({ error: 'Unauthorized' });

try{
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({message: "Token Valid"});
}catch(err){
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
}


}

/*If the user logs in or signs up, a new token is generated.*/
// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

export {generateToken,jwtAuthMiddle};