import Image from 'next/image'
import sx from '../../styles/component.module.scss'
import { IPropsAvatar } from './interface'


const Avatar = ({src, alt, id, theme="light", size="medium", type="square"}:IPropsAvatar) => {
  return (
    <div className={sx.avatar} id={id} data-theme={theme} data-size={size} data-type={type}>
        <Image className="profile" width="36" height="36" src={src} alt={alt} /> 
    </div>
  )
}

export default Avatar