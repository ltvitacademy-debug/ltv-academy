# Script — Documenting a Resolution

## Segment 1 (title)

Lesson three: documenting a resolution. In most IT systems, "fixed, works now" is an acceptable ticket note. In a financial system, it isn't — because the numbers you touch feed a balance sheet, an income statement, or an audit, and someone will eventually ask why an account looks the way it does.

## Segment 2 (steps)

A real resolution note needs five things. The original symptom, in specifics — which record, what was actually reported. The root cause, stated specifically, not as a vague category. The fix applied — exactly what was changed and where. Verification — the specific check that proves it worked. And, where relevant, a prevention note: is this likely to recur, without over-promising a fix nobody asked you to build.

## Segment 3 (code)

Compare these two. Bad: invoice was stuck, fixed it, now works. That tells the next person nothing. Good: ticket forty-one-twelve, Meridian Steel. Invoice INV-88341 wouldn't validate because its distribution total was thirty dollars short of the header amount, after a freight line got added late. Fix: added the missing thirty-dollar distribution. Verified: re-ran Validate, invoice moved to Validated with no holds. And it explicitly says no setup changed — so nobody assumes you touched a rule that affects other suppliers.

## Segment 4 (steps)

One more honesty rule: don't document more confidence than you actually have. Some tickets get worked around rather than fully explained. If you reapplied a misapplied receipt correctly but never confirmed why it was misapplied in the first place, say exactly that. A confident-sounding root cause that's wrong is worse than an honest "not fully confirmed, recommend monitoring."

## Segment 5 (outro)

Symptom, root cause, fix, verification, and honesty about what you don't know — that's the shape of every resolution note from here forward. Up next, chapter two: your first real tickets, starting in Payables.
