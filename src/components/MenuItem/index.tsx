import { useState } from 'react'
import { useRouter } from "next/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '../MenuLink'
import NoLink from '../MenuNoLink'
import MenuDropdown from '../MenuDropdown'
import { IPropsMenuItem } from './interface'
import sx from '../../styles/component.module.scss'

const MenuItem = ({id, style, item, depthLevel, theme="light"}:IPropsMenuItem) => {
    const [show, setShow] = useState(false)
    const router = useRouter()

    return (
        <li className={sx['menu-item']} id={id} style={style} data-active={router.pathname === item.link ? true : false}>
            {
                item.children ? (
                    <>
                        <NoLink title={item.label} iconBefore={item.icon && <FontAwesomeIcon icon={item.icon} />} text={item.label} iconAfter={<FontAwesomeIcon icon="chevron-right" />} theme={theme} onClick={() => setShow(prev => !prev)} />
                        <MenuDropdown items={item.children} parent={item.label} setShow={setShow} show={show} depthLevel={depthLevel} theme={theme} />
                    </> 
                ) : (
                    <Link to={item.link} title={item.label} iconBefore={item.icon && <FontAwesomeIcon icon={item.icon} />} text={item.label} theme={theme} />
                )
            }
        </li>
    )
}

export default MenuItem
