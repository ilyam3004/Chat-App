import React, {ChangeEvent, useState} from "react";
import '../../App.scss';

interface LobbyInputProps {
    name: string;
    type: string;
    placeholder: string;
    errorMessage: string;
    label: string;
    pattern: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LobbyInput = (props: LobbyInputProps) => {

    const [focused, setFocused] = useState<boolean>(false);

    const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        setFocused(true);
    }

    return (
        <div className="lobby-input-container">
            <label className="input-label">{props.label}</label>
            <input className="lobby-input"
                   name={props.name}
                   type={props.type}
                   placeholder={props.placeholder}
                   pattern={props.pattern}
                   required={props.required}
                   onChange={props.onChange}
                   onFocus={() =>
                       setFocused(true)
                   }
                   onBlur={handleFocus}/>
            <span className="error">{props.errorMessage}</span>
        </div>
    )
}