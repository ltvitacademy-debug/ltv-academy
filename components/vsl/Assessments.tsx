export default function Assessments() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Know what you actually know</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Knowledge checks on <em className="text-gold-pale">every single lesson.</em>
        </h2>
        <p className="mt-4 max-w-2xl text-parchment/75">
          Every lesson across the entire catalog — all 5,959 of them — ends
          with a graded knowledge check before you move on. Each course also
          closes with a full final assessment covering everything you
          learned.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2px] border border-gold/30 bg-ink/20 p-7">
            <p className="eyebrow text-gold">Lesson knowledge checks</p>
            <p className="display mt-3 text-4xl text-parchment">5,959</p>
            <p className="mt-2 text-sm text-parchment/70">
              auto-graded questions, one set per lesson, platform-wide
            </p>
          </div>
          <div className="rounded-[2px] border border-gold/30 bg-ink/20 p-7">
            <p className="eyebrow text-gold">Course final assessments</p>
            <p className="display mt-3 text-4xl text-parchment">188 of 188</p>
            <p className="mt-2 text-sm text-parchment/70">
              courses with a real final exam bank — 90% to pass
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
