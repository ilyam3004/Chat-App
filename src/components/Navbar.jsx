import React from 'react';

const Navbar = () => {
    return (
        <div className={'navbar'}>
            <span className={'logo'}>Chat app</span>
            <div className={'user'}>
                <span>John</span>
                <button className={'log-out-button'}>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;
