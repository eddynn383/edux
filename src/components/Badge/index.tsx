import sx from '../../styles/component.module.scss'
import { IPropsBadge } from './interface';

const Badge = ({id, value, title, style, max, theme="light", size="medium", status="accent", children }: IPropsBadge) => {
    const val = max ? (value > max ? `${max}+` : `${value}`) : `${value}`

    if (!value && !children) {
        return null;
    }

    return (
        <span className={sx["badge"]} id={id} title={title} style={style} data-value={val} data-maxvalue={max} data-theme={theme} data-size={size} data-status={status} >
            {children ? children : val}
        </span>
    )
}

export default Badge