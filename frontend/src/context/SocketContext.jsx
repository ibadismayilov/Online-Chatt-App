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
            
            const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

            const socket = io(socketUrl, {
                query: {
                    userID: authUser._id
                },
                transports: ['websocket'], // WebSocket ilə əlaqə qurulmasını təmin et
                secure: true, // HTTPS ilə əlaqə qur
            });

            setSocket(socket);

            socket.on('getOnlineUser', (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close(); // Component çıxarılarkən bağlantını kəs
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>;
};
