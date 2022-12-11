const Message = ({message}) => {
    return (
        <div className={'message'}>
            <div className={'message-info'}>
                <span>{message.username}</span>
            </div>
            <div className={'message-content'}>
                <p>{message.message}</p>
            </div>
        </div>
    );
};

export default Message;
