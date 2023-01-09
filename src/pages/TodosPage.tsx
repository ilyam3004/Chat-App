import React, {useEffect, useState} from 'react';
import {ITodo, IUser} from "../types/types";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import UserItem from "../components/UserItem";
import List from "../components/List";

const TodosPage = () => {

    const [todos, setTodos] = useState<ITodo[]>([]);


    async function fetchTodos(){
        try {
            const response = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10");
            setTodos(response.data)
        } catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])
    return (
        <List items={todos}
              renderItem={(item: ITodo) =>
                  <TodoItem key={item.id} todo={item}/>}/>
    );
};

export default TodosPage;
