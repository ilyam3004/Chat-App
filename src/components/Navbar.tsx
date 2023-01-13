import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import "../App.scss";

interface NavbarProps {
    closeConnection: () => void;
}

export const Navbar: FC<NavbarProps> = ({closeConnection}) => {

    let navigate = useNavigate();

    const logOut = () => {
        closeConnection();
        navigate('../');
    }
    return (
        <div className="navbar">
            <span className="logo">Chat app</span>
            <div className="user">
                <span>John</span>
                <button className="log-out-button"
                        onClick={logOut}>Logout
                </button>
            </div>
        </div>
    );
};
