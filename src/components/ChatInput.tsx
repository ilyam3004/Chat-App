import {ISendImgToRoomRequest, IUploadResult, IUser} from "../types/types";
import React, {FormEvent, useRef, FC, useState, ChangeEvent} from 'react';
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";
import axios from "axios";

interface ChatInputProps {
    connection: HubConnection;
    userData: IUser;
}

export const ChatInput: FC<ChatInputProps> = ({connection, userData}) => {

    const messageRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const baseUrl = "https://chat-app-server.azurewebsites.net/";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCount(0);
        if (selectedFile) {
            fileRef.current!.value = '';
            await uploadImage(selectedFile);
            setSelectedFile(null);
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

    const uploadImage = async (image: File) => {
        let data = new FormData();
        data.append('image', image);
        const url = `${baseUrl}img/uploadImage`;
        axios.post(url, data).then((response) => {
            sendImage(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const sendImage = async (uploadResult: IUploadResult) => {

        const request: ISendImgToRoomRequest = {
            roomId: userData.roomId,
            imageUrl: uploadResult.imgUrl,
            userId: userData.userId,
        };

        try {
            await connection.invoke("SendImageToRoom", request);
        } catch (e) {
            console.log(e);
        }
    }
    
    const getFormattedName = (fileName: string): string => {
        return fileName.length > 10 ? `${fileName.slice(0, 10)}...` : fileName;
    }

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
            <label className="file-input">
                <input type="file"
                       ref={fileRef}
                       accept="image/png, image/gif, image/jpeg"
                       onChange={onFileInputChange}/>
                    <span>
                        {
                            selectedFile
                                ?
                                <div>
                                    {getFormattedName(selectedFile.name)}
                                </div>
                                :
                                <div>
                                    Add image
                                </div>
                        }
                    </span>
            </label>
            <div className="send">
                <button type="submit"
                        disabled={!fileRef.current?.files && !messageRef.current?.value || count > 150}>
                    Send
                </button>
            </div>
        </form>
    );
}
