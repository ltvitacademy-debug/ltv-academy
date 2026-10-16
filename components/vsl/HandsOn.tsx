export default function HandsOn() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4">No grading, no pressure — just real reps</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          Hands-on <em className="text-crimson">practice</em>, not just lectures.
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Every lesson feeds a drill bank for its course. Try to answer each
          question yourself, then reveal the correct answer and why. Questions
          you mark &ldquo;Review again&rdquo; come back next time you visit.
        </p>

        <div className="mt-10 overflow-hidden rounded-[2px] border border-ink/15 bg-white/60">
          <div className="border-b border-ink/10 px-6 py-3">
            <p className="eyebrow text-crimson">Guided practice · T-SQL Development · Question 1 of 590</p>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">
              What Is T-SQL? A Tour of SSMS
            </p>
            <p className="display mt-2 text-xl">What is T-SQL?</p>
            <div className="mt-5 inline-block rounded-[2px] border border-ink/20 px-4 py-2 text-sm font-semibold text-ink/60">
              Reveal answer
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-stone">
          Select courses go further, with a Resource Vault of real downloadable
          files and a Worked Example Library — fully solved problems you can
          study line by line. This is available today for a growing number of
          courses across the catalog, and we&rsquo;re adding more.
        </p>
      </div>
    </section>
  );
}
