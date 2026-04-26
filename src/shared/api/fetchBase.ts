// const BASE_URL = 'https://molaanus.lightboxapi.ru'; // 'https://jsonplaceholder.typicode.com';
const BASE_URL = 'http://localhost:4000';

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

    debugger;
    throwOnErrorResponse(res);

    return res.json();
  } catch (e) {
    throw getCustomFetchError(e);
  }
}
