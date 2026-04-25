import { fetchBase } from './fetchBase';
import 'server-only';

export type RqInitWithBody = Omit<RequestInit, 'method'> & { body: BodyInit };

const api = {
  get: <T>(url: string, options?: RequestInit) => fetchBase<T>(url, options),
  post: <T>(url: string, options: RqInitWithBody) =>
    fetchBase<T>(url, { method: 'POST', ...options }),
  patch: <T>(url: string, options: RqInitWithBody) =>
    fetchBase<T>(url, { method: 'PATCH', ...options }),
  delete: <T>(url: string) => fetchBase<T>(url, { method: 'DELETE' }),
  fetch: fetchBase,
};

export default api;
