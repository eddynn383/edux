import sx from '../../styles/component.module.scss'

const TableHead = ({id, style, children}:any) => {
    return (
        <div className={sx["table-head"]} id={id} style={style}>
            {children}
        </div>
    )
}

export default TableHead
