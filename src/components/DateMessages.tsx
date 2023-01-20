import React, {FC, useEffect, useRef} from 'react';
import {IMessage, IUser} from "../types/types";
import {Message} from "./Message";

interface DateMessagesProps {
    date: string;
    messagesByDate: IMessage[],
    user: IUser
}

export const DateMessages: FC<DateMessagesProps> = ({messagesByDate, user, date}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messagesByDate]);

    return (
        <div>
            <div className="message-date">
                {date}
            </div>
            {
                messagesByDate.map(message => {
                    return <Message key={message.messageId} message={message} user={user}/>
                })
            }
            <div ref={messagesEndRef}/>
        </div>
    );
};
