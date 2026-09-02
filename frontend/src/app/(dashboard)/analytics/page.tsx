export default function AnalyticsPage() {
    return (
      <main className="space-y-8 p-6">
        <div>
          <h1 className="text-2xl font-bold">آمار</h1>
  
          <p className="mt-1 text-sm text-muted-foreground">
            عملکرد لینک‌های خود را بررسی کنید
          </p>
        </div>
  
        {/* Overview */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="کل لینک‌ها"
            value="24"
          />
  
          <AnalyticsCard
            title="کل بازدیدها"
            value="12,480"
          />
  
          <AnalyticsCard
            title="لینک‌های فعال"
            value="21"
          />
  
          <AnalyticsCard
            title="بازدید امروز"
            value="342"
          />
        </div>
  
        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="min-h-[320px] rounded-2xl border bg-background p-5 lg:col-span-2">
            <h2 className="font-semibold">بازدیدها</h2>
  
            <p className="mt-1 text-sm text-muted-foreground">
              تعداد بازدید لینک‌ها در طول زمان
            </p>
  
            <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
              Chart — بعداً با ApexCharts
            </div>
          </div>
  
          <div className="min-h-[320px] rounded-2xl border bg-background p-5">
            <h2 className="font-semibold">منابع بازدید</h2>
  
            <p className="mt-1 text-sm text-muted-foreground">
              کاربران از چه مسیری وارد شده‌اند
            </p>
  
            <div className="flex h-60 items-center justify-center text-sm text-muted-foreground">
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
      <div className="rounded-2xl border bg-background p-5">
        <p className="text-sm text-muted-foreground">{title}</p>
  
        <p className="mt-3 text-2xl font-bold">{value}</p>
      </div>
    );
  }