const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/user')

const authMiddleware = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith("Bearer")){
    token = req.header('Authorization').split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        req.user = user;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
        res.status(401).json({ message: 'Token expired' });
        }
    }
    }else{
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
};

module.exports = authMiddleware;


