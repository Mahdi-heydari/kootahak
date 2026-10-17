"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { ApexOptions } from "apexcharts";

import { useLinkAnalytics } from "@/hooks/links/use-link-analytics";
import {
  browserLabel,
  bucketSeries,
  countryLabel,
  deviceLabel,
  formatCount,
  weeklyLabel,
} from "@/lib/analytics/labels";
import { shortLinkUrl } from "@/lib/links/short-url";
import type { AnalyticsBucket } from "@/types/analytics";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 items-center justify-center text-token-sm text-muted-foreground">
      در حال آماده‌سازی نمودار…
    </div>
  ),
});

const CHART_COLORS = [
  "#2563eb",
  "#16a34a",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#ea580c",
  "#4f46e5",
];

type ClickTab = "device" | "browser";
type ViewTab = "week" | "month";

interface LinkAnalyticsPageProps {
  linkId: number;
}

export default function LinkAnalyticsPage({ linkId }: LinkAnalyticsPageProps) {
  const analytics = useLinkAnalytics(linkId);
  const [clickTab, setClickTab] = useState<ClickTab>("device");
  const [viewTab, setViewTab] = useState<ViewTab>("week");

  if (!Number.isInteger(linkId) || linkId <= 0) {
    return (
      <main className="p-4 sm:p-6">
        <p className="text-token-sm text-error">شناسه لینک نامعتبر است.</p>
      </main>
    );
  }

  if (analytics.isPending) {
    return <AnalyticsSkeleton />;
  }

  if (analytics.isError || !analytics.data) {
    return (
      <main className="space-y-4 p-4 sm:p-6">
        <BackLink />
        <p className="text-token-sm text-error">{errorText(analytics.error)}</p>
      </main>
    );
  }

  const data = analytics.data;
  const clickBuckets =
    clickTab === "device" ? data.clicksByDevice : data.clicksByBrowser;
  const clickLabels = bucketSeries(
    clickBuckets,
    clickTab === "device" ? deviceLabel : browserLabel,
  );
  const weeklyTotal = data.weeklyViews.reduce((sum, point) => sum + point.count, 0);
  const monthlyTotal = data.monthlyViews.reduce(
    (sum, point) => sum + point.count,
    0,
  );
  const totalClicks = data.clicksByDevice.reduce(
    (sum, bucket) => sum + bucket.count,
    0,
  );
  const todayViews = data.weeklyViews.at(-1)?.count ?? 0;

  return (
    <main className="space-y-6 p-4 sm:space-y-8 sm:p-6">
      <div className="flex flex-col gap-3">
        <BackLink />
        <div>
          <h1 className="h2">{data.link.title}</h1>
          <p className="mt-1 text-token-sm text-muted-foreground" dir="ltr">
            {shortLinkUrl(data.link.shortCode).replace(/^https?:\/\//, "")}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="کل کلیک‌ها" value={formatCount(totalClicks)} />
        <StatCard title="بازدید امروز" value={formatCount(todayViews)} />
        <StatCard title="بازدید ۷ روز" value={formatCount(weeklyTotal)} />
        <StatCard title="بازدید ۱۲ ماه" value={formatCount(monthlyTotal)} />
      </div>

      <section className="surface rounded-token-xl p-5 shadow-token-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="h3">کلیک‌ها</h2>
            <p className="mt-1 text-token-sm text-muted-foreground">
              {clickTab === "device"
                ? "تعداد کلیک بر اساس دستگاه"
                : "تعداد کلیک بر اساس مرورگر"}
            </p>
          </div>
          <ChartTabs
            value={clickTab}
            onChange={setClickTab}
            tabs={[
              { id: "device", label: "دستگاه" },
              { id: "browser", label: "مرورگر" },
            ]}
          />
        </div>
        <div className="mt-4" dir="ltr">
          <DonutChart
            labels={clickLabels.labels}
            series={clickLabels.series}
            chartKey={clickTab}
          />
        </div>
      </section>

      <section className="surface rounded-token-xl p-5 shadow-token-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="h3">بازدید</h2>
            <p className="mt-1 text-token-sm text-muted-foreground">
              {viewTab === "week"
                ? "بازدید هفت روز گذشته"
                : "بازدید دوازده ماه گذشته"}
            </p>
          </div>
          <ChartTabs
            value={viewTab}
            onChange={setViewTab}
            tabs={[
              { id: "week", label: "هفتگی" },
              { id: "month", label: "ماهانه" },
            ]}
          />
        </div>
        <div className="mt-4" dir="ltr">
          <ColumnChart
            chartKey={viewTab}
            name="بازدید"
            categories={
              viewTab === "week"
                ? data.weeklyViews.map((point) => weeklyLabel(point.date))
                : data.monthlyViews.map((point) => point.label)
            }
            series={
              viewTab === "week"
                ? data.weeklyViews.map((point) => point.count)
                : data.monthlyViews.map((point) => point.count)
            }
          />
        </div>
      </section>

      <section className="surface rounded-token-xl p-5 shadow-token-sm">
        <h2 className="h3">کلیک بر اساس کشور</h2>
        <p className="mt-1 text-token-sm text-muted-foreground">
          هر ستون یک کشور از داده‌های بازدید است
        </p>
        <div className="mt-4 overflow-x-auto" dir="ltr">
          <CountryChart buckets={data.clicksByCountry} />
        </div>
      </section>
    </main>
  );
}

function DonutChart({
  labels,
  series,
  chartKey,
}: {
  labels: string[];
  series: number[];
  chartKey: string;
}) {
  const options = useChartTheme();
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      ...options,
      labels,
      colors: CHART_COLORS,
      legend: {
        position: "bottom",
        fontFamily: "inherit",
        labels: { colors: options.chart?.foreColor },
      },
      dataLabels: { enabled: false },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          donut: {
            size: "68%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "کلیک",
                color: options.chart?.foreColor,
                formatter: (value) => {
                  const totals = value.globals.seriesTotals as number[];
                  const sum = totals.reduce((total, item) => total + item, 0);
                  return formatCount(sum);
                },
              },
              value: {
                color: options.chart?.foreColor,
                formatter: (value) => formatCount(Number(value)),
              },
            },
          },
        },
      },
    }),
    [labels, options],
  );

  if (series.length === 0 || series.every((count) => count === 0)) {
    return <EmptyChart text="هنوز کلیکی ثبت نشده" />;
  }

  return (
    <Chart
      key={chartKey}
      type="donut"
      height={320}
      series={series}
      options={chartOptions}
    />
  );
}

function ColumnChart({
  categories,
  series,
  name,
  chartKey,
  minColumnWidth = 72,
}: {
  categories: string[];
  series: number[];
  name: string;
  chartKey: string;
  minColumnWidth?: number;
}) {
  const options = useChartTheme();
  const chartOptions = useMemo<ApexOptions>(
    () => ({
      ...options,
      colors: [CHART_COLORS[0]],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: categories.length > 8 ? "60%" : "46%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories,
        labels: {
          rotate: categories.length > 6 ? -40 : 0,
          rotateAlways: categories.length > 6,
          style: {
            colors: options.chart?.foreColor,
            fontFamily: "inherit",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (value) => formatCount(value),
          style: {
            colors: options.chart?.foreColor,
            fontFamily: "inherit",
          },
        },
      },
      grid: {
        borderColor: options.grid?.borderColor,
        strokeDashArray: 4,
      },
    }),
    [categories, options],
  );

  return (
    <div style={{ minWidth: Math.max(280, categories.length * minColumnWidth) }}>
      <Chart
        key={chartKey}
        type="bar"
        height={320}
        series={[{ name, data: series }]}
        options={chartOptions}
      />
    </div>
  );
}

function CountryChart({ buckets }: { buckets: AnalyticsBucket[] }) {
  const labeled = bucketSeries(buckets, countryLabel);
  if (labeled.series.length === 0) {
    return <EmptyChart text="هنوز کلیکی بر اساس کشور ثبت نشده" />;
  }

  return (
    <ColumnChart
      chartKey="country"
      name="کلیک"
      categories={labeled.labels}
      series={labeled.series}
      minColumnWidth={88}
    />
  );
}

function useChartTheme(): ApexOptions {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const fore = isDark ? "#ededed" : "#111111";
  const grid = isDark ? "#262626" : "#eaeaea";

  return useMemo(
    () => ({
      chart: {
        fontFamily: "inherit",
        foreColor: fore,
        background: "transparent",
        toolbar: { show: false },
      },
      grid: { borderColor: grid },
      tooltip: { theme: isDark ? "dark" : "light" },
    }),
    [fore, grid, isDark],
  );
}

function ChartTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="flex w-full gap-1 rounded-token-lg bg-muted/70 p-1 sm:w-auto">
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`min-h-11 flex-1 rounded-token-md px-4 text-token-sm font-token-medium transition-colors sm:flex-none ${
              selected
                ? "bg-card text-foreground shadow-token-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={selected}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="surface rounded-token-xl p-5 shadow-token-sm">
      <p className="label">{title}</p>
      <p className="mt-3 text-token-2xl font-token-semibold tracking-tight">
        {value}
      </p>
    </div>
  );
}

function EmptyChart({ text }: { text: string }) {
  return (
    <div className="flex h-72 items-center justify-center text-token-sm text-muted-foreground">
      {text}
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/dashboard/links"
      className="inline-flex min-h-11 items-center text-token-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      بازگشت به لینک‌ها
    </Link>
  );
}

function AnalyticsSkeleton() {
  return (
    <main className="space-y-6 p-4 sm:p-6">
      <div className="h-8 w-48 animate-pulse rounded-token-md bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-token-xl bg-muted"
          />
        ))}
      </div>
      <div className="h-96 animate-pulse rounded-token-xl bg-muted" />
      <div className="h-96 animate-pulse rounded-token-xl bg-muted" />
    </main>
  );
}

function errorText(error: unknown): string {
  const status = (error as { response?: { status?: number } })?.response
    ?.status;
  if (status === 404) return "این لینک پیدا نشد.";
  if (status === 403) return "به آمار این لینک دسترسی ندارید.";
  if (status === 401) return "برای دیدن آمار باید وارد شوید.";
  return "آمار لینک بارگذاری نشد.";
}
