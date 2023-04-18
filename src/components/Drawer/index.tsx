import sx from '../../styles/component.module.scss'

const Drawer = ({ children, state, size="medium", theme="light" }:any) => {
    return (
        <div className={sx["drawer"]} data-state={state} data-size={size} data-theme={theme}>
            <div className={sx["drawer-inner"]}>
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