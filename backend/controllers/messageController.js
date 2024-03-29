const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require('../models/messageModel');
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
    const {content, chatId} = req.body
    
    if(!content || !chatId) {
        console.log("Invalid Data passed into the request");
        res.status(400)
        throw new Error("Invalid Data passed into the request")
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {

        let message = await Message.create(newMessage)
        
        message = await message.populate("sender", "name email picture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name picture email"
        });
        
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });

        res.status(200).json(message)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

});


const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({chat: req.params.chatId}).populate("sender", "name picture email").populate("chat")
        res.status(200)
        res.json(messages)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
});


module.exports = {
    sendMessage,
    allMessages
}