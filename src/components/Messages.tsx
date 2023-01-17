import React, {FC, useEffect, useRef} from 'react';
import {Message} from "./Message";
import {IMessage, IUser} from "../types/types";
import moment from "moment";
import "../App.scss";

interface MessagesProps {
    messages: IMessage[];
    user: IUser;
}

export const Messages: FC<MessagesProps> = ({messages, user}) => {

    const messageRef = useRef<HTMLDivElement>(null);

    function showDate(): boolean {
        if (messages.length > 1) {
            console.log(moment(messages[messages.length - 1].date)
                .diff(messages[messages.length - 2].date, "minutes"));
            return moment(messages[messages.length - 1].date)
                .diff(messages[messages.length - 2].date, "minutes") > 0;
        }
        return true;
    }

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
                    <Message showDate={showDate}
                             key={message.messageId}
                             message={message}
                             user={user}/>)
            }
        </div>
    );
};
