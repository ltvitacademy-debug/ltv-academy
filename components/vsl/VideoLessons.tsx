export default function VideoLessons() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4">Watch the lesson. Study the guide. Test your knowledge.</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          Real video lessons, <em className="text-crimson">not slides read aloud.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Each lesson pairs an instructional video with a full written guide —
          learning objectives, key terms, a hands-on lab, and a knowledge
          check. This is the real lesson a student opens today.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="overflow-hidden rounded-[2px] border border-ink/15 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vsl/lesson-video-real.jpg"
              alt="A real lesson video from the T-SQL Development course, screenshotted from the live platform"
              className="w-full"
            />
          </div>
          <div>
            <p className="eyebrow mb-3">The lesson guide</p>
            <h3 className="display text-2xl">
              Lesson 1 — What Is T-SQL? A Tour of SSMS
            </h3>
            <p className="mt-3 text-sm text-stone">
              Chapter 1 · T-SQL Foundations · Lesson 1 of 10
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/85">
              T-SQL (Transact-SQL) is Microsoft&rsquo;s extension of standard SQL
              built into SQL Server and Azure SQL. Plain SQL gives you the
              core vocabulary — SELECT, INSERT, UPDATE, DELETE. T-SQL adds
              procedural pieces on top: variables, branching, loops, stored
              procedures, error handling, and transaction control.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink/80">
              <li className="flex gap-2">
                <span className="text-gold">—</span> A hands-on lab against
                real Microsoft sample databases (AdventureWorks2012,
                AdventureWorksDW2014) — not invented tables
              </li>
              <li className="flex gap-2">
                <span className="text-gold">—</span> A key-terms reference for
                everything introduced in the lesson
              </li>
              <li className="flex gap-2">
                <span className="text-gold">—</span> A 5-question knowledge
                check before you move on
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-xs text-stone">
          Video is live today across every lesson in several complete career
          paths — including Microsoft Data &amp; BI Developer, Data Analyst →
          BI Engineer, Analytics Engineer, Azure/Fabric Data Engineer, and
          more. Newer paths are rolling out video on an ongoing basis; every
          lesson has a full written guide from day one either way.
        </p>
      </div>
    </section>
  );
}
