import apisauce from "apisauce";
import type { NullableObject, Result } from "../errors";

type Endpoint = `/${string}`;

const API_URL = (import.meta.env.VITE_API_URL as string) ?? "https://api.sidekyk.app/api/v1";

const api = apisauce.create({
  baseURL: API_URL,
});

async function post<R extends NullableObject = null, I extends NullableObject = null>(endpoint: Endpoint, data: I): Promise<Result<R, I>> { }

export { api };
