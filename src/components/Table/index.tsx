import sx from '../../styles/component.module.scss'

const Table = ({id, style, children}:any) => {
    return (
        <div className={sx["table"]} id={id} role="table" style={style}>
            {children}
        </div>
    )
}

export default Table
