import sx from "../../styles/component.module.scss"

const InputGroup = ({children}:any) => {
    return (
        <div className={sx["input-group"]}>{children}</div>
    )
}

export default InputGroup