import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Terms from "@/components/sections/Terms";

export const metadata: Metadata = {
  title: "قوانین و شرایط",
  description: "قوانین و شرایط استفاده از سرویس کوتاه‌کننده لینک کوتاهک",
};

export default function TermsPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <main className="bg-background pt-28 md:pt-32 pb-16 min-h-screen">
        <Terms />
      </main>
      <Footer />
    </>
  );
}
