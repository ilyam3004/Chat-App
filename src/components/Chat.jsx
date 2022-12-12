import React from 'react';
import Messages from "./Messages";
import ChatInput from "./ChatInput";

const Chat = ({room, messages, sendMessage, connectionId}) => {
    return (
        <div className={'chat'}>
            <div className={'chat-info'}>
                <span className={'chat-name'}>{room}</span>
            </div>
            <Messages messages={messages} connectionId={connectionId}/>
            <ChatInput sendMessage={sendMessage}/>
        </div>
    );
};

export default Chat;
