import './FormInput.css';
import {useState} from "react";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
        <div className='lobby-input-container'>
            <label className={'input-label'}>{label}</label>
            <input className='lobby-input'
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className={'error'}>{errorMessage}</span>
        </div>
    )
}

export default FormInput;