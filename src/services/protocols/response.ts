export class ApiResponse<T = any> {
  message!: string;
  data?: T;
}
