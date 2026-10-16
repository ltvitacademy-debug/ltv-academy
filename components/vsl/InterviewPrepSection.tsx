export default function InterviewPrepSection() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4">3. Prepare to demonstrate your skills</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          Think you&rsquo;re ready for a technical interview?{" "}
          <em className="text-crimson">Prove it.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Practice real technical interview questions, organized by skill,
          experience level, and interview type. Write your own answer first —
          the model answer only reveals after you submit, so you find out
          what you actually know.
        </p>

        <div className="mt-10 overflow-hidden rounded-[2px] border border-ink/15 bg-white/60">
          <div className="border-b border-ink/10 px-6 py-4">
            <p className="eyebrow mb-1 text-crimson">Career Interview Prep Center</p>
            <h3 className="display text-2xl">
              Microsoft Data &amp; BI Developer interview practice
            </h3>
            <p className="mt-1 text-sm text-stone">
              257 questions in this path&rsquo;s bank · reveal only after you
              answer
            </p>
          </div>
          <div className="grid gap-px bg-ink/10 sm:grid-cols-3">
            {[
              { label: "Technical skill", value: "140+ tags — DAX, T-SQL, SSIS, data modeling, architecture, and more" },
              { label: "Experience level", value: "Beginner through Expert / Lead-Architect" },
              { label: "Interview type", value: "Technical, hands-on, troubleshooting, architecture, behavioral" },
            ].map((item) => (
              <div key={item.label} className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-ink/80">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="display text-4xl text-crimson">4,926</p>
            <p className="mt-1 text-sm text-stone">real interview questions across the catalog</p>
          </div>
          <div>
            <p className="display text-4xl text-crimson">20</p>
            <p className="mt-1 text-sm text-stone">dedicated question banks across our career paths</p>
          </div>
          <div>
            <p className="display text-4xl text-crimson">Self-assessed</p>
            <p className="mt-1 text-sm text-stone">write your answer, then compare to a real model answer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
