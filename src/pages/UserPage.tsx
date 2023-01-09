import React, {useEffect, useState} from 'react';
import {IUser} from "../types/types";
import axios from "axios";
import UserItem from "../components/UserItem";
import List from "../components/List";

const UserPage = () => {

    const [users, setUsers] = useState<IUser[]>([]);

    async function fetchUsers(){
        try {
            const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    return (
        <List items={users}
              renderItem={(user: IUser) =>
                  <UserItem key={user.id} user={user}/>}/>
    );
};

export default UserPage;
