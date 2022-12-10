import React from 'react';

const ChatInput = () => {
    return (
        <div className={'chat-input'}>
            <input type={'text'} placeholder={'Type message...'}/>
            <div className={'send'}>
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatInput;
