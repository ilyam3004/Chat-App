import React, {FormEvent, useRef, FC, useState} from 'react';
import "../App.scss";
import {HubConnection} from "@microsoft/signalr";

interface ChatInputProps{
    connection: HubConnection;
}

export const ChatInput: FC<ChatInputProps> = ({connection}) => {

    const messageRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState<number>(0);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCount(0);
        if(messageRef.current !== null){
            await sendMessage(messageRef.current.value);
            messageRef.current.value = '';
        }
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCount(e.target.value.length);
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
              onSubmit={handleSubmit}>
            <input
                type="text"
                ref={messageRef}
                placeholder="Type message..."
                onChange={onChange}/>
            <div className="counter" style={{ color: count > 150 ? "#f17c7c" : "#a9a7a7" }}>
                {count}
            </div>
            <div className="send">
                <button type="submit" disabled={count > 150}>Send</button>
            </div>
        </form>
    );
};
