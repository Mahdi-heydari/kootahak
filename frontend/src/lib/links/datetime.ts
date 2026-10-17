export function toIsoDateTime(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
}

export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (part: number) => String(part).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
