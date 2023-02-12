import React, {FC, useState, useRef, useEffect} from 'react';
import {IMessage} from "../types/types";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface IRoomMateMessageProps {
    message: IMessage;
    formatTime: (date: Date) => string;
}

export const RoomMateMessage: FC<IRoomMateMessageProps> = ({message, formatTime}) => {

    const [clickedImg, setClickedImg] = useState<string | null>(null);

    const onImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
        setClickedImg(e.currentTarget.src);
    }

    const onImgExitClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setClickedImg(null);
    }

    return (
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
                        <LazyLoadImage
                            height={100}
                            effect={"blur"}
                            src={message.imageUrl}
                            alt=""
                            onClick={onImgClick}/>
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
            {
                clickedImg &&
                (<div className="overlay" onClick={onImgExitClick}>
                    <img src={clickedImg}/>
                    <span onClick={onImgExitClick}>
                        X
                    </span>
                </div>)
            }
        </div>
    );
}
