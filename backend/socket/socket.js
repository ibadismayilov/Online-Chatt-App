import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://online-chatt-app-11.onrender.com", "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
    transports: ['websocket', "polling"]
});

const userSocketMap = {}; // { userID: socketID }

export const getReceiverSocketID = (receiverID) => {
    return userSocketMap[receiverID];
};

io.on('connection', (socket) => {
    console.log('✅ Yeni istifadəçi qoşuldu:', socket.id);

    const userID = socket.handshake.query.userID;
    if (userID && userID !== 'undefined') userSocketMap[userID] = socket.id;

    io.emit('getOnlineUser', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('❌ İstifadəçi ayrıldı:', socket.id);
        delete userSocketMap[userID];
        io.emit('getOnlineUser', Object.keys(userSocketMap));
    });
});

export { app, io, server };
