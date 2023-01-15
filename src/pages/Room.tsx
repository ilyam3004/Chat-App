import React, {FC} from 'react';
import {Chat} from "../components/Chat";
import {Sidebar} from "../components/Sidebar";
import {IMessage, IUser} from "../types/types";
import {HubConnection} from "@microsoft/signalr";
import "../App.scss";

interface RoomProps {
    userData: IUser | null
    userList: IUser[]
    messages: IMessage[]
    connection: HubConnection | null;
    closeConnection: () => void;
}

export const Room: FC<RoomProps> = ({userData, userList, messages, connection, closeConnection}) => {
    return (
        <div className="room">
            {
                connection && userData
                    ?
                    (<div className="room-container">
                        <Sidebar users={userList} closeConnection={closeConnection}/>
                        <Chat messages={messages} userData={userData} connection={connection}/>
                    </div>)
                    :
                    (<div>
                        Server error occurred. Connection wasn't opened.
                    </div>)
            }
        </div>
    );
};
