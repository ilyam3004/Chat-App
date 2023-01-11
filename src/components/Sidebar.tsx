import React, {FC} from 'react';
import {IUser} from "../types/types";
import {UserList} from "./UserList";
import {Navbar} from "./Navbar";
import "../App.scss";

interface SidebarProps {
    users: IUser[];
    closeConnection: () => void;
}

export const Sidebar: FC<SidebarProps> = ({users, closeConnection}) => {
    return (
        <div className={'sidebar'}>
            <Navbar closeConnection={closeConnection}/>
            <UserList users={users}/>
        </div>
    );
};
