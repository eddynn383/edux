import NoLink from '../MenuNoLink'
import MenuItem from '../MenuItem';
import { IPropsMenuDropdown } from './interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sx from '../../styles/component.module.scss'

const MenuDropdown = ({items, parent, show, setShow, depthLevel, theme}:IPropsMenuDropdown) => {
    depthLevel = depthLevel + 1
    const dropdownClass = depthLevel > 1 ? " dropdown-submenu" : ""
    // console.log("***** MENU DROPDOWN THEME *****")
    // console.log(theme)
    return (
        <>
            {items.length > 0 && (
                <ul className={sx['menu_dropdown']}>
                    <NoLink cn="back-to" title={parent} iconBefore={<FontAwesomeIcon icon="chevron-left" />} text={parent} theme={theme} onClick={() => setShow(false)} />
                    {
                        items.map((item:any, i:any) => (
                            <MenuItem item={item} key={i} depthLevel={depthLevel} theme={theme} />
                        ))
                    }
                </ul>
            )}
        </>
    )
}

export default MenuDropdown
