import React from 'react';
import Sidebar from "../../components/SideBar";
import Chat from '../../components/Chat'
import './Room.scss';
import {useParams} from "react-router-dom";

const Room = ({users, sendMessage, messages, closeConnection, connectionId}) => {
    const {roomName} = useParams();
    return (
        <div className={'room'}>
            <div className={'room-container'}>
                <Sidebar users={users}
                         closeConnection={closeConnection}/>
                <Chat room={roomName}
                      messages={messages}
                      sendMessage={sendMessage}
                      connectionId={connectionId}/>
            </div>
        </div>
    );
};

export default Room;
