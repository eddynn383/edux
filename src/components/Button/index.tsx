import sx from '../../styles/component.module.scss'
import { IPropsButton } from './interface'


const Button = ({ cn, id, value, size="medium", theme="light", variant="solid", status="accent", content="text", type="button", title, disabled, style, onClick, children }: IPropsButton) => {
    return (
        <button className={cn ? `${sx.button} ${cn}` : `${sx.button}`} id={id} value={value} type={type} title={title} disabled={disabled} style={style} onClick={onClick} data-theme={theme} data-status={status} data-variant={variant} data-content={content} data-size={size} >
            {children ? children : value}
        </button>
    )
}

export default Button