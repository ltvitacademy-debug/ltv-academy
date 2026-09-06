"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContinueCard() {
  const [last, setLast] = useState<{ href: string; title: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ltv:last-lesson");
      if (raw) setLast(JSON.parse(raw));
    } catch {}
  }, []);

  if (!last) return null;

  return (
    <Link
      href={last.href}
      className="mt-10 block border-l-2 border-gold bg-white/40 p-6 hover:bg-white/70"
    >
      <p className="eyebrow mb-2">Continue where you left off</p>
      <p className="display text-2xl">{last.title} →</p>
    </Link>
  );
}
