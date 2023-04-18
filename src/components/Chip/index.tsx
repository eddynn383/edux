import sx from '../../styles/component.module.scss'

const Chip = ({ children, theme="light", size="small", status="default" }: any) => {
    return (
        <span className={sx["chip"]} data-theme={theme} data-size={size} data-status={status} >{children}</span>
    )
}

export default Chip