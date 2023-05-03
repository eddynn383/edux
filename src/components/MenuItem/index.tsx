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
        <li className={sx['menu-item']} id={id} style={style} data-active={router.pathname === item.url ? true : false}>
            {
                item.children ? (
                    <>
                        <NoLink title={item.title} iconBefore={item.icon && <FontAwesomeIcon icon={item.icon} />} text={item.title} iconAfter={<FontAwesomeIcon icon="chevron-right" />} theme={theme} onClick={() => setShow(prev => !prev)} />
                        <MenuDropdown items={item.children} parent={item.title} setShow={setShow} show={show} depthLevel={depthLevel} theme={theme} />
                    </> 
                ) : (
                    <Link to={item.url} title={item.title} iconBefore={item.icon && <FontAwesomeIcon icon={item.icon} />} text={item.title} theme={theme} />
                )
            }
        </li>
    )
}

export default MenuItem
