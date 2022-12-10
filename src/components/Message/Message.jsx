import React, {useState} from 'react';

const Message = () => {
    return (
        <div className={'message'}>
            <div className={'message-info'}>
                <span>john</span>
            </div>
            <div className={'message-content'}>
                <p>Message from John</p>
            </div>
        </div>
    );
};

export default Message;
