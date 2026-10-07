"use client";

import { useEffect, useMemo, useState } from "react";

type Flashcard = { term: string; definition: string; lessonTitle: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  // Render in the server-sent order on first paint (SSR and the initial
  // client render must match), then shuffle client-side only, after
  // mount — shuffling in the useState initializer would call Math.random()
  // during SSR and again during hydration, producing two different orders
  // and a hydration mismatch.
  const [deck, setDeck] = useState(cards);
  useEffect(() => {
    setDeck(shuffle(cards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gotIt, setGotIt] = useState(0);
  const [reviewAgain, setReviewAgain] = useState<Flashcard[]>([]);
  const [roundDone, setRoundDone] = useState(false);

  const total = cards.length;
  const current = deck[index];
  const seen = gotIt + reviewAgain.length;

  const progressLabel = useMemo(
    () => `${Math.min(seen, total)} of ${total} reviewed`,
    [seen, total]
  );

  function advance(nextReviewAgain: Flashcard[]) {
    setFlipped(false);
    if (index + 1 < deck.length) {
      setIndex(index + 1);
    } else if (nextReviewAgain.length > 0) {
      setDeck(shuffle(nextReviewAgain));
      setIndex(0);
      setReviewAgain([]);
    } else {
      setRoundDone(true);
    }
  }

  function markGotIt() {
    setGotIt((n) => n + 1);
    advance(reviewAgain);
  }

  function markReviewAgain() {
    const next = [...reviewAgain, current];
    setReviewAgain(next);
    advance(next);
  }

  function restart() {
    setDeck(shuffle(cards));
    setIndex(0);
    setFlipped(false);
    setGotIt(0);
    setReviewAgain([]);
    setRoundDone(false);
  }

  if (total === 0) {
    return (
      <div className="photo-plate relative flex min-h-[12rem] items-center justify-center">
        <p className="px-6 text-center text-parchment/90">
          This course&apos;s flashcard deck is in production.
        </p>
      </div>
    );
  }

  if (roundDone) {
    return (
      <div className="border-2 border-gold bg-gold/10 p-8 text-center">
        <p className="eyebrow mb-2">Deck cleared</p>
        <p className="display text-3xl">
          All <span className="text-gold">{total}</span> terms reviewed
        </p>
        <p className="mt-2 text-sm text-stone">
          Every card got a &ldquo;Got it&rdquo; at least once this round.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Review the deck again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">{progressLabel}</p>
        {reviewAgain.length > 0 && (
          <p className="text-xs uppercase tracking-[0.18em] text-crimson">
            {reviewAgain.length} queued for another pass
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="group mt-4 flex min-h-[16rem] w-full flex-col items-center justify-center border-2 border-ink/15 bg-parchment p-8 text-center transition-colors hover:border-crimson sm:min-h-[20rem]"
      >
        {!flipped ? (
          <>
            <p className="eyebrow mb-4">Term</p>
            <p className="display text-3xl sm:text-4xl">{current.term}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-stone group-hover:text-crimson">
              Tap to reveal
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow mb-4 text-crimson">Definition</p>
            <p className="max-w-2xl text-lg text-ink">{current.definition}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-stone">
              From: {current.lessonTitle}
            </p>
          </>
        )}
      </button>

      {flipped && (
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={markGotIt}
            className="flex-1 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Got it →
          </button>
          <button
            type="button"
            onClick={markReviewAgain}
            className="flex-1 rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson"
          >
            Review again
          </button>
        </div>
      )}
    </div>
  );
}
