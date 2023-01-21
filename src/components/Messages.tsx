import React, {FC, useEffect, useRef, useState} from 'react';
import {IMessage, IUser} from "../types/types";
import moment from "moment";
import "../App.scss";
import {DateMessages} from "./DateMessages";

interface MessagesProps {
    messages: IMessage[];
    user: IUser;
}

export const Messages: FC<MessagesProps> = ({messages, user}) => {

    const [messagesByDate, setMessagesByDate] = useState<Record<string, IMessage[]> | null>(null);

    function groupMessagesByDate() {
        const result: Record<string, IMessage[]> = groupBy(messages,
                m => getDateInFormat(m.date));
        setMessagesByDate(result);
    }

    const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
        arr.reduce((groups, item) => {
            (groups[key(item)] ||= []).push(item);
            return groups;
        }, {} as Record<K, T[]>);

    const getDateInFormat = (date: Date):string => {
        return moment
            .utc(date)
            .local()
            .format("MMM d, yyyy");
    }

    useEffect(() => {
        groupMessagesByDate();
    }, [messages]);
    

    return (
        <div className="messages">
            {
                messagesByDate
                ?
                    Object.keys(messagesByDate).map((date:string) => {
                        return <DateMessages key={date} date={date} messagesByDate={messagesByDate[date]} user={user}/>})

                :
                    <div></div>
            }
        </div>
    );
};
