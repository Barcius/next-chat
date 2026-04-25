const BASE_URL = 'https://molaanus.lightboxapi.ru'; // 'https://jsonplaceholder.typicode.com';
import handleError, { CustomError } from '../lib/error/error';

export async function fetchBase<T>(path: string, options: RequestInit = {}): Promise<T | void> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      throw new CustomError(`Request failed: ${res.statusText}`, 'serverError', res.status);
    }

    return res.json();
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') return;
    handleError(e instanceof Error ? new CustomError('Network error', 'networkError') : e);
  }
}
