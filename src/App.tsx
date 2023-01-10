import React, { useState } from 'react';
import {Routes, Route} from "react-router-dom";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {Lobby} from "./pages/Lobby";
import {IJoinRoomRequest} from "./types/types";

function App() {

    const [connection, setConnection] = useState<HubConnection | null>(null);

    const joinRoom = async (request: IJoinRoomRequest) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5279/chathub")
                .configureLogging(LogLevel.Information)
                .build();


            await connection.invoke("JoinRoom", { request.username, request.roomname });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Routes>
            <Route path="/lobby" element={<Lobby/>}/>
            <Route path="/room/:id"/>
        </Routes>
    );
};

export default App;
