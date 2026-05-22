const { BASE_URL } = process.env;

import { getCustomFetchError, throwOnErrorResponse } from '../lib/error/error';

export async function fetchBase<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    throwOnErrorResponse(res);

    return res.json();
  } catch (e) {
    throw getCustomFetchError(e);
  }
}
