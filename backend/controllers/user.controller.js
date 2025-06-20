const userModel =require('../models/user.model');
const userService =require('../services/user.service');
const {validationResult} =require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser =async(req,res,next)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password} =req.body;
    const hashedPassword =await userModel.hashPassword(password);
    const user =await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword
    });

    const token =user.generateAuthToken();
    res.status(201).json({ token,user});

}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user and explicitly select password field
        const user = await userModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = user.generateAuthToken();

        // Remove password from user object before sending response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Set cookie and send response
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports.getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}