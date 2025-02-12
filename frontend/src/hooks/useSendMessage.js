import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    const sendMessage = async (formData) => {
        setLoading(true);
        try {
            formData.append("receiverID", selectedConversation._id);

            const res = await fetch(`/api/messages/send`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            // Update messages in conversation state
            if (messages) {
                useConversation.setState({ messages: [...messages, data] });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
