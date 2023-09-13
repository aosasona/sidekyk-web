import apisauce from "apisauce";
import { Err, Ok, type NullableObject, type Result } from "../errors";

type Endpoint = `/${string}`;

type CustomApiResponse<T extends NullableObject, M extends NullableObject = null> = {
  ok: boolean;
  message: string;
  status_code: number;
  data: T;
  error?: string;
  errors?: any;
  meta?: M;
};

const API_URL = (import.meta.env.VITE_API_URL as string) ?? "https://api.sidekyk.app/api/v1";

const api = apisauce.create({
  baseURL: API_URL,
});

async function post<Input extends NullableObject, Response extends NullableObject>(endpoint: Endpoint, data: Input): Promise<Result<Response, Input>> {
  try {
    const response = await api.post<CustomApiResponse<Response>>(endpoint, data);
    if (!response.ok) {
    }
    return Ok(response?.data?.message, response?.data?.data);
  } catch (error) {
    return Err((error as Error)?.message ?? "Something went wrong");
  }
}

export type { CustomApiResponse };
export { api };
