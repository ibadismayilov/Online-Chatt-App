import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socketURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'; 
            console.log('Socket URL:', socketURL);

            // Socket.io bağlantısını qururuq
            const socketInstance = io(socketURL, {
                query: {
                    userID: authUser._id,
                },
                transports: ['websocket'],  // WebSocket-i istifadə etmək
                secure: socketURL.startsWith('https'), // Əgər URL HTTPS ilə başlayırsa, secure təyin edirik
            });

            setSocket(socketInstance);

            // Online istifadəçiləri izləmək
            socketInstance.on('getOnlineUser', (users) => {
                setOnlineUsers(users);
            });

            return () => socketInstance.close(); // Component çıxarılarkən bağlantını kəs
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
