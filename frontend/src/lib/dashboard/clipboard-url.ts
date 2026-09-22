function normalizeUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }
  } catch {
    return null;
  }

  return null;
}

export function extractUrlFromText(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const direct = normalizeUrl(trimmed);
  if (direct) return direct;

  if (!trimmed.includes(" ")) {
    const withProtocol = normalizeUrl(`https://${trimmed}`);
    if (withProtocol) return withProtocol;
  }

  const embedded = trimmed.match(/https?:\/\/[^\s<>"{}|\\^`[\]]+/i);
  if (embedded) {
    return normalizeUrl(embedded[0]);
  }

  return null;
}

export async function readUrlFromClipboard(): Promise<string | null> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
    return null;
  }

  try {
    const text = await navigator.clipboard.readText();
    return extractUrlFromText(text);
  } catch {
    return null;
  }
}
