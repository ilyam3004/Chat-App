import React, {FC} from 'react';
import {IMessage} from "../types/types";
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";

interface MessageProps {
    message: IMessage;
    connection: HubConnection;
}

export const Message: FC<MessageProps> = ({message, connection}) => {
    return (
        <div>
            {
                message.connectionId === connection.connectionId
                    ?
                    <div className="message owner">
                        <div className="message-info">
                            <span>{message.username}</span>
                        </div>
                        <div className="message-content">
                            <p>{message.text}</p>
                        </div>
                        <div className="message-date">
                            {message.date.toLocaleDateString()}
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
                            {message.date.toLocaleString()}
                        </div>
                    </div>)
            }
        </div>
    );
};
