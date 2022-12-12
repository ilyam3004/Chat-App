const Message = ({message, connectionId}) => {
    return (
        <div>
            {
                message.ConnectionId === connectionId
                ? (<div className={'message owner'}>
                        <div className={'message-info'}>
                            <span>{message.Username}</span>
                        </div>
                        <div className={'message-content'}>
                            <p>{message.Text}</p>
                        </div>
                    </div>)
                :   (<div className={'message'}>
                        <div className={'message-info'}>
                            <span>{message.Username}</span>
                        </div>
                        <div className={'message-content'}>
                            <p>{message.Text}</p>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Message;
