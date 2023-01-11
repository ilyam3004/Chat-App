export interface IJoinRoomRequest {
    username: string;
    roomname: string;
}

export interface IMessage {
    messageId: string;
    username: string;
    roomId: string;
    connectionId: string;
    text: string;
    date: Date;
}

export interface IUser {
    userId: string;
    username: string;
    connectionId: string;
    roomId: string;
}

export interface IRoom{
    roomId: string;
    roomname: string;
}