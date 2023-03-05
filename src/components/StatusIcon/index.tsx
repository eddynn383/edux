import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCircleInfo,
    faCircleExclamation,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";

const StatusIcon = ({status}:any) => {
    let icon:any
    switch (status) {
        case "success": icon = faCircleCheck 
            break;
        case "fail": icon = faCircleExclamation
            break;
        case "warning": icon = faTriangleExclamation
            break;
        case "info": icon = faCircleInfo
        default:
            break;
    }
    return (
        <FontAwesomeIcon icon={icon} />
    )
}

export default StatusIcon