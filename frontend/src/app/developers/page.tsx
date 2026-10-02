import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Developers from "@/components/sections/Developers";

export const metadata: Metadata = {
  title: "توسعه‌دهندگان",
  description: "عرفان طلوع و مهدی حیدری، سازندگان کوتاهک",
};

export default function DevelopersPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <main className="bg-background pt-28 md:pt-32 pb-16 min-h-screen">
        <Developers />
      </main>
      <Footer />
    </>
  );
}
