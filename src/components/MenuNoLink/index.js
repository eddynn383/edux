import Text from '../Text'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuNoLink = ({cn, title, text, iconBefore, iconAfter, onClick, children}) => {

    return (
        <button className={cn ? `${'no-link'} ${cn}` : `${'no-link'}`} title={title} onClick={onClick}>
            {iconBefore}
            {text && <Text>{text}</Text>}
            {iconAfter}
            {children}
        </button>
    )
}

export default MenuNoLink