import { toast } from 'sonner';

export type ErrorType = 'validationError' | 'serverError' | 'networkError';

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

const handleError = (e: unknown) => {
  const msg = e instanceof Error ? e.message : String(e);
  toast.error(msg);
};

export default handleError;
