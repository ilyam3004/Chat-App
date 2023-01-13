import React, {FC} from 'react';
import {Chat} from "../components/Chat";
import {Sidebar} from "../components/Sidebar";
import {IMessage, IUser, IRoom} from "../types/types";
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";

interface RoomProps {
    room: IRoom
    users: IUser[]
    messages: IMessage[]
    connection: HubConnection | null;
    closeConnection: () => void;
}

export const Room: FC<RoomProps> = ({room, users, messages, connection, closeConnection}) => {
    return (
        <div className="room">
            {
                connection && room
                    ?
                    <div className="room-container">
                        <Sidebar users={users} closeConnection={closeConnection}/>
                        <Chat messages={messages} room={room} connection={connection}/>
                    </div>
                    :
                    (<div>
                        Server error occurred. Connection wasn't opened.
                    </div>)
            }
        </div>
    );
};
