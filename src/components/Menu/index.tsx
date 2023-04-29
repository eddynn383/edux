import MenuItem from '../MenuItem';
import { IPropsMenu } from './interface';
import sx from '../../styles/component.module.scss'
import { IMenuItem } from '../MenuItem/interface';

const Menu = ({id, style, data, theme="light"}: IPropsMenu) => {

    let active = false

    const clickHandler = (e:any) => {
        e.isActive = active
        active = !active
    }

    console.log(data)

    return (
        <nav className={sx.menu} id={id} style={style} >
            <ul data-level={1}>
                {
                    data?.map((item: IMenuItem, i:React.Key) => {
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