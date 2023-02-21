const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, picture} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter all fields')
    }

    const userEsists = await User.findOne({email})

    if(userEsists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        picture
    });

    if(user) {
        const token = generateToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token
        })
    }
    else {
        throw new Error('Failed to create the User')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(400);
        throw new Error('Please enter all fields')
    }

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        })
    }

})


const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: { $regex: req.query.search, $options: 'i' }},
            {email: { $regex: req.query.search, $options: 'i' }},
        ]
    }: {}

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}}).select('-password')
    res.json(users)
})

module.exports = {
    registerUser,
    authUser,
    allUsers
}