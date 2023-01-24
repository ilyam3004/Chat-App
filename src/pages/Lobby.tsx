import React, {FC, FormEvent, useEffect, useState} from "react";
import {IError, IJoinRoomRequest} from "../types/types";
import {MoonLoader} from "react-spinners";
import '../App.scss'

interface LobbyProps {
    joinRoom: (request: IJoinRoomRequest) => void;
    error: IError | null;
    setError: React.Dispatch<React.SetStateAction<IError | null>>;
}

export const Lobby: FC<LobbyProps> = ({joinRoom, error, setError}) => {

    const [loading, setLoading] = useState(false);
    const delayInSeconds: number = 2;
    const [values, setValues] = useState<IJoinRoomRequest>({username: '', roomName: ''});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (values.username && values.roomName) {
            joinRoom(values);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const getError = (): string => {
        if (error) {
            if (error.errors != undefined) {
                return error.errors.Username !== undefined
                    ? error.errors.Username[0]
                    : error.errors.RoomName[0];
            }
            return error.title;
        }
        return "";
    }

    useEffect(() => {
        if (error) {
            let timer = setTimeout(() => setLoading(false), delayInSeconds * 400)
            return () => {
                clearTimeout(timer);
            };
        }
    }, [error]);


    return (
        <div className="lobby">
            <form className="lobby-form"
                  onSubmit={handleSubmit}>
                <h1 className="lobby-title">Chat app</h1>
                {
                    error
                        ?
                        (
                            !loading
                                ?
                                    (
                                        <div className="error-container">
                                            <div className="error-text">
                                                {getError()}
                                            </div>
                                        </div>
                                    )
                                : <div></div>
                        )
                        :
                        <div></div>
                }
                <div className="lobby-loader">
                    <MoonLoader
                        loading={loading}
                        color="#000000"
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

