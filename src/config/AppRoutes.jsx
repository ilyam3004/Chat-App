import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Lobby from "../pages/Lobby/Lobby";
import Room from "../pages/Room/Room";

const AppRoutes = (props) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Lobby joinRoom={props.joinRoom}/>}/>
                <Route path="/room/:roomName"
                       element={<Room users={props.users}
                                      sendMessage={props.sendMessage}
                                      messages={props.messages}
                                      closeConnection={props.closeConnection}
                                      connectionId={props.connectionId}/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;