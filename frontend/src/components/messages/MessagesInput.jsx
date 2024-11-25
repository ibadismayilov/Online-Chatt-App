import React, { useState, useRef } from 'react';
import useSendMessage from '../../hooks/useSendMessage';
import { PiImage } from "react-icons/pi";
import { useAuthContext } from '../../context/AuthContext';
import { RiSendPlaneLine } from "react-icons/ri";

const MessagesInput = () => {
    const { loading, sendMessage } = useSendMessage();
    const { authUser } = useAuthContext();

    const [message, setMessage] = useState("");
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        const textarea = textareaRef.current;
        setMessage(e.target.value);

        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

    return (
        <div className='message-input'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='user-image'>
                    <img src={authUser.profilePic} alt="" />
                </div>
                <div className='input-box'>
                    <textarea
                        ref={textareaRef}
                        className='textarea'
                        placeholder='Type a message'
                        value={message}
                        onChange={handleChange}
                        rows={1}
                        style={{ resize: 'none', overflow: 'hidden' }}
                    />
                    <div className='message-send-button'>
                        <button type='submit' className='send-button'>
                            <RiSendPlaneLine className='send-icon' />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MessagesInput;
