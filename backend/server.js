import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import { app, server } from './socket/socket.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectToMongoDB } from './database/connectMongoDb.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware-lər
app.use(express.json());
app.use(cors({
    origin: ["https://online-chatt-app-11.onrender.com", "http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    useTempFiles: false
}));

// API Routs
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);

// Frontend Serve
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`✅ Server ${PORT} portunda işləyir...`);
});
