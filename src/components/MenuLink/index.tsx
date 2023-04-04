import Link from 'next/link';
import { IPropsMenuLink } from './interface';
import sx from '../../styles/component.module.scss'

const NavLink = ({to, cn, id, title, iconBefore, text, iconAfter, theme, children}:IPropsMenuLink) => {
    console.log("***** MENU LINK THEME *****")
    console.log(theme)
    return (
        <Link href={to} className={sx['menu-link']} id={id} title={title}>
            {iconBefore}
            {text && <span>{text}</span>}
            {iconAfter}
            {children}
        </Link>
    )
}

export default NavLink 