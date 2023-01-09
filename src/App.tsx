import React from 'react';
import {Routes, Route} from "react-router-dom";
import UserPage from "./pages/UserPage";
import TodosPage from "./pages/TodosPage";

const App = () => {
    return (
        <Routes>
            <Route path={'/users'} element={<UserPage/>}/>
            <Route path={'/todos'} element={<TodosPage/>}/>
        </Routes>
    );
};

export default App;
