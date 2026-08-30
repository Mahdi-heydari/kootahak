import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

import "./globals.css";

const iranyekanX = localFont({
  src: "../../public/fonts/IRANYekanXVFaNumVF.DBKnep-K.woff2",
  variable: "--font-iranyekan-x",
  display: "swap",
  weight: "100 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "کوتاهک",
    template: "%s | کوتاهک",
  },
  description: "سرویس کوتاه‌کننده لینک کوتاهک",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${iranyekanX.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
