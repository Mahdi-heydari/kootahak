"use client";

import { useEffect, useState } from "react";
import DeveloperSocials from "@/components/developers/DeveloperSocials";
import type { Developer } from "@/types";

const DeveloperPeek = ({
  developer,
}: {
  developer: Developer;
}): React.JSX.Element => {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (!pinned) return;

    const close = (event: PointerEvent): void => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const root = document.getElementById(`developer-peek-${developer.id}`);
      if (root && !root.contains(target)) setPinned(false);
    };

    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [pinned, developer.id]);

  const handleToggle = (): void => {
    setPinned((open) => !open);
  };

  return (
    <div
      id={`developer-peek-${developer.id}`}
      className="group/dev relative"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={pinned}
        aria-label={`اطلاعات ${developer.name}`}
        className="block size-12 overflow-hidden rounded-full border border-border bg-muted transition-all duration-token-normal group-hover/dev:border-brand group-focus-within/dev:border-brand"
      >
        <img
          src={developer.avatar}
          alt=""
          width={48}
          height={48}
          className="size-full object-cover"
        />
      </button>

      <div
        className={[
          "absolute bottom-full right-0 z-40 w-[min(18rem,calc(100vw-2rem))] pb-3",
          "transition-all duration-token-normal ease-token-default",
          "md:right-auto md:left-1/2 md:-translate-x-1/2",
          pinned
            ? "visible translate-y-0 opacity-100 pointer-events-auto"
            : [
                "invisible translate-y-1 opacity-0 pointer-events-none",
                "group-hover/dev:visible group-hover/dev:translate-y-0 group-hover/dev:opacity-100 group-hover/dev:pointer-events-auto",
                "group-focus-within/dev:visible group-focus-within/dev:translate-y-0 group-focus-within/dev:opacity-100 group-focus-within/dev:pointer-events-auto",
              ].join(" "),
        ].join(" ")}
      >
        <div className="relative rounded-token-lg border border-border bg-card p-4 shadow-token-md">
          <div className="mb-3 flex items-center gap-x-3">
            <img
              src={developer.avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full border border-border object-cover bg-muted"
            />
            <div className="min-w-0 text-right">
              <p className="font-token-semibold text-token-sm text-foreground">
                {developer.name}
              </p>
              <p className="mt-0.5 text-token-xs text-muted-foreground">
                {developer.role}
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-3">
            <DeveloperSocials socials={developer.socials} />
          </div>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 right-4 size-2.5 rotate-45 border-r border-b border-border bg-card md:right-auto md:left-1/2 md:-translate-x-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperPeek;
