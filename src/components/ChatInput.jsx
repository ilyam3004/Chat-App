import React, {useState} from 'react';

const ChatInput = ({sendMessage}) => {
    const [message, setMessage] = useState('');

    const send = (e) => {
        e.preventDefault();
        if(message){
            sendMessage(message);
            setMessage('');
        }
    }

    return (
        <form className={'chat-input'}
            onSubmit={send}>
            <input
                id={'message'}
                name={'message'}
                type={'text'}
                value={message}
                placeholder={'Type message...'}
                onChange={e => setMessage(e.target.value)}/>
            <div className={'send'}>
                <button type={'submit'} disabled={!message}>Send</button>
            </div>
        </form>
    );
};

export default ChatInput;
