import React from 'react';
import Messages from "./Messages";
import ChatInput from "./ChatInput";

const Chat = ({room}) => {
    return (
        <div className={'chat'}>
            <div className={'chat-info'}>
                <span className={'chat-name'}>{room}</span>
            </div>
            <Messages/>
            <ChatInput/>
        </div>
    );
};

export default Chat;
