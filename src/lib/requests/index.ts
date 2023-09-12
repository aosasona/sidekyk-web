import apisauce from "apisauce";

const API_URL = (import.meta.env.VITE_API_URL as string) ?? "https://api.sidekyk.app/api/v1";

const api = apisauce.create({
  baseURL: API_URL,
});

// function post<T>(url: string, data: any): Promise<Result<T>> { }
//

export { api };
