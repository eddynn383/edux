import sx from "../../styles/component.module.scss"
import { IPropsForm } from "./interface"

const Form = ({ id, style, onSubmit, children}:IPropsForm) => {
    return (
        <form className={sx.form} id={id} style={style} onSubmit={onSubmit}>{children}</form>
    )
}

export default Form