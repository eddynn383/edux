import NoLink from '../MenuNoLink'
import MenuItem from '../MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuDropdown = ({items, parent, show, setShow, depthLevel}) => {
    depthLevel = depthLevel + 1
    const dropdownClass = depthLevel > 1 ? " dropdown-submenu" : ""
    return (
        items.length > 0 && (
            <ul className={`dropdown${dropdownClass} ${show ? "show" : ""}`}>
                <NoLink cn="back-to" title={parent} iconBefore={<FontAwesomeIcon icon="chevron-left" />} text={parent} onClick={() => setShow(false)} />
                {
                    items.map((item, i) => (
                        <MenuItem item={item} key={i} depthLevel={depthLevel} />
                    ))
                }
            </ul>
        )
    )
}

export default MenuDropdown
