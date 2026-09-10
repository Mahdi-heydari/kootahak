import React from "react";
import Problems from "./Problems";
import Solution from "./Solution";
import FAQ from "./FAQ";
import Hero from "./Hero";

export const Main = (): React.JSX.Element => {
  return (
    <main className="bg-background text-7xl grid place-items-center">
      <div className="container">
        <Hero />
        <Problems></Problems>
        <Solution></Solution>
        <FAQ></FAQ>
      </div>
    </main>
  );
};
