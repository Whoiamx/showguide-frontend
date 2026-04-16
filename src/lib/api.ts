const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export function getApiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("API path must start with '/'");
  }

  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}
