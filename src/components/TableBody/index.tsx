import sx from '../../styles/component.module.scss'

const TableBody = ({id, style, children}:any) => {
    return (
        <div className={sx["table-body"]} id={id} role="rowgroup" style={style}>
            {children}
        </div>
    )
}

export default TableBody
