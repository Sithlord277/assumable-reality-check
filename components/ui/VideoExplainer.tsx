"use client";

import { useRef, useState } from "react";

interface VideoExplainerProps {
  eyebrow: string;
  title: string;
  duration: string;
  src: string;
  poster: string;
  /** Compact horizontal layout for content-heavy steps (e.g. Equity Gap). */
  compact?: boolean;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export default function VideoExplainer({
  eyebrow,
  title,
  duration,
  src,
  poster,
  compact = false,
}: VideoExplainerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    videoRef.current?.play()?.catch(console.error);
    setPlaying(true);
  }

  function handlePause() { setPlaying(false); }
  function handleEnded() { setPlaying(false); }

  // Ref callback for the compact overlay: play() fires within React's commit
  // phase, which is still inside the user-gesture window from the click.
  function attachAndPlay(el: HTMLVideoElement | null) {
    if (!el) return;
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    el.play()?.catch(console.error);
  }

  // ── Placeholder (no video yet) ──────────────────────────────────────────
  if (!src) {
    if (compact) {
      return (
        <div className="glass-dark flex items-center gap-4 rounded-tile px-4 py-4 shadow-tile opacity-50">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
            <PlayIcon className="h-5 w-5 translate-x-0.5 text-cream/40" />
          </div>
          <div className="min-w-0">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
              {eyebrow}
            </p>
            <p className="mt-0.5 text-sm font-bold leading-snug text-cream">{title}</p>
            <p className="mt-0.5 text-[0.65rem] text-cream/45">{duration}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="glass-dark overflow-hidden rounded-tile shadow-tile opacity-50">
        <div className="px-5 py-4">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-soft">
            {eyebrow}
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-cream">
            {title}
          </h3>
          <p className="mt-1 text-xs text-cream/45">{duration}</p>
        </div>
        <div className="relative mx-3 mb-3 aspect-video overflow-hidden rounded-xl bg-navy-deep flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/12">
              <PlayIcon className="h-7 w-7 translate-x-0.5 text-cream/30" />
            </div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-cream/25">
              Video coming soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Compact layout (Equity Gap) — plays inline, expands on tap ─────────
  if (compact) {
    if (playing) {
      return (
        <div className="glass-dark overflow-hidden rounded-tile shadow-tile">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-deep">
            <video
              ref={attachAndPlay}
              className="h-full w-full object-cover"
              playsInline
              controls
              src={src}
              poster={poster}
              onPause={handlePause}
              onEnded={handleEnded}
            />
          </div>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handlePlay}
        aria-label="Play video"
        className="glass-dark group flex w-full items-center gap-4 rounded-tile px-4 py-3 shadow-tile focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
      >
        {/* Thumbnail strip */}
        <div className="relative h-[52px] w-[92px] shrink-0 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(33,27,58,0.45)" }}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-cyan) 100%)",
              }}
            >
              <PlayIcon className="h-4 w-4 translate-x-0.5 text-white" />
            </span>
          </div>
        </div>
        <div className="min-w-0 text-left">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold-soft">
            {eyebrow}
          </p>
          <p className="mt-0.5 text-sm font-bold leading-snug text-cream">{title}</p>
          <p className="mt-0.5 text-[0.65rem] text-cream/45">{duration}</p>
        </div>
      </button>
    );
  }

  // ── Full layout ─────────────────────────────────────────────────────────
  return (
    <div className="glass-dark overflow-hidden rounded-tile shadow-tile">
      <div className="px-5 py-4">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold-soft">
          {eyebrow}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-cream">
          {title}
        </h3>
        <p className="mt-1 text-xs text-cream/45">{duration}</p>
      </div>

      <div className="relative mx-3 mb-3 aspect-video overflow-hidden rounded-xl bg-navy-deep">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
          controls={playing}
          onPause={handlePause}
          onEnded={handleEnded}
        >
          Your browser does not support embedded video.
        </video>

        {!playing && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-navy-deep/30 transition-colors hover:bg-navy-deep/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, var(--color-gold) 0%, var(--color-cyan) 100%)",
                boxShadow: "0 0 0 10px rgba(124, 92, 255, 0.20), 0 8px 24px rgba(124, 92, 255, 0.36)",
              }}
            >
              <PlayIcon className="h-7 w-7 translate-x-0.5 text-white" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
