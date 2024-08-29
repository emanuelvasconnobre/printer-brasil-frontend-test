import { EventSourceService } from "../../utils/EventSourceService";
import { ToastLevel } from "../../utils/typing/toast-level";
import { Api } from "../api";
import { axiosRequest } from "../axiosRequest";
import { TaskModel } from "../protocols/model";
import { ServiceResponse } from "../protocols/service-response";
import {
  CreateTaskDto,
  GetManyTasksParamsDto,
  UpdateTaskDto,
} from "./dtos";

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

export class TaskService {
  async getById(id: string) {
    try {
      const { data: body } = await axiosRequest<TaskModel>({
        url: `/task/${id}`,
        method: "GET",
      });

      return new ServiceResponse<TaskModel>({
        message: body.message,
        data: body.data,
        success: true,
      });
    } catch (error: any) {
      return catchCallback<TaskModel>(error);
    }
  }

  async getMany(dto: Partial<GetManyTasksParamsDto> = {}) {
    try {
      const { data: body } = await axiosRequest<{
        items: TaskModel[];
        countPage: number;
      }>({
        url: "/task",
        params: dto,
      });

      return new ServiceResponse<{ items: TaskModel[]; countPage: number }>({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<{ items: TaskModel[]; countPage: number }>(error);
    }
  }

  async create(dto: CreateTaskDto) {
    try {
      const { data: body } = await axiosRequest<TaskModel>({
        url: "/task",
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
      return catchCallback<TaskModel>(error);
    }
  }

  async update(id: string, dto: Partial<UpdateTaskDto>) {
    try {
      const { data: body } = await axiosRequest<TaskModel>({
        url: `/task/${id}`,
        method: "PUT",
        data: dto,
      });

      return new ServiceResponse<TaskModel>({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback<TaskModel>(error);
    }
  }

  async delete(id: string) {
    try {
      const { data: body } = await axiosRequest({
        url: `/task/${id}`,
        method: "DELETE",
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback(error);
    }
  }

  async deleteAll() {
    try {
      const { data: body } = await axiosRequest({
        url: `/upstream`,
        method: "DELETE",
      });

      return new ServiceResponse({
        message: body.message,
        data: body.data,
        success: true,
        level: ToastLevel.SUCCESS,
      });
    } catch (error: any) {
      return catchCallback(error);
    }
  }

  async uploadTestTasks(handler: (event: MessageEvent) => void) {
    try {
      const eventSourceService = new EventSourceService(
        `${Api.defaults.baseURL}/upstream`
      );

      eventSourceService.connect(handler);

      return eventSourceService;
    } catch (error: any) {
      return catchCallback(error);
    }
  }
}
