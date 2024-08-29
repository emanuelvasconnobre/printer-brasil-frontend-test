import { toast } from "react-toastify";
import { ToastLevel } from "../utils/typing/toast-level";

type Props = {
  level?: ToastLevel;
};

export const useToast = (
  message: string,
  options: Props = { level: undefined }
) => {
  switch (options.level) {
    case ToastLevel.INFO.toString():
      toast.success(message, { className: "custom-toast-success" });
      break;
    case ToastLevel.ERROR.toString():
      toast.error(message, { className: "custom-toast-error" });
      break;
    case ToastLevel.WARN.toString():
      toast.warning(message, { className: "custom-toast-warning" });
      break;
    default:
      toast(message);
      break;
  }
};
