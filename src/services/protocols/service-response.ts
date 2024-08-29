import { ToastLevel } from "../../utils/typing/toast-level";

export class ServiceResponse<D = any> {
  success: boolean;
  level: ToastLevel;
  message: string;
  data?: D;
  error?: Error;

  constructor(
    options: {
      message?: string;
      success?: boolean;
      level?: ToastLevel;
      data?: D;
      error?: Error;
    } = {}
  ) {
    this.success = options.success ?? true;
    this.level = options.level ?? ToastLevel.INFO;
    this.message = options.message ?? "Success";
    this.data = options.data;
    this.error = options.error;
  }
}
