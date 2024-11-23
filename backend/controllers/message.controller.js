
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { userID: receiverID } = req.params;
        const senderID = req.user._id;

        console.log('Sender ID:', senderID);
        console.log('Receiver ID:', receiverID);

        if (!receiverID) {
            return res.status(400).json({ error: 'Receiver ID is missing' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID]
            });
        }

        const newMessage = await Message.create({
            senderID,
            receiverID,
            message
        });

        conversation.message.push(newMessage._id);
        await conversation.save();

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReceiverSocketID(receiverID);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log('Error in sendMessage controller: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatID } = req.params;
        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderID, userToChatID] }
        }).populate('message');

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.message;

        res.status(200).json(messages);

    } catch (error) {
        console.log('Error in sendMessage controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}