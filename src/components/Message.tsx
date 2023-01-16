import React, {FC} from 'react';
import {IMessage, IUser} from "../types/types";
import moment from "moment";
import "../App.scss";

interface MessageProps {
    message: IMessage;
    user: IUser;
    //showDate: () => boolean;
}

function getFormattedDate(date: Date): string {
    return moment
        .utc(date)
        .local()
        .format("MMM d, yyyy, hh:mm A");
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
                                <div className="message-date">
                                    {getFormattedDate(message.date)}
                                </div>
                                <div className="message owner">
                                    <div className="message-info">
                                        <span>{message.username}</span>
                                    </div>
                                    <div className="message-content">
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="message-date">
                                    {getFormattedDate(message.date)}
                                </div>
                                <div className={'message'}>
                                    <div className={'message-info'}>
                                        <span>{message.username}</span>
                                    </div>
                                    <div className={'message-content'}>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </div>
                    )
                    :
                    (
                        <div>
                            <div className="message-date">
                                {getFormattedDate(message.date)}
                            </div>
                            <div className="message from-server">

                                <div className="message-content">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        </div>
                    )

            }
        </div>
    );
};
