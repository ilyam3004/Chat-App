import React, {FC} from 'react';
import {IMessage, IUser} from "../types/types";
import {Message} from "./Message";

interface DateMessagesProps{
    date: string;
    messageByDate: IMessage[],
    user: IUser
}

export const DateMessages: FC<DateMessagesProps> = ({messageByDate, user, date}) => {

    return (
        <div>
            <div className="message-date">
                {date}
            </div>
            {
                messageByDate.map(message => {
                    return <Message key={message.messageId} message={message} user={user}/>
                })
            }
        </div>
    );
};
