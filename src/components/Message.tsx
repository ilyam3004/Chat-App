import React, {FC} from 'react';
import {CurrentUserMessage} from "./CurrentUserMessage";
import {IMessage, IUser} from "../types/types";
import moment from "moment";
import "../App.scss";
import {RoomMateMessage} from "./RoomMateMessage";
import {ServerMessage} from "./ServerMessage";

interface MessageProps {
    message: IMessage;
    user: IUser;
}

function formatTime(date: Date): string {
    return moment
        .utc(date)
        .local()
        .format("hh:mm A");
}

export const Message: FC<MessageProps> = ({message, user}) => {
    return (
        <div className="message-container">
            {
                message.fromUser
                    ?
                    (
                        message.userId === user.userId
                            ?
                                <CurrentUserMessage message={message} formatTime={formatTime}/>
                            :
                                <RoomMateMessage message={message} formatTime={formatTime}/>
                    )
                    :
                    (
                        <ServerMessage message={message}/>
                    )
            }
        </div>
    );
};
