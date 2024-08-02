const UserModel = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        // Create a new user
        const userModel = new UserModel({ firstName, lastName, email, password });

        // Hash the password before saving
        userModel.password = await bcrypt.hash(password, 10);

        // Save the new user
        await userModel.save();

        // Respond with success message
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        //console.error(err); // Log the error to console
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual =await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(409).json({
                message: errorMsg,
                success: false
            });
        }

        // Create JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id , name:user.firstName}, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '24h' } // Token expiry
        );

        // Respond with success message and token
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.firstName
        });
    } catch (err) {
        // // Log the error to console
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { 
    signup,
    login,
};
