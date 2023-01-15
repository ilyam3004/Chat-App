import React, {FC, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IJoinRoomRequest} from "../types/types";
import {LobbyInput} from "../components/LobbyInput";
import '../App.scss';

interface LobbyProps {
    joinRoom: (request: IJoinRoomRequest) => void;
}

export const Lobby: FC<LobbyProps> = ({joinRoom}) =>{
    const [values, setValues] = useState<IJoinRoomRequest>({username: '', roomName: ''});
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
            name: "roomName",
            type: "text",
            placeholder: "Room",
            errorMessage: "Username less then 10 characters and shouldn't include any special character!",
            label: "Room",
            pattern: "^[A-za-z0-9]{1,10}",
            required: true
        }
    ]

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.username && values.roomName){
            joinRoom(values);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    return (
        <div className="lobby">
            <form className="lobby-form"
                  onSubmit={handleSubmit}>
                <h1 className="lobby-title">Chat app</h1>
                {
                    inputs.map((input) => (
                        <LobbyInput key={input.id}
                                    name={input.name}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    errorMessage={input.errorMessage}
                                    label={input.label}
                                    pattern={input.pattern}
                                    required={input.required}
                                    onChange={onChange}/>
                    ))
                }
                <button className="lobby-button" type="submit">
                    Join
                </button>
            </form>
        </div>);
}

