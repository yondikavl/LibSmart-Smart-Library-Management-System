const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

export function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}
