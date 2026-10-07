# Script — Capstone: Extending the Result

## Segment 1 (title)

A reproduction answers whether you can trust a number. An extension answers something the original paper didn't. This lesson is about designing that extension so it's small enough to finish, scoped enough to isolate one real question, and honest enough that even a null result is still useful — using chapter four's ablation-design and sweep skills on your own baseline.

## Segment 2 (steps)

Pick exactly one of three shapes. A single-component ablation removes or disables one piece of the method and measures how much of the result survives without it. The same method on a new dataset or setting keeps everything else fixed, so any gap is attributable to the setting alone. Or one well-motivated tweak swaps a single component for a reason you can state in one sentence. Never combine more than one — you won't be able to tell which change caused what.

## Segment 3 (code)

Build the extension config on top of the exact settings that already reproduced, inheriting the whole baseline and changing only the one thing under test — here, disabling a specific augmentation. Inheriting the reproduced baseline this way, rather than writing a fresh config from scratch, means the comparison stays clean: same everything, minus exactly one component.

## Segment 4 (code)

Run a deliberately small sweep — one factor, a handful of seeds, nothing else — rather than a sprawling grid search across everything you could possibly vary. A few seeds is usually enough to tell a real effect apart from ordinary run-to-run noise on a small benchmark, though it is not enough to claim strong statistical certainty, and your write-up in the next lesson should say exactly that.

## Segment 5 (outro)

Whether the ablation shows a real effect or none at all, a well-designed extension is a successful capstone outcome either way. Up next, lesson forty-five: writing it up and presenting it, closing out the course.
