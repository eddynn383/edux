import { useState, useEffect } from "react"
import { IPropsModal } from "./interface"
import sx from "../../styles/component.module.scss"
import Button from "../Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Modal = ({id, title, style, theme="light", state, onClickOutside, onClose, onCancel, onConfirm, children}: IPropsModal) => {
    const [delayedState, setDelayedState] = useState("");

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
        <div className={sx["modal"]} id={id} style={style} data-theme={theme} data-state={delayedState}>
            <div className={sx["modal-mask"]} onClick={onClickOutside}></div>
            <div className={sx["modal-outer"]}>
                {title && <h2 className={sx["modal-title"]}>{title}</h2>}
                {onClose && 
                <div className={sx["modal-close-button"]}>
                    <Button type="button" size="xsmall" theme={theme} variant="neutral" status="neutral" surface="1" content="icon" onClick={onClose} >
                        <FontAwesomeIcon icon="close" />
                    </Button>
                </div>         
                }
                <div className={sx["modal-inner"]}>
                    {children}
                </div>
                <div className={sx["modal-actions"]}>
                    <Button type="button" size="small" theme={theme} variant="neutral" status="neutral" surface="2" content="text" onClick={onCancel}><FontAwesomeIcon icon="close" /> Cancel</Button>
                    <Button type="submit" size="small" theme={theme} variant="solid" status="fail" content="text" onClick={onConfirm} ><FontAwesomeIcon icon="trash" /> Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal
