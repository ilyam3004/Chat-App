import React, {FormEvent, useRef, FC, useState, ChangeEvent} from 'react';
import "../App.scss";
import {HubConnection} from "@microsoft/signalr";

interface ChatInputProps{
    connection: HubConnection;
}

export const ChatInput: FC<ChatInputProps> = ({connection}) => {

    const messageRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCount(0);
        if(selectedFile){
            const formData = new FormData();
            formData.append('File', selectedFile, selectedFile.name);
            console.log(formData)
            await sendImage(formData);
            setSelectedFile(undefined);
        }
        if(messageRef.current){
            await sendMessage(messageRef.current.value);
            messageRef.current.value = '';
        }
    }

    const onTextInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCount(e.target.value.length);
    }

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            console.log(e.target.files[0]);
            console.log(fileRef.current?.files)
            setSelectedFile(e.target.files[0]);
        }
    }

    const sendMessage = async (message: string) => {
        try {
            await connection.invoke("SendUserMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const sendImage = async (image: FormData) => {
        try {
            await connection.invoke("GetUserDataAndSendImage", image);
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
                onChange={onTextInputChange}/>
            <div className="counter" style={{ color: count > 150 ? "#f17c7c" : "#a9a7a7" }}>
                {count}/150
            </div>
            <input type="file"
                   ref={fileRef}
                   onChange={onFileInputChange}/>
            <div className="send">
                <button type="submit" disabled={!fileRef.current?.files}>Send</button>
            </div>
        </form>
    );
};
