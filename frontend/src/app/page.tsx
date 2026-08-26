import Header from "./components/sections/Header";
export default function Home() {
  return (
    <>
      <Header />
      <main className="h-200 bg-background-secondary text-7xl grid place-items-center">
        Main
      </main>
      <footer className="h-200 bg-background text-7xl grid place-items-center">
        Fotter
      </footer>
    </>
  );
}
