import Text from '../Text';
import Link from 'next/link';

const NavLink = ({to, cn, title, iconBefore, text, iconAfter, children}) => {
    return (
        <Link href={to} >
            {iconBefore}
            {text && <Text>{text}</Text>}
            {iconAfter}
            {children}
        </Link>
    )
}

export default NavLink