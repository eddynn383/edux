import sx from '../../styles/component.module.scss'

const TableRow = ({ cn, style, children }:any) => {
    return (
        <div className={sx["table-row"]} role="row" style={style} >
            {children}
        </div>
    )
}

export default TableRow
