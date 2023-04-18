import sx from '../../styles/component.module.scss'
import { IPropsButton } from './interface'


const Button = ({id, value, size="medium", theme="light", variant="solid", status="accent", surface="1", content="text", type="button", title, disabled, style, onClick, children }: IPropsButton) => {
    return (
        <button className={sx.button} id={id} value={value} type={type} title={title} disabled={disabled} style={style} onClick={onClick} data-theme={theme} data-variant={variant} data-size={size} data-status={status} data-surface={surface} data-content={content}  >
            {children ? children : value}
        </button>
    )
}

export default Button