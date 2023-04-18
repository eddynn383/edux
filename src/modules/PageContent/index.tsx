import sx from '../../styles/modules.module.scss'

const Content = ({ children }: any) => {
    return (
        <div className={sx["content"]}>{children}</div>
    )
}


export default Content