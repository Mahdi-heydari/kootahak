"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import DatePicker, { type DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "@/styles/jalali-picker.css";

const inputClassName =
  "h-12 w-full rounded-token-md border border-border bg-card px-4 text-token-sm text-foreground shadow-token-sm transition-colors duration-token-normal placeholder:text-muted-foreground focus:border-brand/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

interface JalaliDateTimePickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}

function toPickerDate(value: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function toDatetimeLocal(date: Date): string {
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function JalaliDateTimePicker({
  id,
  value,
  onChange,
  disabled = false,
  invalid = false,
}: JalaliDateTimePickerProps) {
  const { resolvedTheme } = useTheme();
  const plugins = useMemo(
    () => [<TimePicker key="time" hideSeconds position="bottom" />],
    [],
  );

  return (
    <div
      className="jalali-picker w-full"
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <DatePicker
        id={id}
        value={toPickerDate(value)}
        onChange={(date: DateObject | null) => {
          if (!date) {
            onChange("");
            return;
          }
          onChange(toDatetimeLocal(date.toDate()));
        }}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD HH:mm"
        plugins={plugins}
        calendarPosition="top-right"
        disabled={disabled}
        containerClassName="w-full"
        inputClass={`${inputClassName}${invalid ? " border-error" : ""}`}
        className={resolvedTheme === "dark" ? "bg-dark" : undefined}
        placeholder="انتخاب تاریخ شمسی"
      />
    </div>
  );
}
