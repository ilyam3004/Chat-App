import React, {FC} from 'react';
import {IMessage, IUser} from "../types/types";
import "../App.scss";

interface MessageProps {
    message: IMessage;
    user: IUser;
}

export const Message: FC<MessageProps> = ({message, user}) => {
    return (
        <div>
            {
                message.fromUser
                    ?
                    (
                        message.userId === user.userId
                            ?
                            <div className="message owner">
                                <div className="message-info">
                                    <span>{message.username}</span>
                                </div>
                                <div className="message-content">
                                    <p>{message.text}</p>
                                </div>
                                <div className="message-date">
                                    {message.date.toString()}
                                </div>
                            </div>
                            :
                            (<div className={'message'}>
                                <div className={'message-info'}>
                                    <span>{message.username}</span>
                                </div>
                                <div className={'message-content'}>
                                    <p>{message.text}</p>
                                </div>
                                <div className="message-date">
                                    {message.date.toString()}
                                </div>
                            </div>)
                    )
                    :
                    (
                        <div className="message from-server">
                            <div className="message-content">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )

            }
        </div>
    );
};
