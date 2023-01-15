import React, {FormEvent, useRef, FC} from 'react';
import "../App.scss";
import {HubConnection} from "@microsoft/signalr";

interface ChatInputProps{
    connection: HubConnection;
}

export const ChatInput: FC<ChatInputProps> = ({connection}) => {

    const messageRef = useRef<HTMLInputElement>(null);

    const send = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(messageRef.current !== null){
            await sendMessage(messageRef.current.value);
            messageRef.current.value = '';
        }
    }

    const sendMessage = async (message: string) => {
        try {
            await connection.invoke("SendUserMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <form className="chat-input"
              onSubmit={send}>
            <input
                type="text"
                ref={messageRef}
                placeholder="Type message..."/>
            <div className="send">
                <button type="submit">Send</button>
            </div>
        </form>
    );
};
