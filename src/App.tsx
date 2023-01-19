import React, {useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {IJoinRoomRequest, IUser, IMessage, IError} from "./types/types";
import {Lobby} from "./pages/Lobby";
import {Room} from "./pages/Room";

function App() {

    const [serverConnection, setServerConnection] = useState<HubConnection | null>(null);
    const [roomUsers, setRoomUsers] = useState<IUser[]>([]);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [error, setError] = useState<IError | null>(null);

    const navigate = useNavigate();

    const joinRoom = async (request: IJoinRoomRequest) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5113/chathub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (message: IMessage) => {
                setMessages(messages => [...messages, message])
            });

            connection.on("ReceiveUserData", (user: IUser) => {
                setUserData(user);
                navigate(`./room/${user.roomId}`);
            });

            connection.on("ReceiveError", (error: IError) => {
                setError(error);
                console.log(error);
            });

            connection.on("ReceiveUserList", (users: IUser[]) => {
                setRoomUsers(users);
            });

            connection.on("ReceiveRoomMessages", (messages: IMessage[]) => {
                setMessages(messages.sort((a, b) =>
                    (a.date < b.date) ? -1 : 1));
            });

            await connection.start();
            await connection.invoke("JoinRoom", request);
            setServerConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

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
            <Route path="/room/:id" element={<Room userList={roomUsers}
                                                   messages={messages}
                                                   connection={serverConnection}
                                                   closeConnection={closeConnection}
                                                   userData={userData}/>}/>
        </Routes>
    );
}
export default App;
