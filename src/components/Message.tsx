import React, {FC} from 'react';
import {IMessage, IUser} from "../types/types";
import moment from "moment";
import "../App.scss";

interface MessageProps {
    message: IMessage;
    user: IUser;
}

function getFormattedTime(date: Date): string {
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
                            <div>
                                <div className="message owner">
                                    <div className="message-info-container">
                                        <div className="message-info">
                                            <img
                                                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                                                alt=""/>
                                        </div>
                                    </div>
                                    <div className="message-content">
                                        <div className="message-text">
                                            {message.text}
                                            <div className="message-time">
                                                {getFormattedTime(message.date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="message">
                                    <div className="message-info-container">
                                        <div className="message-info">
                                            <img
                                                src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                                                alt=""/>
                                        </div>
                                    </div>
                                    <div className="message-content">
                                        <div className="message-text">
                                            <span>{message.username}</span>
                                            {message.text}
                                            <div className="message-time">
                                                {getFormattedTime(message.date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                    :
                    (
                        <div>
                            <div className="message from-server">
                                <div className="message-text">
                                    {message.text}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};
