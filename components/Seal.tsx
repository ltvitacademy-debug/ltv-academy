/*
 * The animated brand seal. Plays once on load (no loop), holds its last
 * frame; the poster and a prefers-reduced-motion fallback show the circular
 * still so the video's black corners never appear.
 */
export default function Seal({
  size = 44,
  src = "/brand/ltv-seal-320.mp4",
  className = "",
}: {
  size?: number;
  src?: string;
  className?: string;
}) {
  return (
    <span
      className={`seal-ring ${className}`}
      style={{ width: size, height: size }}
    >
      <video
        className="seal-video"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/brand/ltv-logo-still.png"
        src={src}
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="seal-still"
        src="/brand/ltv-logo-still.png"
        alt="Lifting the Veil Academy seal"
        width={size}
        height={size}
      />
    </span>
  );
}
