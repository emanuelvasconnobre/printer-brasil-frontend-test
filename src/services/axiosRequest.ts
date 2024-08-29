import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";
import { ApiResponse } from "./protocols/response";

export async function axiosRequest<R>(
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<ApiResponse<R>, any> & { success: boolean }> {
  try {
    const response = await Api.request<ApiResponse<R>>({
      method: "GET",
      ...config,
      headers: {
        ...config.headers,
      },
    });

    return {
      ...response,
      success: response.status >= 200 && response.status < 300,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error("The request returns an error ");
    }
    throw new Error("Unexpected error");
  }
}
