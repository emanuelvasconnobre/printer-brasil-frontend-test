import { ToastLevel } from "../../utils/typing/toast-level";
import { axiosRequest } from "../axiosRequest";
import { UserModel } from "../protocols/model";
import { ServiceResponse } from "../protocols/service-response";
import { LoginDto, RegisterDto } from "./dtos";

const catchCallback = <T = any>(error: any) => {
  if (error instanceof Error) {
    return new ServiceResponse<T>({
      message: error.message,
      success: false,
      level: ToastLevel.ERROR,
    });
  }

  return new ServiceResponse<T>({
    success: false,
    level: ToastLevel.ERROR,
  });
};

export class AuthService {
  async login(dto: LoginDto) {
    try {
      const { data: body } = await axiosRequest<UserModel>({
        url: "/auth/login",
        method: "POST",
        data: dto,
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<UserModel>(error);
    }
  }
  async register(dto: RegisterDto) {
    try {
      const { data: body } = await axiosRequest({
        url: "/auth/register",
        method: "POST",
        data: dto,
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
      });
    } catch (error: any) {
      return catchCallback(error);
    }
  }

  async logout() {
    try {
      const { data: body } = await axiosRequest({
        url: "/auth/logout",
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
      });
    } catch (error: any) {
      return catchCallback(error);
    }
  }

  async checkAccess() {
    try {
      const { data: body } = await axiosRequest<UserModel>({
        url: "/auth",
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
      });
    } catch (error: any) {
      return catchCallback<UserModel>(error);
    }
  }
}
