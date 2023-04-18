import { useState, useEffect } from 'react';
import { IPropsInput } from './interface'
import sx from '../../styles/component.module.scss'

const Input = ({id, name, type, innerRef, theme="light", size="medium", variant="outline", placeholder, value, autoComplete, iconBefore, iconAfter, ariaInvalid, ariaDescribedBy, status, focus, style, onClick, onChange, onFocus, onBlur }:IPropsInput) => {
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
        <div className={sx["input"]} id={id} data-theme={theme} data-variant={variant} data-icon={iconBefore && iconAfter ? 'both' : iconBefore ? 'before' : iconAfter ? 'after' : null } data-size={size} data-focus={focus} data-status={status} style={style} >
            {iconBefore}
            {
                <input className={sx["input-inner"]} {...innerProps} type={inputType} aria-invalid={ariaInvalid} aria-describedby={ariaDescribedBy} />
            }
            {iconAfter}
        </div>
    )
}

export default Input