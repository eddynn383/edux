import { useState } from 'react'
import Link from '../MenuLink'
import NoLink from '../MenuNoLink'
import MenuDropdown from '../MenuDropdown'
import { IPropsMenuItem } from './interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/router"
import sx from '../../styles/component.module.scss'

const MenuItem = ({item, depthLevel, theme}:IPropsMenuItem) => {
    const [show, setShow] = useState(false)
    const router = useRouter()
    const currentPageName = router.pathname.replace("/", "")
    // console.log(router)
    // console.log(item.link)
    // console.log("***** MENU ITEM THEME *****")
    // console.log(theme)
    return (
        <li className={sx['menu-item']} data-active={router.pathname === item.link ? true : false}>
            {
                item.children ? (
                    <>
                        <NoLink cn={item.class} title={item.label} iconBefore={<FontAwesomeIcon icon={item.icon} />} text={item.label} iconAfter={<FontAwesomeIcon icon="chevron-right" />} theme={theme} onClick={() => setShow(prev => !prev)} />
                        <MenuDropdown items={item.children} parent={item.label} setShow={setShow} show={show} depthLevel={depthLevel} theme={theme} />
                    </> 
                ) : (
                    <Link to={item.link} cn={item.class} title={item.label} iconBefore={<FontAwesomeIcon icon={item.icon} />} text={item.label} theme={theme} />
                )
            }
            
        </li>
    )
}

export default MenuItem
