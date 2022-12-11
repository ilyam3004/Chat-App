import React from 'react';
import {useNavigate} from "react-router-dom";

const Navbar = ({closeConnection}) => {
    let navigate = useNavigate();

    const logOut = () => {
        closeConnection();
        navigate('../')
    }

    return (
        <div className={'navbar'}>
            <span className={'logo'}>Chat app</span>
            <div className={'user'}>
                <span>John</span>
                <button className={'log-out-button'}
                onClick={logOut}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
