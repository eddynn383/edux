import sx from '../../styles/component.module.scss'

const TableCell = ({ id, type="cell", style, children }:any) => {
    return (
        <div className={sx["table-cell"]} id={id} role={type} style={style}>
            {children}
        </div>
    )
}

export default TableCell
