const User=require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' 
    });
};
exports.registerUser= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:'please provide all mandatory fields'});
        }
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message: 'User already exists with this email address' });
        }
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        });
    }
    catch(error){
        console.error("🔥 CRITICAL CONTROLLER CRASH LOG:", error); 
        return res.status(500).json({message:'Server error',error:error.message});
    }
};
exports.loginUser = async (req, res) => {
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:'please provide all mandatory fields'});
        }
        const user=await User.findOne({email});
         if(!user) {
            return res.status(401).json({ message: 'Invalid email credentials' });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid password credentials'});
        }
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    }
    catch(error){
        return res.status(500).json({message:'Server error',error:error.message});
    }
};
