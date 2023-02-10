import React, {FC} from 'react';
import {IMessage} from "../types/types";

interface IRoomMateMessageProps {
    message: IMessage;
    formatTime: (date: Date) => string;
}

export const RoomMateMessage: FC<IRoomMateMessageProps> = ({message, formatTime}) => {
    return (
        <div>
            <div className="message">
                <div className="message-info-container">
                    <div className="message-info">
                        <img
                            src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                            alt=""/>
                    </div>
                </div>
                {
                    message.isImage
                        ?
                        <div className="img-content">
                            <img src={message.imageUrl}/>
                        </div>
                        :
                        <div className="message-content">
                            <div className="message-text">
                                <span>{message.username}</span>
                                {message.text}
                                <div className="message-time">
                                    {formatTime(message.date)}
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};
