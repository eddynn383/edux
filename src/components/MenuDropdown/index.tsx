import NoLink from '../MenuNoLink'
import MenuItem from '../MenuItem';
import { IPropsMenuDropdown } from './interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sx from '../../styles/component.module.scss'
import React from 'react';
import { IMenuItem } from '../MenuItem/interface';

const MenuDropdown = ({items, parent, show, setShow, depthLevel, theme="light"}:IPropsMenuDropdown) => {
    depthLevel = depthLevel + 1
    const dropdownClass = depthLevel > 1 ? " dropdown-submenu" : ""

    const items2 = [
        {
            allowedUsers: ["asdfasdfasdfasdf"],
            label: "Courses",
            link: "/management/courses"

        }, 
        {
            allowedUsers: ["asdfasdf4334fasf"],
            label: "Users",
            link: "/management/users"
        }
    ]
    
    return (
        <>
            {items.length > 0 && (
                <ul className={`${sx['menu_dropdown']} ${sx[dropdownClass]} ${sx[dropdownClass]} ${sx[show]}`}>
                    <NoLink id="back-to" title={parent} iconBefore={<FontAwesomeIcon icon="chevron-left" />} text={parent} theme={theme} onClick={() => setShow(false)} />
                    {
                        items2.map((item: any, i:React.Key) => (
                            <MenuItem item={item} key={i} depthLevel={depthLevel} theme={theme} />
                        ))
                    }
                </ul>
            )}
        </>
    )
}

export default MenuDropdown
