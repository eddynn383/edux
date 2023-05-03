import { useRef, useEffect } from "react"
import { IPropsCheckbox } from "./interface";
import sx from '../../styles/component.module.scss'

const Checkbox = ({ checked, indeterminate, onChange }: IPropsCheckbox) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate]);

    return (
        <input className={sx["checkbox"]} type="checkbox" ref={checkboxRef} checked={checked} data-state={checked ? "checked" : indeterminate ? "indeterminate" : "unchecked"} onChange={onChange} />
    )
}

export default Checkbox
