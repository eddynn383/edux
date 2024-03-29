import { IPropsAlert } from './interface'
import StatusIcon from '../StatusIcon'
import sx from '../../styles/component.module.scss'

const Alert = ({id, theme="light", variant="solid", status, action, style, children}: IPropsAlert) => {
    return (
        <div className={sx["alert"]} id={id} style={style} data-theme={theme} data-variant={variant} data-status={status}>
            <div className={sx['alert-icon']}>
                <StatusIcon status={status}/>
            </div>
            <div className={sx['alert-text']}>
                {children}
            </div>
            {action && <div className={sx['alert-action']}>{action}</div>}
        </div>
    )
}

const Title = (props: any) => <h3 className={sx['alert-title']}>{props.children}</h3>
Alert.Title = Title;

const Desciption = (props: any) => <p className={sx['alert-description']}>{props.children}</p>
Alert.Description = Desciption;

export default Alert