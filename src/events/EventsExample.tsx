import React, {FC, useRef, useState} from 'react';

export const EventsExample: FC = () => {
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(inputRef.current?.value);
    }

    return (
        <div>
            <input ref={inputRef} type={'text'} placeholder={'input'}/>
            <button onClick={clickHandler}>Button</button>
        </div>
    );
};
