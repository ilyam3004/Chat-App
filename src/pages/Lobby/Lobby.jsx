import FormInput from "../../components/Input/FormInput";
import { useState } from "react";
import {useNavigate, } from "react-router-dom";
import './Lobby.css';

const Lobby = ({joinRoom}) => {
    const [values, setValues] = useState({
        username: "",
        room: ""
    });
    let navigate = useNavigate();

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage: "Username less then 10 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-za-z0-9]{1,10}",
            required: true
        },
        {
            id: 2,
            name: "room",
            type: "text",
            placeholder: "Room",
            errorMessage: "Username less then 10 characters and shouldn't include any special character!",
            label: "Room",
            pattern: "^[A-za-z0-9]{1,10}",
            required: true
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if(values.username && values.room){
            joinRoom(values.username, values.room);
            navigate(`./room/${values.room}`)
        }
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="lobby">
            <form className={'lobby-form'}
                onSubmit={handleSubmit}>
                <h1 className={'lobby-title'}>Chat app</h1>
                {
                    inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))
                }
                <button className={'lobby-button'}
                        type={'submit'}>
                    Join
                </button>
            </form>
        </div>
    );
}

export default Lobby;
