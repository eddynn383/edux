import sx from '../../styles/modules.module.scss'

const Toolbar = ({ children, left, right }: any) => {
    return (
        <div className={sx["toolbar"]}>
            <div className={sx["toolbar-left"]}>{left}</div>
            {children}
            <div className={sx["toolbar-right"]}>{right}</div>
        </div>
    )
}


export default Toolbar