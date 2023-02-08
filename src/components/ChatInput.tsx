import React, {FormEvent, useRef, FC, useState, ChangeEvent} from 'react';
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";
import axios from "axios";

interface ChatInputProps {
    connection: HubConnection;
}

export const ChatInput: FC<ChatInputProps> = ({connection}) => {

    const messageRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File>();
    const baseUrl = "http://localhost:5113/";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCount(0);
        if (selectedFile) {
            sendImage(selectedFile);
        }
        if (messageRef.current!.value.length > 0) {
            await sendMessage(messageRef.current!.value);
            messageRef.current!.value = '';
        }
    }

    const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCount(e.target.value.length);
    }

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
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

    const sendImage = async (image: File) => {
        let data = new FormData();
        data.append('File', image);
        const url = `${baseUrl}img/uploadImage`;
        await fetch(url,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'multipart/form-data',
                },
                body: data
            }).then((response) => {
            console.log(response.body)
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <form className="chat-input"
              onSubmit={handleSubmit}>
            <input
                type="text"
                ref={messageRef}
                placeholder="Type message..."
                onChange={onTextInputChange}/>
            <div className="counter" style={{color: count > 150 ? "#f17c7c" : "#a9a7a7"}}>
                {count}/150
            </div>
            <input type="file"
                   ref={fileRef}
                   onChange={onFileInputChange}/>
            <div className="send">
                <button type="submit"
                        disabled={!fileRef.current?.files && !messageRef.current?.value || count > 150}>
                    Send
                </button>
            </div>
        </form>
    );
}
