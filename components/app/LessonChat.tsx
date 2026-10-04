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
      <p className="eyebrow mb-1">AI Lesson Assistant</p>
      <p className="display mb-2 text-xl">Need help with this lesson?</p>
      <p className="mb-2 text-sm text-stone">
        Ask the AI Lesson Assistant a question anytime. It can explain concepts in
        simpler terms, give you examples, walk you through confusing topics, or help
        you review what you just learned.
      </p>
      <p className="mb-6 text-xs text-stone/70">
        AI-generated answers are designed to support your learning and may
        occasionally make mistakes. Your LTV instructor and course materials are the
        final source of truth.
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
                {turn.role === "user" ? "You" : "AI Lesson Assistant"}
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
          placeholder="What would you like help understanding?"
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
          {pending ? "Thinking…" : "Ask AI"}
        </button>
      </div>
    </div>
  );
}
