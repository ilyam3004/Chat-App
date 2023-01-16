import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {IUser} from "../types/types";
import "../App.scss";

interface NavbarProps {
    closeConnection: () => void;
    userData: IUser;
}

export const Navbar: FC<NavbarProps> = ({closeConnection, userData}) => {

    let navigate = useNavigate();

    const logOut = () => {
        closeConnection();
        navigate('../');
    }
    return (
        <div className="navbar">
            <span className="logo">Chat app</span>
            <div className="user">
                <span>{userData.username}</span>
                <button className="log-out-button"
                        onClick={logOut}>Logout
                </button>
            </div>
        </div>
    );
};
