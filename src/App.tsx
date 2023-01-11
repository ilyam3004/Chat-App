import React, {useState} from 'react';
import {Routes, Route} from "react-router-dom";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {IJoinRoomRequest, IUser, IMessage, IRoom} from "./types/types";
import {Lobby} from "./pages/Lobby";
import {Room} from "./pages/Room";

function App() {

    const [serverConnection, setServerConnection] = useState<HubConnection | null>(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [room, setRoom] = useState<IRoom | null>(null);

    const joinRoom = async (request: IJoinRoomRequest) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5213/chathub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (message: IMessage) => {
                setMessages(messages => [...messages, message])
            });

            connection.on("ReceiveRoom", (room: IRoom) => {
                setRoom(room);
            });

            connection.on("ReceiveRoomUsers", (users: IUser[]) => {
                setUsers(users);
            });

            await connection.start();
            await connection.invoke("JoinRoom", request);

            setServerConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message: IMessage) => {
        try {
            if (serverConnection) {
                await serverConnection.invoke("SendMessageToRoom", message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const closeConnection = async () => {
        try {
            if (serverConnection) {
                await serverConnection.stop();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Routes>
            <Route path="/lobby" element={<Lobby joinRoom={joinRoom}/>}/>
            <Route path="/room/:id" element={<Room users={users}
                                                   messages={messages}
                                                   connection={serverConnection}
                                                   closeConnection={closeConnection}
                                                   room={room}/>}/>
        </Routes>);
}

export default App;
