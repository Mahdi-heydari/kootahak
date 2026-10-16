import type { AnalyticsBucket } from "@/types/analytics";

const faNumber = new Intl.NumberFormat("fa-IR");

const DEVICE_LABELS: Record<string, string> = {
  desktop: "دسکتاپ",
  mobile: "موبایل",
  tablet: "تبلت",
  smarttv: "تلویزیون",
  wearable: "پوشیدنی",
  console: "کنسول",
  embedded: "توکار",
  unknown: "نامشخص",
};

const regionNames = new Intl.DisplayNames(["fa"], { type: "region" });

export function formatCount(value: number): string {
  return faNumber.format(value);
}

export function deviceLabel(key: string): string {
  return DEVICE_LABELS[key] ?? key;
}

export function browserLabel(key: string): string {
  if (!key || key === "unknown") return "نامشخص";
  return key;
}

export function countryLabel(key: string): string {
  if (!key || key === "unknown") return "نامشخص";
  try {
    return regionNames.of(key) ?? key;
  } catch {
    return key;
  }
}

export function weeklyLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const instant = new Date(Date.UTC(year, month - 1, day, 8, 30, 0));
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Tehran",
  }).format(instant);
}

export function bucketSeries(
  buckets: AnalyticsBucket[],
  labelFor: (key: string) => string,
): { labels: string[]; series: number[] } {
  return {
    labels: buckets.map((bucket) => labelFor(bucket.key)),
    series: buckets.map((bucket) => bucket.count),
  };
}
