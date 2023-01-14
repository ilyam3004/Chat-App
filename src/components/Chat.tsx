import React, {FC} from 'react';
import {Messages} from "./Messages";
import {ChatInput} from "./ChatInput";
import {HubConnection} from "@microsoft/signalr";
import {IMessage, IUser} from "../types/types";
import "../App.scss";

interface ChatProps{
    connection: HubConnection;
    messages: IMessage[];
    userData: IUser;
}

export const Chat: FC<ChatProps> = ({messages, userData, connection}) => {
    return (
        <div className="chat">
            <div className="chat-info">
                <span className="chat-name">{userData.roomName}</span>
            </div>
            <Messages messages={messages} connection={connection}/>
            <ChatInput connection={connection}/>
        </div>
    );
};