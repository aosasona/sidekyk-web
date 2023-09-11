export type ErrorType = "validation" | "other";

export type Problem<E extends ErrorType, Input extends object = {}> = { type: E; message: string; errors: E extends "validation" ? Record<keyof Input, string> : never };

export type ErrResult<Input extends object = {}> = { ok: false; problem: Problem<ErrorType, Input>; code?: number; error: () => string };

export type OkResult<Response extends object = {}> = { ok: true; message: string; data: Response };

export type Result<Response extends object = {}, Input extends object = {}, ResultType extends "ok" | "error" = "ok"> = ResultType extends "error"
  ? ErrResult<Input>
  : OkResult<Response>;

export function Ok<T extends object = {}>(message: string, data: T): Result<T> {
  return { ok: true, message, data };
}

// Fix this to use Err("string") for normal errors
export function Err<T extends object = {}, I extends object = {}, E extends ErrorType = "other">(type: E, problem: Problem<E, I>, code: number = 500): Result<T, I, "error"> {
  return { ok: false, problem: { ...problem, type }, code, error: () => problem.message };
}
