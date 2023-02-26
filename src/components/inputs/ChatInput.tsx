import {ISendImgToRoomRequest, IUploadResult, IUser} from "../../types/types";
import React, {FormEvent, useRef, FC, useState, ChangeEvent} from 'react';
import {HubConnection} from "@microsoft/signalr";
import {uploadImg} from "../../requests/uploadImg";
import "../../App.scss";
import {FileInput} from "./FileInput";

interface ChatInputProps {
    connection: HubConnection;
    userData: IUser;
}

export const ChatInput: FC<ChatInputProps> = ({connection, userData}) => {

    const messageInputRef = useRef<HTMLInputElement>(null);
    const imgInputRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<File | null>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCount(0);

        if (selectedImage) {
            imgInputRef.current!.value = '';
            const uploadResult = await uploadImg(selectedImage);
            await sendImage(uploadResult);
            setSelectedImage(null);
        }

        if (messageInputRef.current!.value.length > 0) {
            await sendMessage(messageInputRef.current!.value);
            messageInputRef.current!.value = '';
        }
    }

    const onTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <form className="chat-input"
              onSubmit={handleSubmit}>
            <input
                type="text"
                ref={messageInputRef}
                placeholder="Type message..."
                onChange={onTextInputChange}/>
            <div className="counter"
                 style={{color: count > 150 ? "#f17c7c" : "#a9a7a7"}}>
                {count}/150
            </div>
            <FileInput imgInputRef={imgInputRef}
                       selectedFile={selectedImage}
                       setSelectedFile={setSelectedImage}
                       caption="Add image"/>
            <div className="send">
                <button type="submit"
                        disabled={!imgInputRef.current?.files && !messageInputRef.current?.value || count > 150}>
                    Send
                </button>
            </div>
        </form>
    );
}
