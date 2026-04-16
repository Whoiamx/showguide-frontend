import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  real,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const defaultSubtitleStyle = {
  fontFamily: "Inter",
  fontSize: 24,
  textColor: "#ffffff",
  backgroundColor: "#000000",
  backgroundOpacity: 0.75,
  showBackground: true,
  animation: "none" as "none" | "fade" | "slide" | "typewriter",
};

export type SubtitleStyle = typeof defaultSubtitleStyle;

export interface Marker {
  id: string;
  time: number;
  shape: "circle" | "square";
  color: string;
  label?: string;
}

export const defaultVideoEdits = {
  trimStart: null,
  trimEnd: null,
  deletedSections: [],
} satisfies VideoEdits;

export interface VideoEdits {
  trimStart: number | null;
  trimEnd: number | null;
  deletedSections: { start: number; end: number }[];
}

export interface SubtitleWord {
  word: string;
  startTime: number;
  endTime: number;
  index: number;
}

export interface SubtitleAnimation {
  type: "none" | "fade" | "slide" | "typewriter";
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export interface AnnotationData {
  [key: string]: unknown;
}

export interface AnalysisResult {
  [key: string]: unknown;
}

export interface JobMetadata {
  [key: string]: unknown;
}

export const planCodes = ["trial", "plus", "teams", "pro"] as const;
export type PlanCode = (typeof planCodes)[number];

export const billingCycles = ["monthly", "annual"] as const;
export type BillingCycle = (typeof billingCycles)[number];

export const subscriptionStatuses = [
  "trialing",
  "active",
  "past_due",
  "canceled",
] as const;
export type SubscriptionStatus = (typeof subscriptionStatuses)[number];

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email").notNull(),
  name: varchar("name", { length: 255 }),
  plan: varchar("plan", { length: 30 }).notNull().default("trial"),
  billingCycle: varchar("billing_cycle", { length: 20 })
    .notNull()
    .default("monthly"),
  subscriptionStatus: varchar("subscription_status", { length: 20 })
    .notNull()
    .default("trialing"),
  creditsRemaining: integer("credits_remaining").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  title: varchar("title", { length: 500 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("draft"),
  template: varchar("template", { length: 50 }),
  language: varchar("language", { length: 10 }).default("en"),
  voiceEnabled: boolean("voice_enabled").notNull().default(false),
  voiceId: varchar("voice_id", { length: 255 }),
  subtitleStyle: jsonb("subtitle_style")
    .$type<SubtitleStyle>()
    .default(defaultSubtitleStyle),
  markers: jsonb("markers").$type<Marker[]>().default([]),
  videoEdits: jsonb("video_edits")
    .$type<VideoEdits>()
    .default(defaultVideoEdits),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" })
    .unique(),
  storageKey: text("storage_key"),
  fileName: varchar("file_name", { length: 500 }),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size"),
  mimeType: varchar("mime_type", { length: 100 }),
  duration: real("duration"),
  width: integer("width"),
  height: integer("height"),
  fps: real("fps"),
  source: varchar("source", { length: 50 }).default("upload"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videoTrims = pgTable("video_trims", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subtitleTracks = pgTable("subtitle_tracks", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  language: varchar("language", { length: 10 }).notNull().default("en"),
  version: integer("version").notNull().default(1),
  defaultStyle: jsonb("default_style")
    .$type<SubtitleStyle>()
    .default(defaultSubtitleStyle),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subtitles = pgTable("subtitles", {
  id: uuid("id").primaryKey().defaultRandom(),
  trackId: uuid("track_id").references(() => subtitleTracks.id, {
    onDelete: "cascade",
  }),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  index: integer("index").notNull(),
  startTime: real("start_time").notNull(),
  endTime: real("end_time").notNull(),
  text: text("text").notNull(),
  words: jsonb("words").$type<SubtitleWord[]>().default([]),
  styleOverride: jsonb("style_override").$type<Partial<SubtitleStyle>>(),
  animation: jsonb("animation").$type<SubtitleAnimation>(),
  source: varchar("source", { length: 50 }).default("ai_generated"),
  confidence: real("confidence"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const annotations = pgTable("annotations", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(),
  time: real("time").notNull(),
  duration: real("duration"),
  data: jsonb("data").$type<AnnotationData>().notNull().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analysisSegments = pgTable("analysis_segments", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  segmentIndex: integer("segment_index").notNull(),
  provider: varchar("provider", { length: 50 }),
  model: varchar("model", { length: 100 }),
  analysisResult: jsonb("analysis_result")
    .$type<AnalysisResult>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const voiceSegments = pgTable("voice_segments", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  subtitleId: uuid("subtitle_id").references(() => subtitles.id, {
    onDelete: "set null",
  }),
  voiceId: varchar("voice_id", { length: 255 }),
  storageKey: text("storage_key"),
  duration: real("duration"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const voiceTracks = pgTable("voice_tracks", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  voiceId: varchar("voice_id", { length: 255 }),
  storageKey: text("storage_key"),
  duration: real("duration"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const exportsTable = pgTable("exports", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  quality: varchar("quality", { length: 20 }).notNull(),
  format: varchar("format", { length: 20 }).notNull().default("mp4"),
  includeVoice: boolean("include_voice").notNull().default(false),
  storageKey: text("storage_key"),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  queueName: varchar("queue_name", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  progress: integer("progress").notNull().default(0),
  metadata: jsonb("metadata").$type<JobMetadata>().notNull().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const promptTemplates = pgTable("prompt_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 150 }).notNull(),
  phase: varchar("phase", { length: 50 }).notNull(),
  version: integer("version").notNull().default(1),
  content: text("content").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type VideoTrim = typeof videoTrims.$inferSelect;
export type NewVideoTrim = typeof videoTrims.$inferInsert;
export type SubtitleTrack = typeof subtitleTracks.$inferSelect;
export type NewSubtitleTrack = typeof subtitleTracks.$inferInsert;
export type Subtitle = typeof subtitles.$inferSelect;
export type NewSubtitle = typeof subtitles.$inferInsert;
export type Annotation = typeof annotations.$inferSelect;
export type NewAnnotation = typeof annotations.$inferInsert;
export type AnalysisSegment = typeof analysisSegments.$inferSelect;
export type NewAnalysisSegment = typeof analysisSegments.$inferInsert;
export type VoiceSegment = typeof voiceSegments.$inferSelect;
export type NewVoiceSegment = typeof voiceSegments.$inferInsert;
export type VoiceTrack = typeof voiceTracks.$inferSelect;
export type NewVoiceTrack = typeof voiceTracks.$inferInsert;
export type Export = typeof exportsTable.$inferSelect;
export type NewExport = typeof exportsTable.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type PromptTemplate = typeof promptTemplates.$inferSelect;
export type NewPromptTemplate = typeof promptTemplates.$inferInsert;
