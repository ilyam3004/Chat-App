import React from 'react';
import Navbar from "./Navbar";
import Users from "./Users/Users";

const Sidebar = ({users, closeConnection}) => {
    return (
        <div className={'sidebar'}>
            <Navbar closeConnection={closeConnection}/>
            <Users users={users}/>
        </div>
    );
};

export default Sidebar;
