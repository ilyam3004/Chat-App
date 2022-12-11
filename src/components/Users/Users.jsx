import React from 'react';

const Users = ({users}) => {
    return (
        <div className={'users'}>
            {
                users.map((user, id) =>
                    <div key={id} className={'connected-user'}>
                        {user}
                    </div>)
            }
        </div>
    );
};

export default Users;
