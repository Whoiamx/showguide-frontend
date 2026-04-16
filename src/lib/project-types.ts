export type SubtitleAnimationType = "none" | "fade" | "slide" | "typewriter";

export interface SubtitleStyle {
  fontFamily: string;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  showBackground: boolean;
  animation: SubtitleAnimationType;
}

export const defaultSubtitleStyle: SubtitleStyle = {
  fontFamily: "Inter",
  fontSize: 24,
  textColor: "#ffffff",
  backgroundColor: "#000000",
  backgroundOpacity: 0.75,
  showBackground: true,
  animation: "none",
};

export interface Marker {
  id: string;
  time: number;
  shape: "circle" | "square";
  color: string;
  label?: string;
}

export interface VideoEdits {
  trimStart: number | null;
  trimEnd: number | null;
  deletedSections: { start: number; end: number }[];
}

export const defaultVideoEdits: VideoEdits = {
  trimStart: null,
  trimEnd: null,
  deletedSections: [],
};

export const planCodes = ["trial", "plus", "teams", "pro"] as const;
export type PlanCode = (typeof planCodes)[number];
