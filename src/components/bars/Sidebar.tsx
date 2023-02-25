import React, {FC} from 'react';
import {IUser} from "../../types/types";
import {UserList} from "../userList/UserList";
import {Navbar} from "./Navbar";
import "../../App.scss";
import {HubConnection} from "@microsoft/signalr";

interface SidebarProps {
    userData: IUser;
    userList: IUser[];
    closeConnection: () => void;
    connection: HubConnection;
    clearAllRoomData: () => void;
}

export const Sidebar: FC<SidebarProps> = ({userList, closeConnection, userData, connection, clearAllRoomData}) => {
    return (
        <div className="sidebar">
            <Navbar closeConnection={closeConnection}
                    userData={userData}
                    clearAllRoomData={clearAllRoomData}/>
            <UserList users={userList}/>
        </div>
    );
};
