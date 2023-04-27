import { useState, useEffect } from 'react';
import { IPropsInput } from './interface'
import sx from '../../styles/component.module.scss'

const Input = ({id, name, type, innerRef, placeholder, value, autoComplete, ariaInvalid, ariaDescribedBy, style, theme="light", variant="outline", size="medium", status, iconBefore, iconAfter, focus, onClick, onChange, onFocus, onBlur }:IPropsInput) => {
    const [inputType, setInputType] = useState(type)

    const innerProps = {
        name,
        id,
        placeholder,
        value,
        autoComplete,
        ref: innerRef,
        onClick,
        onChange,
        onFocus,
        onBlur
    }

    useEffect(() => {
        setInputType(type)
    }, [type]) 

    return (
        <div className={sx["input"]} id={id} style={style} data-theme={theme} data-variant={variant} data-size={size} data-status={status} data-icon={iconBefore && iconAfter ? 'both' : iconBefore ? 'before' : iconAfter ? 'after' : null } data-focus={focus} >
            {iconBefore}
            {
                <input className={sx["input-inner"]} {...innerProps} type={inputType} aria-invalid={ariaInvalid} aria-describedby={ariaDescribedBy} />
            }
            {iconAfter}
        </div>
    )
}

export default Input