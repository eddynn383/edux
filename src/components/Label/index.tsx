import sx from '../../styles/component.module.scss'

const Label = ({htmlFor, children}:any) => {
    return (
        <label htmlFor={htmlFor} className={sx["label"]}>{children}</label>
    )
}

export default Label