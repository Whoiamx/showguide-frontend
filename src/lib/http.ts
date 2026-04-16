export async function readErrorMessage(
  response: Response,
  fallbackMessage: string,
): Promise<string> {
  try {
    const raw = (await response.text()).trim();
    if (!raw) return fallbackMessage;

    try {
      const data = JSON.parse(raw) as {
        error?: unknown;
        message?: unknown;
      };

      if (typeof data.error === "string" && data.error.trim()) {
        return data.error;
      }

      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }
    } catch {
      // Non-JSON error payloads are still valid for display.
    }

    return raw;
  } catch {
    return fallbackMessage;
  }
}
