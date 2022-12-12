import React from 'react';
import {useEffect, useRef} from "react";
import Message from "./Message/Message";

const Messages = ({messages, connectionId}) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div ref={messageRef} className={'messages'}>
            {
                messages.map((message, id) =>
                    (
                        <div key={id}>
                            <Message message={message} connectionId={connectionId}/>
                        </div>
                    ))
           }
        </div>
    );
};

export default Messages;
