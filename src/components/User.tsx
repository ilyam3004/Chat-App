import {IUser} from "../types/types";
import React, {FC} from "react";
import "../App.scss";

interface UserProps {
    user: IUser;
}

export const User: FC<UserProps> = ({user}) => {
    return (
        <div key={user.userId} className="connected-user">
            {user.username}
        </div>
    );
};