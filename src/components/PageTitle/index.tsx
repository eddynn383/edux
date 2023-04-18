import sx from '../../styles/component.module.scss'
import { IPropsPageTitle } from './interface'


const PageTitle = ({title, id, theme}:IPropsPageTitle) => {
  return (
    <div className={sx["page-title"]} id={id} data-theme={theme} >
        <h1>{title}</h1>
    </div>
  )
}

export default PageTitle