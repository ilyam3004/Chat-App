import React, {FC, useEffect, useRef} from 'react';
import {Message} from "./Message";
import {IMessage} from "../types/types";
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";

interface MessagesProps {
    messages: IMessage[];
    connection: HubConnection;
}

export const Messages: FC<MessagesProps> = ({messages, connection}) => {

    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className="messages">
            {
                messages.map(message =>
                    <Message message={message} connection={connection}/>)
            }
        </div>
    );
};
