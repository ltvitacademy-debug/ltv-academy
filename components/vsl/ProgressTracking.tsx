export default function ProgressTracking() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4">Know exactly where you stand</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          A real study plan, not an open-ended playlist.
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Every core career path comes with a personalized, week-by-week
          learning planner — built from the path&rsquo;s actual lesson hours, not a
          generic estimate. Plan length varies by path, typically 20 to 36
          weeks, so you always know what&rsquo;s next and how far you have left.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[2px] border border-ink/15 bg-white/60 p-6">
            <p className="display text-3xl text-crimson">16</p>
            <p className="mt-1 text-sm text-stone">core career paths with a full learning planner</p>
          </div>
          <div className="rounded-[2px] border border-ink/15 bg-white/60 p-6">
            <p className="display text-3xl text-crimson">20–36</p>
            <p className="mt-1 text-sm text-stone">weeks, depending on the path you choose</p>
          </div>
          <div className="rounded-[2px] border border-ink/15 bg-white/60 p-6">
            <p className="display text-3xl text-crimson">Every lesson</p>
            <p className="mt-1 text-sm text-stone">tracked — completed, in progress, or next up</p>
          </div>
        </div>
      </div>
    </section>
  );
}
