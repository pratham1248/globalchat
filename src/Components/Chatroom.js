import React, { useEffect, useRef, useState } from 'react';
import signalRService from './signalrService';
import { useLocation } from 'react-router-dom';
import './Chatroom.css';
import Header from './Header';

const Chatroom = () => {
    const [messages1, setMessages1] = useState([
        { id: 1, text: "Hello, how are you?", fromMe: false },
        { id: 2, text: "I’m good, thanks! And you?", fromMe: false },
        { id: 3, text: "Hi there!", fromMe: true },
        { id: 4, text: "I’m doing well, thanks for asking!", fromMe: true }
    ]);

    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const loggedInUser = queryParams.get('loggedInUser');
    const selectedUser = queryParams.get('selectedUser');
    const groupId = queryParams.get('groupId');

 
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: newMessage, fromMe: true }]);
            setNewMessage("");
        }
    };
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const loggedInUser1 = 'user123'; // Replace with actual user ID // Replace with actual group ID
    const connectionRef = useRef(null);

    const onReceiveMessage = (user, message) => {
        setMessages(prevMessages => [...prevMessages, { userId:user, message:message }]);
    };

    

    useEffect(() => {
        if (connectionRef.current === null) {
            signalRService.startConnection(loggedInUser, groupId, connectionRef, onReceiveMessage);
        }

        return () => {
            signalRService.stopConnection(connectionRef);
        };
    }, [connectionRef, loggedInUser, groupId]);

    const sendMessage = () => {
        signalRService.sendMessage(connectionRef, loggedInUser,selectedUser, newMessage);
        onReceiveMessage(loggedInUser, newMessage);
        setNewMessage('');
    };

    return (
        <>

        <Header />
        <div className="chat-container">
            <div className="chat-area left-area">
                {messages.filter(msg => msg.userId != loggedInUser).map(msg => (
                    <div key={msg.id} className="message from-others">
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-area right-area">
                {messages.filter(msg => msg.userId == loggedInUser).map(msg => (
                    <div key={msg.id} className="message from-me">
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
        
        </>
    );
};

export default Chatroom;
