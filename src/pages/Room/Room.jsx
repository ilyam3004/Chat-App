import React from 'react';
import Sidebar from "../../components/SideBar";
import Chat from '../../components/Chat'
import './Room.scss';
import {useParams} from "react-router-dom";

const Room = () => {
    const {roomName} = useParams();
    return (
        <div className={'room'}>
            <div className={'room-container'}>
                <Sidebar/>
                <Chat room={roomName}/>
            </div>
        </div>
    );
};

export default Room;
