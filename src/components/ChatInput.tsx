import React, {FormEvent, useRef, useState} from 'react';
import "../App.scss";

export const ChatInput = () => {

    const messageRef = useRef<HTMLInputElement>(null);

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(messageRef.current?.value){
            //sendMessage(messageRef.current.value);
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
                <button type="submit" disabled={!messageRef.current?.value}>Send</button>
            </div>
        </form>
    );
};
