"use client";

import { useRef, useState } from "react";

type Clip = { slug: string; name: string };

const CLIPS: Clip[] = [
  { slug: "tony", name: "Tony" },
  { slug: "handyman-to-salesforce", name: "From Handyman to Salesforce Developer" },
  { slug: "lauren", name: "Lauren" },
  { slug: "okey", name: "Okey" },
  { slug: "ian", name: "Ian" },
  { slug: "alexis", name: "Alexis" },
  { slug: "brian", name: "Brian" },
  { slug: "charles", name: "Charles" },
  { slug: "rakiem", name: "Rakiem" },
  { slug: "lima", name: "Lima" },
];

function TestimonialCard({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-[2px] border border-gold/25 bg-ink">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={`/vsl/testimonials/${clip.slug}.mp4`}
        poster={`/vsl/testimonials/${clip.slug}.jpg`}
        controls={playing}
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent p-4 text-left"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/95 text-crimson-deep shadow-lg transition-transform group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v11l9-5.5-9-5.5Z" />
            </svg>
          </span>
          <span className="w-full text-sm font-semibold text-parchment">{clip.name}</span>
        </button>
      )}
    </div>
  );
}

export default function TestimonialVideos() {
  return (
    <div className="mt-10">
      <p className="eyebrow mb-4 text-gold">In their own words</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {CLIPS.map((clip) => (
          <TestimonialCard key={clip.slug} clip={clip} />
        ))}
      </div>
    </div>
  );
}
