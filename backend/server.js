import express from 'express'
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import messageRoutes from './routes/message.routes.js';

import { connectToMongoDB } from './database/connectMongoDb.js';

import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

import path from 'path';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', usersRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on part ${PORT}`)
});