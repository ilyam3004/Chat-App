import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import AppRoutes from "./config/AppRoutes";

function App() {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const joinRoom = async (username, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5279/chathub")
                .configureLogging(LogLevel.Information)
                .build();
            console.log(connection.connectionId);
            connection.on("ReceiveMessage", (jsonMessage) => {
                var message = JSON.parse(jsonMessage);
                messages.push(message);
            });

            connection.on("UsersInRoom", (usersInRoom) => {
                var users = JSON.parse(usersInRoom);
                setUsers(users);
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
        <AppRoutes joinRoom={joinRoom}
                   users={users}
                   sendMessage={sendMessage}
                   messages={messages}
                   closeConnection={closeConnection}/>
    );
}

export default App;
