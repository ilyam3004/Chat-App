export interface IJoinRoomRequest {
    username: string;
    roomName: string;
}

export interface IMessage {
    messageId: string;
    username: string;
    roomId: string;
    userId: string;
    text: string;
    date: Date;
    fromUser: boolean;
}

export interface IUser {
    userId: string;
    username: string;
    connectionId: string;
    roomId: string;
    roomName: string;
}

export interface IValidationError{

}

export interface IError{
    status: number;
    title: string;
    type: string;
}