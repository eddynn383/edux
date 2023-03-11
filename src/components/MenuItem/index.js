import { useState } from 'react'
import Link from '../MenuLink'
import NoLink from '../MenuNoLink'
import MenuDropdown from '../MenuDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuItem = ({item, depthLevel}) => {
    const [show, setShow] = useState(false)

    return (
        <li className={`${item.children ? 'has-children' : ''} ${item.children > 0 ? show ? 'open' : 'close' : ''}`}>
            {
                item.children ? (
                    <>
                        <NoLink cn={item.class} title={item.label} iconBefore={<FontAwesomeIcon icon={item.icon} />} text={item.label} iconAfter={<FontAwesomeIcon icon="chevron-right" />} onClick={() => setShow(prev => !prev)} />
                        <MenuDropdown items={item.children} parent={item.label} setShow={setShow} depthLevel={depthLevel} />
                    </>
                ) : (
                    <Link to={item.link} cn={item.class} title={item.label} iconBefore={<FontAwesomeIcon icon={item.icon} />} text={item.label} />
                )
            }
            
        </li>
    )
}

export default MenuItem
