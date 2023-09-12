type Nullable<T> = T | null;
type NullableObject = Nullable<Record<string, any>>;

type ErrorType = "validation" | "other";

type Problem<P extends ErrorType, I extends NullableObject> = P extends "other" ? string : P extends "validation" ? { message?: string; errors: Record<keyof I, string> } : never;

type ErrResult<Input extends NullableObject> = { ok: false; problem: Problem<ErrorType, Input>; code?: number; error: () => string };

type OkResult<Response extends NullableObject> = { ok: true; message: string; data: Response };

// type Result<Response extends NullableObject, Input extends NullableObject, ResultType extends "ok" | "error"> = ResultType extends "error" ? ErrResult<Input> : OkResult<Response>;

// infer result instead of using ResultType
type Result<Response extends NullableObject, Input extends NullableObject> = OkResult<Response> | ErrResult<Input>;

function Ok<T extends NullableObject>(message: string, data: T = null as T): Result<T, null> {
  return { ok: true, message, data };
}

function Err<T extends object, I extends object, E extends ErrorType>(problem: Problem<E, I>, code: number = 500): Result<T, I> {
  return { ok: false, problem, code, error: () => (typeof problem === "string" ? problem : problem.message ?? "Something went wrong") };
}

function isOk<T extends NullableObject, I extends NullableObject>(result: Result<T, I>): result is OkResult<T> {
  return result.ok;
}

export type { Result, NullableObject };
export { Ok, Err, isOk };
