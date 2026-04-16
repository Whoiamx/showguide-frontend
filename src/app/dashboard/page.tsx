"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDuration, formatFileSize } from "@/lib/format";
import { useI18n } from "@/lib/i18n-context";
import { useConfirm } from "@/lib/confirm-dialog";

interface Project {
  id: string;
  title: string;
  status: string;
  template: string | null;
  createdAt: string;
  video: {
    id: string;
    fileName: string;
    fileSize: number;
    duration: number;
    width: number;
    height: number;
  } | null;
}

const statusStyles: Record<string, string> = {
  draft: "bg-surface-700 text-surface-300",
  uploaded: "bg-brand-500/15 text-brand-300 border border-brand-500/20",
  frames_extracted: "bg-sky-500/15 text-sky-300 border border-sky-500/20",
  analyzing: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
  ready: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20",
};

export default function Home() {
  const { t } = useI18n();
  const { confirm } = useConfirm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function deleteProject(id: string) {
    const ok = await confirm({
      title: t.deleteProject,
      message: t.deleteConfirm,
      confirmText: t.deleteProject,
      cancelText: t.cancel || "Cancel",
      danger: true,
    });
    if (!ok) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="animate-fade-in">
      {/* Hero — New Video Project */}
      <div className="text-center py-6 sm:py-8 lg:py-10 mb-5 sm:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 mb-4 sm:mb-5 shadow-lg shadow-brand-500/20">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="4" width="24" height="18" rx="3" stroke="white" strokeWidth="2.2" fill="none"/>
            <polygon points="13,8 13,18 21,13" fill="white"/>
            <rect x="6" y="25" width="5" height="2.2" rx="1" fill="#6ee7b7"/>
            <rect x="13" y="25" width="8" height="2.2" rx="1" fill="#6ee7b7"/>
            <rect x="23" y="25" width="4" height="2.2" rx="1" fill="#6ee7b7"/>
          </svg>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-surface-100 tracking-tight mb-1.5 sm:mb-2">
          {t.newVideoProject}
        </h1>
        <p className="text-xs sm:text-sm text-surface-400 max-w-xs sm:max-w-md mx-auto mb-4 sm:mb-6 px-2">
          {t.newVideoProjectDesc}
        </p>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 sm:gap-2.5 bg-brand-500 hover:bg-brand-400 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-500/25 active:scale-[0.97]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t.createNewProject}
        </Link>
      </div>

      {/* Separator */}
      <div className="border-t border-surface-800/60 mb-5 sm:mb-8" />

      {/* Projects header */}
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-surface-100">{t.projects}</h2>
        <span className="text-xs text-surface-500">
          {!loading && projects.length > 0 && `${projects.length} ${projects.length === 1 ? "project" : "projects"}`}
        </span>
      </div>

      {loading ? (
        <div className="grid gap-2.5 sm:gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-surface-800 bg-surface-800/50 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                    <div className="h-5 w-3/5 max-w-[10rem] bg-surface-700 rounded-md animate-skeleton" />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-3.5 w-1/5 max-w-[3.5rem] bg-surface-700 rounded animate-skeleton" />
                    <div className="h-3.5 w-1/4 max-w-[5rem] bg-surface-700 rounded animate-skeleton" />
                    <div className="h-3.5 w-1/5 max-w-[4rem] bg-surface-700 rounded animate-skeleton" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-800 flex items-center justify-center mx-auto mb-4 sm:mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-surface-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <p className="text-base sm:text-lg font-semibold text-surface-300 mb-1">{t.noProjectsYet}</p>
          <p className="text-xs sm:text-sm text-surface-500 px-4">
            {t.noProjectsDesc}
          </p>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:gap-3 stagger-children">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block rounded-xl border border-surface-700/60 bg-surface-800 hover:bg-surface-700/80 hover:border-surface-600/70 sm:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 transition-all p-3 sm:p-4"
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <h2 className="text-sm sm:text-base font-semibold text-surface-100 truncate group-hover:text-brand-300 transition-colors">
                      {project.title}
                    </h2>
                  </div>

                  {project.video ? (
                    <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[0.6875rem] sm:text-xs text-surface-400">
                      <span className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-surface-500 shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {formatDuration(project.video.duration)}
                      </span>
                      <span className="text-surface-700 hidden sm:inline">|</span>
                      <span className="hidden sm:inline">{project.video.width}x{project.video.height}</span>
                      <span className="text-surface-700 hidden sm:inline">|</span>
                      <span>{formatFileSize(project.video.fileSize)}</span>
                    </div>
                  ) : (
                    <p className="text-[0.6875rem] sm:text-xs text-surface-500">{t.noVideoUploaded}</p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteProject(project.id);
                  }}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-all"
                  title={t.deleteProject}
                  aria-label={t.deleteProject}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
