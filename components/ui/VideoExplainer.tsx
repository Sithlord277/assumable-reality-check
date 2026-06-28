interface VideoExplainerProps {
  eyebrow: string;
  title: string;
  duration: string;
  src: string;
  poster: string;
}

export default function VideoExplainer({
  eyebrow,
  title,
  duration,
  src,
  poster,
}: VideoExplainerProps) {
  return (
    <section className="advisor-surface overflow-hidden rounded-tile">
      <div className="bg-navy px-5 py-4 text-cream">
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-gold-soft">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight text-cream">
          {title}
        </h3>
        <p className="mt-2 text-xs font-semibold text-cream/60">{duration}</p>
      </div>

      <div className="bg-navy p-2 pt-0">
        <video
          className="aspect-video w-full rounded-lg bg-navy-deep object-cover"
          controls
          playsInline
          preload="metadata"
          poster={poster}
          src={src}
        >
          Your browser does not support embedded video.
        </video>
      </div>
    </section>
  );
}
