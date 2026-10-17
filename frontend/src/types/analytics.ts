export interface AnalyticsBucket {
  key: string;
  count: number;
}

export interface WeeklyViewPoint {
  date: string;
  count: number;
}

export interface MonthlyViewPoint {
  month: string;
  label: string;
  count: number;
}

export interface LinkAnalyticsLink {
  id: number;
  title: string;
  shortCode: string;
  originalUrl: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string | null;
}

export interface LinkAnalytics {
  link: LinkAnalyticsLink;
  clicksByDevice: AnalyticsBucket[];
  clicksByBrowser: AnalyticsBucket[];
  weeklyViews: WeeklyViewPoint[];
  monthlyViews: MonthlyViewPoint[];
  clicksByCountry: AnalyticsBucket[];
}
