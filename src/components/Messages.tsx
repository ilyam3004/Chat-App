import React, {FC, useEffect, useRef} from 'react';
import {Message} from "./Message";
import {IMessage, IUser} from "../types/types";
import "../App.scss";

interface MessagesProps {
    messages: IMessage[];
    user: IUser;
}

export const Messages: FC<MessagesProps> = ({messages, user}) => {

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
                    <Message key={message.messageId} message={message} user={user}/>)
            }
        </div>
    );
};
