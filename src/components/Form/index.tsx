import sx from "../../styles/component.module.scss"

const Form = ({children, event, style}:any) => {
    return (
        <form className={sx.form} onSubmit={event} style={style}>{children}</form>
    )
}

export default Form