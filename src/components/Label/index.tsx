import sx from '../../styles/component.module.scss'
import { IPropsLabel } from './interface'

const Label = ({ id, htmlFor, style, children }:IPropsLabel) => {
    return (
        <label className={sx["label"]} id={id} htmlFor={htmlFor} style={style}>{children}</label>
    )
}

export default Label