import { Renderer, Program, Mesh } from "ogl";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export interface ProfileProps {
  user: {
    name: string;
    phone: string;
    avatar?: string;
  };
}

export interface UserInfo {
  name: string;
  phone: string;
}

// GradientWaves
export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  detail?: "low" | "medium" | "high";
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  className?: string;
}
export interface Uniforms {
  iTime: { value: number };
  iResolution: { value: Float32Array };
  uSpeed: { value: number };
  uAmplitude: { value: number };
  uWaveScale: { value: number };
  uWaveRatio: { value: number };
  uSwell: { value: number };
  uTurbulence: { value: number };
  uTilt: { value: number };
  uZoom: { value: number };
  uHeight: { value: number };
  uFogDepth: { value: number };
  uSteps: { value: number };
  uBrightness: { value: number };
  uOpacity: { value: number };
  uGrain: { value: number };
  uGrainIntensity: { value: number };
  uMouse: { value: Float32Array };
  uParallax: { value: number };
  uEnableMouse: { value: boolean };
  uHorizonColor: { value: Float32Array };
  uWaveColor: { value: Float32Array };
  uCrestColor: { value: Float32Array };
}

export interface Context {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
}
