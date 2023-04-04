import Text from '../Text'
import { IPropsMenuNoLink } from './interface'

const MenuNoLink = ({cn, id, title, text, iconBefore, iconAfter, onClick, children}:IPropsMenuNoLink) => {
    return (
        <button className={cn ? `${'no-link'} ${cn}` : `${'no-link'}`} id={id} title={title} onClick={onClick}>
            {iconBefore}
            {text && <Text>{text}</Text>}
            {iconAfter}
            {children}
        </button>
    )
}

export default MenuNoLink