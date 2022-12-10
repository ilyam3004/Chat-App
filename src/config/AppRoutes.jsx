import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Lobby from "../pages/Lobby/Lobby";
import Room from "../pages/Room/Room";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Lobby/>}/>
                <Route path="/room/:roomName" element={<Room/>}/>
            </Routes>
        </div>
    )
}

export default AppRoutes;