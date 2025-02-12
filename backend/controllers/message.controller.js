import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderID = req.user._id;
        const receiverID = req.body.receiverID;
        let newMessage;

        if (!receiverID) {
            return res.status(400).json({ error: "Receiver ID is required" });
        }

        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            
            newMessage = new Message({
                senderID,
                receiverID,
                image: {
                    data: imageFile.data,
                    contentType: imageFile.mimetype,
                    fileName: imageFile.name
                }
            });

            if (req.body.message) {
                newMessage.message = req.body.message;
            }
        } else {
            newMessage = new Message({
                senderID,
                receiverID,
                message: req.body.message
            });
        }

        await newMessage.save();

        // Populate sender details
        await newMessage.populate("senderID", "-password");
        
        // Get receiver socket and emit message
        const receiverSocketId = getReceiverSocketID(receiverID);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

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

export const getMessages = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderID: userId, receiverID: otherUserId },
                { senderID: otherUserId, receiverID: userId },
            ],
        }).populate("senderID", "-password");

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};