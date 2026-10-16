export default function CommunicationLab() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Technical skill isn&rsquo;t enough on its own</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Practice <em className="text-gold-pale">explaining</em> your work, not just doing it.
        </h2>
        <p className="mt-4 max-w-2xl text-parchment/75">
          The LTV Communication Lab is a separate set of exercises focused on
          one thing interviews and real jobs both demand: explaining a
          technical decision clearly, to a real audience. Write your own
          response, then compare it against a professional model answer and a
          rubric.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2px] border border-gold/30 bg-ink/20 p-7">
            <p className="display text-4xl text-parchment">451</p>
            <p className="mt-2 text-sm text-parchment/70">
              communication exercises across 18 of our 24 career paths
            </p>
          </div>
          <div className="rounded-[2px] border border-gold/30 bg-ink/20 p-7">
            <p className="display text-2xl text-parchment">Self-assessed, rubric-based</p>
            <p className="mt-2 text-sm text-parchment/70">
              no automated grading — you judge your own answer against a real
              professional standard
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
