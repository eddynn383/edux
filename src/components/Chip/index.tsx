import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sx from '../../styles/component.module.scss'
import Button from '../Button'
import { IPropsChip } from './interface'

const Chip = ({ id, title, style, theme="light", size="small", status="default", onClose, children }: IPropsChip) => {
    return (
        <span className={sx["chip"]} id={id} title={title} style={style} data-theme={theme} data-size={size} data-status={status} >
            <span className={sx["chip-text"]}>{children}</span>
            {onClose && 
                <Button type="button" size="xsmall" variant="text" surface="2" status="neutral" theme={theme} content="icon" onClick={onClose} >
                    <FontAwesomeIcon icon="close" />
                </Button>
            }
        </span>
    )
}

export default Chip