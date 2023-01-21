import React, {FC, FormEvent, useState} from "react";
import {IJoinRoomRequest} from "../types/types";
import '../App.scss';
import {MoonLoader} from "react-spinners";

interface LobbyProps {
    joinRoom: (request: IJoinRoomRequest) => void;
}

export const Lobby: FC<LobbyProps> = ({joinRoom}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState<IJoinRoomRequest>({username: '', roomName: ''});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.username && values.roomName) {
            setLoading(true);
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
                <div className="lobby-loader">
                    <MoonLoader
                        color="#000000"
                        loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"/>
                </div>
                <div className="lobby-input-container">
                    <label className="input-label">Username</label>
                    <input className="lobby-input"
                           name="username"
                           type="text"
                           placeholder="Username"
                           required={true}
                           onChange={onChange}/>
                    <label className="input-label">Roomname</label>
                    <input className="lobby-input"
                           name="roomName"
                           type="text"
                           placeholder="Roomname"
                           required={true}
                           onChange={onChange}/>
                </div>
                <button className="lobby-button" type="submit">
                    Join
                </button>
            </form>
        </div>);
}

