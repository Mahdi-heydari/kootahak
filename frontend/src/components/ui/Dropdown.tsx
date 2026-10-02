"use client";

import { useEffect, useRef, useState } from "react";
import GetIcon, { type IconName } from "@/components/ui/Icon";

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  icon?: IconName;
  isActive?: boolean;
  disabled?: boolean;
}

export default function Dropdown<T extends string>({
  value,
  onChange,
  options,
  icon,
  isActive = false,
  disabled = false,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className={`inline-flex h-11 w-full items-center justify-between gap-2 rounded-token-md border px-3 text-token-xs font-token-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          isActive
            ? "border-brand/40 bg-brand/5 text-brand"
            : "border-border bg-background-secondary text-foreground hover:bg-muted"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon && <GetIcon name={icon} className="size-4 shrink-0" />}
          <span className="truncate">{current?.label ?? "انتخاب کنید"}</span>
        </span>
        <GetIcon
          name="ChevronDown"
          className={`size-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-token-lg border border-border bg-background p-1 shadow-token-md"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-token-md px-3 py-2 text-token-sm text-right transition-colors ${
                  selected
                    ? "bg-brand/10 font-token-medium text-brand"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{option.label}</span>
                {selected && (
                  <GetIcon name="Check" className="size-4 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
