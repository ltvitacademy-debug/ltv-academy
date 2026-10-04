"use client";

import { useState } from "react";

type Turn = { role: "user" | "assistant"; content: string };

export default function LessonChat({
  courseTitle,
  lessonTitle,
  guideExcerpt,
}: {
  courseTitle: string;
  lessonTitle: string;
  guideExcerpt: string;
}) {
  const [history, setHistory] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    const question = draft.trim();
    if (!question || pending) return;
    setDraft("");
    setError(null);
    const nextHistory: Turn[] = [...history, { role: "user", content: question }];
    setHistory(nextHistory);
    setPending(true);
    try {
      const res = await fetch("/api/lesson-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          courseTitle,
          lessonTitle,
          guideExcerpt,
          question,
          history: history.slice(-6),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setHistory([...nextHistory, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <p className="eyebrow mb-1">AI lesson helper</p>
      <p className="mb-6 text-sm text-stone">
        This is an automated assistant (powered by Claude) — not your instructor. Ask
        it to explain or simplify anything from this lesson.
      </p>

      {history.length > 0 && (
        <div className="mb-4 space-y-3">
          {history.map((turn, i) => (
            <div
              key={i}
              className={
                turn.role === "user"
                  ? "border-l-2 border-ink/20 pl-4 text-sm text-ink"
                  : "border-l-2 border-gold pl-4 text-sm text-ink"
              }
            >
              <p className="eyebrow mb-1 text-xs">
                {turn.role === "user" ? "You" : "Lesson helper"}
              </p>
              <p className="whitespace-pre-wrap">{turn.content}</p>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mb-4 text-sm text-crimson">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask();
            }
          }}
          placeholder={`Ask about "${lessonTitle}"...`}
          rows={2}
          disabled={pending}
          className="flex-1 border border-ink/15 bg-parchment p-3 text-sm text-ink focus:border-crimson focus:outline-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={ask}
          disabled={pending || !draft.trim()}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          {pending ? "Thinking…" : "Ask"}
        </button>
      </div>
    </div>
  );
}
