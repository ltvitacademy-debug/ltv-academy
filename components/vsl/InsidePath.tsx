export default function InsidePath() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">2. Experience the training system</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Inside a real career path.
        </h2>
        <p className="mt-4 max-w-2xl text-parchment/75">
          Every path is a real, structured curriculum — not a playlist. Here&rsquo;s
          the actual course page a student sees, taken directly from the
          T-SQL Development course inside the Microsoft Data &amp; BI Developer
          path.
        </p>

        <div className="mt-10 overflow-hidden rounded-[2px] border border-gold/30 bg-parchment text-ink">
          <div className="border-b border-ink/10 p-6 sm:p-8">
            <p className="eyebrow mb-2">Course curriculum</p>
            <h3 className="display text-3xl sm:text-4xl">T-SQL Development.</h3>
            <p className="mt-2 max-w-xl text-sm text-stone">
              From your first SELECT to performance tuning and data
              warehousing — 118 lessons in real SQL Server Management
              Studio, working against AdventureWorks2012 and
              AdventureWorksDW2014.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-[2px] border border-ink/15 px-3 py-1.5 text-xs font-semibold text-stone">
                118 lessons
              </span>
              <span className="rounded-[2px] border border-ink/15 px-3 py-1.5 text-xs font-semibold text-stone">
                12 chapters
              </span>
              <span className="rounded-[2px] border border-gold bg-gold/10 px-3 py-1.5 text-xs font-semibold text-crimson-deep">
                Final assessment
              </span>
            </div>
          </div>
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
            <div className="bg-parchment p-6 sm:p-8">
              <p className="eyebrow mb-2">Course progress</p>
              <p className="display text-5xl text-crimson">
                0<span className="text-2xl text-stone">%</span>
              </p>
              <p className="mt-1 text-sm text-stone">0 of 118 lessons completed</p>
            </div>
            <div className="bg-parchment p-6 sm:p-8">
              <p className="eyebrow mb-2">Start here</p>
              <p className="display text-xl">
                What Is T-SQL? A Tour of SSMS
              </p>
              <p className="mt-2 text-sm text-stone">
                Chapter 1 · T-SQL Foundations · Lesson 1 of 118
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
