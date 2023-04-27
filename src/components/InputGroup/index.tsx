import { IPropsInputGroup } from "./interface"
import sx from "../../styles/component.module.scss"

const InputGroup = ({id, style, children}:IPropsInputGroup) => {
    return (
        <div className={sx["input-group"]} id={id} style={style}>{children}</div>
    )
}

export default InputGroup