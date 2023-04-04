import MenuItem from '../MenuItem';
import { IPropsMenu } from './interface';
import sx from '../../styles/component.module.scss'

const Menu = ({data, theme}: IPropsMenu) => {

    let active = false

    const clickHandler = (e:any) => {
        e.isActive = active
        active = !active
    }

    console.log("***** MENU THEME *****")
    console.log(theme)

    return (
        <nav className={sx.menu}>
            <ul data-level={1}>
                {
                    data?.map((item:any, i:any) => {
                        const depthLevel = 0
                        return (
                            <MenuItem item={item} key={i} depthLevel={depthLevel} theme={theme} />
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Menu