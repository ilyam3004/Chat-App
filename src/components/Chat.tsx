import React, {FC} from 'react';
import {Messages} from "./Messages";
import {ChatInput} from "./ChatInput";
import {HubConnection} from "@microsoft/signalr";
import {IMessage, IRoom} from "../types/types";
import "../App.scss";

interface ChatProps{
    connection: HubConnection;
    messages: IMessage[];
    room: IRoom;
}

export const Chat: FC<ChatProps> = ({messages, room, connection}) => {
    return (
        <div className="chat">
            <div className="chat-info">
                <span className="chat-name">{room.roomname}</span>
            </div>
            <Messages messages={messages} connection={connection}/>
            <ChatInput/>
        </div>
    );
};