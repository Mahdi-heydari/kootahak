export default function AnalyticsPage() {
  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="h2">آمار</h1>

        <p className="mt-1 text-token-sm text-muted-foreground">
          عملکرد لینک‌های خود را بررسی کنید
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard title="کل لینک‌ها" value="24" />

        <AnalyticsCard title="کل بازدیدها" value="12,480" />

        <AnalyticsCard title="لینک‌های فعال" value="21" />

        <AnalyticsCard title="بازدید امروز" value="342" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface min-h-80 rounded-token-xl p-5 shadow-token-sm lg:col-span-2">
          <h2 className="h3">بازدیدها</h2>

          <p className="mt-1 text-token-sm text-muted-foreground">
            تعداد بازدید لینک‌ها در طول زمان
          </p>

          <div className="flex h-60 items-center justify-center text-token-sm text-muted-foreground">
            Chart — بعداً با ApexCharts
          </div>
        </div>

        <div className="surface min-h-80 rounded-token-xl p-5 shadow-token-sm">
          <h2 className="h3">منابع بازدید</h2>

          <p className="mt-1 text-token-sm text-muted-foreground">
            کاربران از چه مسیری وارد شده‌اند
          </p>

          <div className="flex h-60 items-center justify-center text-token-sm text-muted-foreground">
            Chart — بعداً
          </div>
        </div>
      </div>
    </main>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: string;
}

function AnalyticsCard({ title, value }: AnalyticsCardProps) {
  return (
    <div className="surface rounded-token-xl p-5 shadow-token-sm">
      <p className="label">{title}</p>

      <p className="metric mt-3">{value}</p>
    </div>
  );
}
