import { useState, useEffect } from "react"
import { IPropsDrawer } from './interface';
import sx from '../../styles/component.module.scss'

const Drawer = ({ id, style, theme="light", width, state, onClickOutside, children }:IPropsDrawer) => {
    const [delayedState, setDelayedState] = useState("");

    const innerStyle = {
        "width": width,
    }

    useEffect(() => {
        if (state) {
          // Delay the state update by 10ms
          const timeoutId = setTimeout(() => {
            setDelayedState(state);
          }, 10);
    
          return () => {
            clearTimeout(timeoutId);
          };
        }
    }, [state]);
    
    return (
        <div className={sx["drawer"]} id={id} style={style} data-width={width} data-state={delayedState} data-theme={theme}>
            <div className={sx["drawer-mask"]} onClick={onClickOutside}></div>
            <div className={sx["drawer-inner"]} style={innerStyle}>
                {children}
            </div>
        </div>
    );
};

const Header = (props: any) => <div className={sx['drawer-header']}>{props.children}</div>
Drawer.Header = Header;

const Body = (props: any) => <div className={sx['drawer-body']}>{props.children}</div>
Drawer.Body = Body;

const Footer = (props: any) => <div className={sx['drawer-footer']}>{props.children}</div>
Drawer.Footer = Footer;

export default Drawer