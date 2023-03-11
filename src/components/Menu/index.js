import MenuItem from '../MenuItem';

const Menu = ({data}) => {

    let active = false

    const clickHandler = (e) => {
        e.isActive = active
        active = !active
    }

    return (
        <nav>
            <ul className="level1">
                {
                    data?.map((item, i) => {
                        const depthLevel = 0
                        return (
                            <MenuItem item={item} key={i} depthLevel={depthLevel} />
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Menu