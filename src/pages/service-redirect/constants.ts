import { VscError as ErrorIcon } from "react-icons/vsc";
import { TbCloudCheck as SuccessIcon } from "react-icons/tb";
import { ImSpinner9 as SpinnerIcon } from "react-icons/im";

export const statuses = {
    Loading: { Icon: SpinnerIcon, style: "text-text-white animate-spin", title: "Connecting the service", desription: "We are working on it, please wait..." },
    Fail: { Icon: ErrorIcon, style: "text-danger-600", title: "Something went wrong", desription: "We couldn't retrieve the token from this service. Please, try again :c" },
    Success: { Icon: SuccessIcon, style: "text-success-600", title: "Success", desription: "Service was successfully connected. You will be redirected soon" },
}