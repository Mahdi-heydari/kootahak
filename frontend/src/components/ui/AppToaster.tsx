"use client";

import { Toaster } from "sonner";
import GetIcon from "./Icon";

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      dir="rtl"
      gap={12}
      offset={16}
      visibleToasts={4}
      duration={4000}
      closeButton
      icons={{
        success: <GetIcon name="CircleCheck" className="size-5 text-success" />,
        error: <GetIcon name="X" className="size-5 text-error" />,
        warning: (
          <GetIcon name="ShieldQuestion" className="size-5 text-warning" />
        ),
        info: <GetIcon name="Sparkles" className="size-5 text-brand" />,
        loading: (
          <GetIcon
            name="Loader"
            className="size-5 animate-spin text-muted-foreground"
          />
        ),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "group flex w-full items-center gap-3 rounded-token-lg border border-border bg-card px-4 py-3 shadow-token-md",
          title: "text-token-sm font-token-medium text-foreground",
          description: "mt-0.5 text-token-xs text-muted-foreground",
          icon: "size-5 shrink-0 text-brand",
          closeButton:
            "absolute left-2 top-2 flex size-6 items-center justify-center rounded-token-sm bg-muted text-muted-foreground transition-colors hover:bg-border-hover hover:text-foreground",
          actionButton:
            "rounded-token-sm bg-primary px-3 py-1.5 text-token-xs font-token-medium text-primary-foreground hover:opacity-90",
          cancelButton:
            "rounded-token-sm bg-muted px-3 py-1.5 text-token-xs font-token-medium text-foreground hover:bg-border-hover",
          success: "[&_[data-icon]]:text-success",
          error: "[&_[data-icon]]:text-error",
          warning: "[&_[data-icon]]:text-warning",
          info: "[&_[data-icon]]:text-brand",
        },
      }}
    />
  );
}
