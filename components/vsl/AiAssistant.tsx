export default function AiAssistant() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Stuck on a concept? Just ask.</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          An AI Lesson Assistant, on <em className="text-gold-pale">every</em> lesson.
        </h2>
        <p className="mt-4 max-w-2xl text-parchment/75">
          A real AI assistant, built into the lesson page, with the lesson&rsquo;s
          own content as context. Ask it to explain something a different
          way, walk through a confusing step, or quiz you on what you just
          read — anytime, without leaving the lesson.
        </p>

        <div className="mt-12 overflow-hidden rounded-[2px] border border-gold/30 bg-parchment">
          <div className="border-b border-ink/10 bg-ink/[0.03] px-6 py-3">
            <p className="eyebrow text-crimson">AI Lesson Assistant · What Is T-SQL? A Tour of SSMS</p>
          </div>
          <div className="space-y-4 p-6 sm:p-8">
            <div className="ml-auto max-w-md rounded-[2px] bg-ink/5 px-4 py-3 text-sm text-ink">
              I get that T-SQL adds &ldquo;procedural&rdquo; stuff to SQL, but what does
              that actually mean in practice?
            </div>
            <div className="max-w-lg rounded-[2px] border border-gold/30 bg-white px-4 py-3 text-sm leading-relaxed text-ink/85">
              Good question. Plain SQL is <em>declarative</em> — you describe
              the result you want (&ldquo;give me every customer in Texas&rdquo;) and
              the engine figures out how. Procedural means you can also write
              step-by-step logic: <code className="rounded bg-ink/5 px-1">IF @Balance &lt; 0 ...</code>,
              loop over rows, store a reusable routine as a stored procedure.
              You&rsquo;ll see this directly in Chapter 6 when we write our first
              stored procedure together. Want a short example right now?
            </div>
          </div>
          <div className="border-t border-ink/10 bg-ink/[0.03] px-6 py-3">
            <p className="text-xs text-stone">
              AI-generated answers are designed to support your learning and
              may occasionally make mistakes. Your LTV instructor and course
              materials are the final source of truth.
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-parchment/50">
          Illustrative example of a real, working feature — not a logged transcript.
        </p>
      </div>
    </section>
  );
}
