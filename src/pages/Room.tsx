import React, {FC, useEffect, useState} from 'react';
import {Chat} from "../components/chat/Chat";
import {Sidebar} from "../components/bars/Sidebar";
import {IMessage, IUser} from "../types/types";
import {HubConnection} from "@microsoft/signalr";
import {MoonLoader} from "react-spinners";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../App.scss";

interface RoomProps {
    userData: IUser | null
    userList: IUser[]
    messages: IMessage[]
    connection: HubConnection | null;
    closeConnection: () => void;
}


export const Room: FC<RoomProps> = ({userData, userList, messages, connection, closeConnection}) => {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
            let timer: NodeJS.Timeout = setTimeout(() => setLoading(false), 2000);
            return () => {
                clearInterval(timer);
            };
    }, []);

    return (
        <div className="room">
            {
                loading
                    ?
                    <div>
                        <MoonLoader
                            loading={loading}
                            color="#000000"
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"/>
                    </div>
                    :
                    (
                        connection && userData
                            ?
                            (<div className="room-container">
                                <Sidebar userData={userData}
                                         userList={userList}
                                         closeConnection={closeConnection}/>
                                <Chat messages={messages}
                                      userData={userData}
                                      connection={connection}
                                      membersCount={userList.length}/>
                            </div>)
                            :
                            (<div>
                                Server error occurred. Connection wasn't opened.
                            </div>)
                    )
            }
        </div>
    );
};
