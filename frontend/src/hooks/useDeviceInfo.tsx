import { useState } from "react";
import type { GradientWavesProps } from "@/types";

export type PerformanceTier = NonNullable<GradientWavesProps["detail"]>;

export interface DeviceProfile {
  tier: PerformanceTier;
  isMobile: boolean;
  isTouch: boolean;
  cores: number;
  memory: number | null;
  dpr: number;
  gpuRenderer: string | null;
  prefersReducedMotion: boolean;
  saveData: boolean;
}

const DEFAULT_PROFILE: DeviceProfile = {
  tier: "low",
  isMobile: false,
  isTouch: false,
  cores: 4,
  memory: null,
  dpr: 1,
  gpuRenderer: null,
  prefersReducedMotion: false,
  saveData: false,
};

const detectGpuRenderer = (): string | null => {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return null;
    return (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string) ?? null;
  } catch {
    return null;
  }
};

const scoreTier = (profile: Omit<DeviceProfile, "tier">): PerformanceTier => {
  if (profile.prefersReducedMotion || profile.saveData) return "ultra-low";

  let score = 0;

  if (profile.cores >= 8) score += 2;
  else if (profile.cores >= 4) score += 1;
  else if (profile.cores <= 2) score -= 2;
  else score -= 1;

  if (profile.memory !== null) {
    if (profile.memory >= 8) score += 2;
    else if (profile.memory >= 4) score += 1;
    else if (profile.memory <= 2) score -= 2;
    else score -= 1;
  } else {
    score += 1; // نامشخصه (اکثر مرورگرها deviceMemory رو نمی‌دن)، خوش‌بینانه متوسط فرض می‌کنیم
  }

  const gpu = profile.gpuRenderer?.toLowerCase() ?? "";
  const weakGpuHints = [
    "adreno 3",
    "adreno 4",
    "adreno 5",
    "mali-4",
    "mali-t",
    "powervr",
    "intel(r) hd graphics",
    "swiftshader",
  ];
  const strongGpuHints = [
    "apple m",
    "rtx",
    "radeon rx",
    "adreno 7",
    "adreno 6",
    "geforce",
  ];
  if (strongGpuHints.some((h) => gpu.includes(h))) score += 2;
  else if (weakGpuHints.some((h) => gpu.includes(h))) score -= 2;

  if (profile.isMobile) score -= 1;
  if (profile.dpr >= 3) score -= 1; // صفحه‌ی خیلی high-dpr یعنی pixel fill-rate بیشتر برای شیدر

  if (score >= 4) return "high";
  if (score >= 1) return "medium";
  if (score >= -2) return "low";
  return "ultra-low";
};

const computeProfile = (): DeviceProfile => {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = nav.deviceMemory ?? null;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const gpuRenderer = detectGpuRenderer();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveData = Boolean(nav.connection?.saveData);

  const base = {
    isMobile,
    isTouch,
    cores,
    memory,
    dpr,
    gpuRenderer,
    prefersReducedMotion,
    saveData,
  };

  return { ...base, tier: scoreTier(base) };
};

export const useDeviceInfo = (): DeviceProfile => {
  const [profile] = useState<DeviceProfile>(computeProfile);
  return profile;
};

export const gradientWavesPresets: Record<
  PerformanceTier,
  Partial<GradientWavesProps>
> = {
  "ultra-low": {
    detail: "ultra-low",
    grain: false,
    mouseInteraction: false,
    parallaxStrength: 0,
  },
  low: {
    detail: "low",
    grain: false,
    mouseInteraction: false,
    parallaxStrength: 0,
  },
  medium: {
    detail: "medium",
    grain: false,
    mouseInteraction: true,
  },
  high: {
    detail: "high",
    grain: true,
    mouseInteraction: true,
  },
};
