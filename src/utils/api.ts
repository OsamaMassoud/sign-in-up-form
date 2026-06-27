export type JsonValue = Record<string, any> | string | number | boolean | null | undefined;

export async function fetchJson<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, options);

  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new Error(body || `Request failed with status ${res.status}`);
  }

  return body as T;
}