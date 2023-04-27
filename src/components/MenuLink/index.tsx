import Link from 'next/link';
import { IPropsMenuLink } from './interface';
import sx from '../../styles/component.module.scss'

const NavLink = ({to, id, title, iconBefore, text, iconAfter, style, theme="light", children}:IPropsMenuLink) => {
    return (
        <Link className={sx['menu-link']} id={id} href={to} title={title} style={style} data-theme={theme}>
            {iconBefore}
            {text && <span>{text}</span>}
            {iconAfter}
            {children}
        </Link>
    )
}

export default NavLink 