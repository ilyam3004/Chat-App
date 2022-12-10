import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Room from './pages/Room/Room';
import FormInput from "./components/Input/FormInput";
import Lobby from "./pages/Lobby/Lobby";
import './App.css';
import AppRoutes from "./config/AppRoutes";

function App() {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    const joinRoom = async (username, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5279/chathub")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                console.log(`${user} : ${message}`)
                setMessages(messages => [...messages, {user, message}]);
            });

            connection.on("UsersInRoom", (usersInRoom) => {
                setUsers(usersInRoom);
                console.log(usersInRoom);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { username, room });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const sendMessage = async (message) => {
        try{
            await connection.invoke("SendMessageToRoom", message);
        } catch (e) {
            console.log(e);
        }
    };

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <AppRoutes/>
    );
}

export default App;
