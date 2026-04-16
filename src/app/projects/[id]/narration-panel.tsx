"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { getApiUrl } from "@/lib/api";
import { type SubtitleWord, type VoiceStatus } from "@/lib/project-types";
import { useToast } from "@/lib/toast-context";

interface Subtitle {
  id: string;
  index: number;
  startTime: number;
  endTime: number;
  text: string;
  words?: SubtitleWord[];
}

interface VoiceSnapshot {
  voiceEnabled: boolean;
  voiceId: string | null;
  voiceStatus: VoiceStatus | string | null;
  voiceError: string | null;
  voiceAudioUrl: string | null;
  voiceGeneratedAt: string | null;
}

type VoiceStateChange = Partial<VoiceSnapshot> & {
  subtitles?: Subtitle[];
};

interface NarrationPanelProps extends VoiceSnapshot {
  projectId: string;
  subtitles: Subtitle[];
  isMuted: boolean;
  t: Record<string, string>;
  onVoiceStateChange: (changes: VoiceStateChange) => void;
}

const POLL_INTERVAL_MS = 3000;
const AUTO_GENERATION_DELAY_MS = 1200;

function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function getStatusTone(status: string | null | undefined) {
  if (status === "completed") {
    return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
  }

  if (status === "processing") {
    return "bg-amber-500/15 text-amber-300 border border-amber-500/20";
  }

  if (status === "failed") {
    return "bg-red-500/15 text-red-300 border border-red-500/20";
  }

  if (status === "stale") {
    return "bg-orange-500/15 text-orange-300 border border-orange-500/20";
  }

  return "bg-surface-800 text-surface-300 border border-surface-700";
}

function getStatusLabel(status: string | null | undefined, t: Record<string, string>) {
  if (status === "completed") return t.narrationStatusCompleted;
  if (status === "processing") return t.narrationStatusProcessing;
  if (status === "failed") return t.narrationStatusFailed;
  if (status === "stale") return t.narrationStatusStale;
  return t.narrationStatusIdle;
}

function findActiveNarrationPosition(subtitles: Subtitle[], currentTime: number) {
  for (const subtitle of subtitles) {
    const words = subtitle.words ?? [];
    if (words.length === 0) {
      continue;
    }

    const subtitleStart = words[0].startTime;
    const subtitleEnd = words[words.length - 1].endTime;
    if (currentTime < subtitleStart || currentTime > subtitleEnd) {
      continue;
    }

    const activeWord = words.findIndex(
      (word) => currentTime >= word.startTime && currentTime <= word.endTime,
    );

    return {
      subtitleId: subtitle.id,
      wordIndex: activeWord >= 0 ? activeWord : null,
    };
  }

  return {
    subtitleId: null,
    wordIndex: null,
  };
}

function renderSubtitleWords(
  subtitle: Subtitle,
  activeWordIndex: number | null,
  isSubtitleActive: boolean,
) {
  const words = subtitle.words ?? [];
  if (words.length === 0) {
    return (
      <span className={isSubtitleActive ? "text-surface-100" : "text-surface-300"}>
        {subtitle.text}
      </span>
    );
  }

  return words
    .map((word, index) => {
      const isWordActive = isSubtitleActive && activeWordIndex === index;
      return (
        <span
          key={`${subtitle.id}-${index}-${word.startTime}`}
          className={`inline-block rounded px-1 py-0.5 transition-colors ${
            isWordActive
              ? "bg-brand-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              : isSubtitleActive
                ? "text-surface-100"
                : "text-surface-300"
          }`}
        >
          {word.word}
        </span>
      );
    })
    .reduce<ReactNode[]>((acc, node, index, array) => {
      acc.push(node);
      if (index < array.length - 1) {
        acc.push(
          <span key={`${subtitle.id}-space-${index}`} className="inline-block">
            {" "}
          </span>,
        );
      }
      return acc;
    }, []);
}

async function readApiErrorDetails(
  response: Response,
  fallbackMessage: string,
) {
  try {
    const raw = (await response.text()).trim();
    if (!raw) {
      return {
        code: null,
        message: fallbackMessage,
      };
    }

    try {
      const data = JSON.parse(raw) as {
        code?: unknown;
        error?: unknown;
        message?: unknown;
      };

      return {
        code: typeof data.code === "string" ? data.code : null,
        message:
          typeof data.error === "string" && data.error.trim()
            ? data.error
            : typeof data.message === "string" && data.message.trim()
              ? data.message
              : raw,
      };
    } catch {
      return {
        code: null,
        message: raw,
      };
    }
  } catch {
    return {
      code: null,
      message: fallbackMessage,
    };
  }
}

export default function NarrationPanel({
  projectId,
  voiceEnabled,
  voiceId,
  voiceStatus,
  voiceError,
  voiceAudioUrl,
  voiceGeneratedAt,
  subtitles,
  isMuted,
  t,
  onVoiceStateChange,
}: NarrationPanelProps) {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const onVoiceStateChangeRef = useRef(onVoiceStateChange);
  const autoGenerationKeyRef = useRef<string | null>(null);

  const [requestingGeneration, setRequestingGeneration] = useState(false);
  const [isPolling, setIsPolling] = useState(voiceStatus === "processing");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerError, setPlayerError] = useState("");

  useEffect(() => {
    onVoiceStateChangeRef.current = onVoiceStateChange;
  }, [onVoiceStateChange]);

  useEffect(() => {
    setIsPolling(voiceStatus === "processing");
  }, [voiceStatus]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (voiceStatus !== "completed" && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [voiceStatus]);

  const canGenerate = voiceEnabled && !!voiceId && subtitles.length > 0;
  const autoGenerationKey = canGenerate
    ? `${voiceStatus ?? "idle"}::${subtitles
        .map((subtitle) =>
          [
            subtitle.id,
            subtitle.text,
            subtitle.words?.length ?? 0,
            subtitle.index,
          ].join(":"),
        )
        .join("|")}`
    : null;

  useEffect(() => {
    if (!canGenerate || !autoGenerationKey || requestingGeneration) {
      return;
    }

    if (
      voiceStatus !== "idle" &&
      voiceStatus !== "stale" &&
      voiceStatus !== "failed"
    ) {
      return;
    }

    if (autoGenerationKeyRef.current === autoGenerationKey) {
      return;
    }

    autoGenerationKeyRef.current = autoGenerationKey;

    const timeoutId = setTimeout(() => {
      void requestGeneration();
    }, voiceStatus === "stale" ? AUTO_GENERATION_DELAY_MS : 0);

    return () => clearTimeout(timeoutId);
  }, [autoGenerationKey, canGenerate, requestingGeneration, voiceStatus]);

  useEffect(() => {
    if (!isPolling) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const response = await fetch(
          getApiUrl(`/api/projects/${projectId}/voice-status`),
          { cache: "no-store" },
        );
        if (!response.ok) {
          const error = await readApiErrorDetails(
            response,
            t.narrationStatusLoadFailed,
          );
          throw new Error(error.message);
        }

        const nextState = (await response.json()) as VoiceSnapshot;
        if (cancelled) {
          return;
        }

        if (nextState.voiceStatus === "processing") {
          onVoiceStateChangeRef.current(nextState);
          timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
          return;
        }

        setIsPolling(false);

        if (nextState.voiceStatus === "completed") {
          const projectResponse = await fetch(
            getApiUrl(`/api/projects/${projectId}`),
            { cache: "no-store" },
          );

          if (projectResponse.ok) {
            const projectSnapshot = (await projectResponse.json()) as
              | (VoiceSnapshot & { subtitles: Subtitle[] })
              | null;

            if (projectSnapshot) {
              onVoiceStateChangeRef.current({
                voiceEnabled: projectSnapshot.voiceEnabled,
                voiceId: projectSnapshot.voiceId,
                voiceStatus: projectSnapshot.voiceStatus,
                voiceError: projectSnapshot.voiceError,
                voiceAudioUrl: projectSnapshot.voiceAudioUrl,
                voiceGeneratedAt: projectSnapshot.voiceGeneratedAt,
                subtitles: projectSnapshot.subtitles,
              });
            }
          } else {
            onVoiceStateChangeRef.current(nextState);
          }
          return;
        }

        onVoiceStateChangeRef.current(nextState);

        if (nextState.voiceStatus === "failed") {
          toast(nextState.voiceError || t.narrationGenerationFailed, "error");
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        setIsPolling(false);
        onVoiceStateChangeRef.current({
          voiceStatus: "failed",
          voiceError:
            error instanceof Error
              ? error.message
              : t.narrationStatusLoadFailed,
        });
      }
    };

    void poll();

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    isPolling,
    projectId,
    t.narrationGenerationFailed,
    t.narrationStatusLoadFailed,
    toast,
  ]);

  const audioSrc =
    voiceStatus === "completed"
      ? getApiUrl(voiceAudioUrl ?? `/api/projects/${projectId}/voice-audio`)
      : null;
  const canPlay = voiceStatus === "completed" && !!audioSrc;
  const { subtitleId: activeSubtitleId, wordIndex: activeWordIndex } =
    findActiveNarrationPosition(subtitles, currentTime);

  useEffect(() => {
    if (!activeSubtitleId) {
      return;
    }

    const node = transcriptRefs.current[activeSubtitleId];
    if (node) {
      node.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeSubtitleId]);

  async function requestGeneration() {
    if (!canGenerate || requestingGeneration || voiceStatus === "processing") {
      return;
    }

    setRequestingGeneration(true);
    setPlayerError("");

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);

    try {
      const response = await fetch(
        getApiUrl(`/api/projects/${projectId}/generate-voice`),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            forceRegenerate:
              voiceStatus === "completed" || voiceStatus === "stale",
          }),
        },
      );

      if (!response.ok) {
        const error = await readApiErrorDetails(
          response,
          t.narrationGenerationFailed,
        );

        if (response.status === 409 && error.code === "in_progress") {
          onVoiceStateChangeRef.current({
            voiceStatus: "processing",
            voiceError: null,
          });
          setIsPolling(true);
          return;
        }

        if (response.status === 409 && error.code === "already_generated") {
          onVoiceStateChangeRef.current({
            voiceStatus: "completed",
            voiceError: null,
          });
          return;
        }

        throw new Error(error.message);
      }

      onVoiceStateChangeRef.current({
        voiceStatus: "processing",
        voiceError: null,
      });
      setIsPolling(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t.narrationGenerationFailed;
      onVoiceStateChangeRef.current({
        voiceStatus: "failed",
        voiceError: message,
      });
      toast(message, "error");
    } finally {
      setRequestingGeneration(false);
    }
  }

  async function togglePlayback() {
    if (!canPlay || !audioRef.current) {
      return;
    }

    setPlayerError("");

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } catch {
      setPlayerError(t.narrationPlaybackFailed);
    }
  }

  function handleSeek(nextTime: number) {
    if (!audioRef.current || !Number.isFinite(nextTime)) {
      return;
    }

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  const generatedLabel = voiceGeneratedAt
    ? `${t.narrationGeneratedAt} ${new Date(voiceGeneratedAt).toLocaleString()}`
    : null;

  return (
    <section className="rounded-2xl border border-surface-800 bg-surface-900/60 p-4">
      <audio
        ref={audioRef}
        src={audioSrc ?? undefined}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration || 0);
          setPlayerError("");
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onError={() => {
          setPlayerError(t.narrationPlaybackFailed);
          setIsPlaying(false);
        }}
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-surface-100">
              {t.narrationPanelTitle}
            </h2>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusTone(
                voiceStatus,
              )}`}
            >
              {getStatusLabel(voiceStatus, t)}
            </span>
            {canGenerate && (
              <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-1 text-[11px] font-medium text-brand-300">
                {t.narrationAutoMode || "Auto"}
              </span>
            )}
            {isMuted && (
              <span className="inline-flex items-center rounded-full border border-surface-700 bg-surface-800 px-2.5 py-1 text-[11px] font-medium text-surface-300">
                {t.narrationMutedBadge || "Muted"}
              </span>
            )}
          </div>
          <p className="text-sm text-surface-400">{t.narrationPanelDesc}</p>
          {generatedLabel && (
            <p className="text-xs text-surface-500">{generatedLabel}</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {!voiceEnabled || !voiceId ? (
          <div className="rounded-xl border border-dashed border-surface-700 px-4 py-3 text-sm text-surface-400">
            {t.narrationVoiceMissing}
          </div>
        ) : subtitles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-surface-700 px-4 py-3 text-sm text-surface-400">
            {t.narrationNeedsSubtitles}
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-surface-800 bg-surface-950/50 p-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayback}
                  disabled={!canPlay}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-800 text-surface-100 transition-colors hover:bg-surface-700 disabled:text-surface-500"
                  aria-label={isPlaying ? t.pauseNarration : t.playNarration}
                  title={isPlaying ? t.pauseNarration : t.playNarration}
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-surface-200">
                      {canPlay ? t.narrationReadyLabel : t.narrationPendingLabel}
                    </span>
                    <span className="text-xs font-mono text-surface-500">
                      {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step="0.01"
                    value={Math.min(currentTime, duration || 0)}
                    onChange={(event) => handleSeek(Number(event.target.value))}
                    disabled={!canPlay}
                    className="w-full accent-[var(--color-brand-500)] disabled:opacity-50"
                    aria-label={t.narrationSeek}
                  />
                </div>
              </div>

              {voiceStatus === "idle" && (
                <p className="mt-3 text-xs text-surface-400">
                  {t.narrationAutoPending ||
                    "Narration will be generated automatically for this project."}
                </p>
              )}
              {voiceStatus === "stale" && (
                <p className="mt-3 text-xs text-orange-300">
                  {t.narrationStaleHint}
                </p>
              )}
              {voiceStatus === "processing" && (
                <p className="mt-3 text-xs text-amber-300">
                  {t.narrationProcessingHint}
                </p>
              )}
              {voiceError && (
                <p className="mt-3 text-xs text-red-300">{voiceError}</p>
              )}
              {playerError && (
                <p className="mt-3 text-xs text-red-300">{playerError}</p>
              )}
            </div>

            <div className="rounded-xl border border-surface-800 bg-surface-950/40">
              <div className="flex items-center justify-between border-b border-surface-800 px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-surface-200">
                    {t.narrationTranscriptTitle}
                  </h3>
                  <p className="mt-0.5 text-xs text-surface-500">
                    {t.narrationTranscriptDesc}
                  </p>
                </div>
                <span className="rounded-full bg-surface-800 px-2.5 py-1 text-[11px] font-medium text-surface-400">
                  {subtitles.length} {t.segments}
                </span>
              </div>

              <div className="max-h-72 space-y-2 overflow-y-auto px-3 py-3">
                {subtitles.map((subtitle, subtitleIndex) => {
                  const isSubtitleActive = activeSubtitleId === subtitle.id;
                  return (
                    <div
                      key={subtitle.id}
                      ref={(node) => {
                        transcriptRefs.current[subtitle.id] = node;
                      }}
                      className={`rounded-xl border px-3 py-2.5 transition-colors ${
                        isSubtitleActive
                          ? "border-brand-500/40 bg-brand-500/10"
                          : "border-surface-800 bg-surface-900/50"
                      }`}
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded-full bg-surface-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-surface-500">
                          {subtitleIndex + 1}
                        </span>
                      </div>
                      <div className="text-sm leading-7 text-surface-300">
                        {renderSubtitleWords(
                          subtitle,
                          isSubtitleActive ? activeWordIndex : null,
                          isSubtitleActive,
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
