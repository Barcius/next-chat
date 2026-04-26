import { NextResponse } from 'next/server';
import { toast } from 'sonner';

export type ErrorType = 'validation' | 'server' | 'network' | 'noop' | 'unknown';

export class CustomError extends Error {
  type: string;
  httpStatus?: number;

  constructor(message: string, type: ErrorType, httpStatus?: number, options?: ErrorOptions) {
    super(message, options);

    this.type = type;
    this.httpStatus = httpStatus;

    Error.captureStackTrace(this, CustomError);
  }
}

export function getCustomFetchError(e: unknown) {
  if (e instanceof CustomError) return e;
  else {
    if (e instanceof Error && e.name === 'AbortError') return new CustomError('', 'noop');
    else if (e instanceof TypeError) return new CustomError('Network error', 'network');
    else if (e instanceof Error) return new CustomError(e.message, 'unknown');
    else return new CustomError(String(e), 'unknown');
  }
}

export function errorToResponse(e: Error) {
  let err: CustomError;
  if (!(e instanceof CustomError)) err = new CustomError(e.message, 'unknown');
  else err = e;
  return NextResponse.json(
    { message: err.message, type: err.type, httpStatus: err.httpStatus },
    { status: 500 },
  );
}

interface ErrorResponse {
  message: string;
  type: ErrorType;
  httpStatus?: number;
}

export function responseToError(r: ErrorResponse) {
  return new CustomError(r.message, r.type, r.httpStatus);
}

export function throwOnErrorResponse(res: Response) {
  if (!res.ok) {
    throw new CustomError(`Request failed: ${res.statusText}`, 'server', res.status);
  }
}

const handleError = (e: unknown) => {
  if (e instanceof CustomError && e.type === 'noop') {
    // toast('noop');
    return;
  }
  const msg = e instanceof Error ? e.message : String(e);
  toast.error(msg);
};

export default handleError;
