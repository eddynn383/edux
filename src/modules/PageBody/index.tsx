import sx from '../../styles/modules.module.scss'

const PageBody = ({ children, theme }: any) => {
    return (
        <div className={sx["body"]} data-theme={theme}>
            <div className={sx["body-inner"]}>
                {children}
            </div>
        </div>
    )
}

export default PageBody