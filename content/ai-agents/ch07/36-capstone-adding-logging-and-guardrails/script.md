# Script — Capstone: Adding Logging & Guardrails

## Segment 1 (title)

Lesson 29 proved the approval mechanism works. Nothing about that changes here. Every addition in this lesson wraps around the existing handler rather than touching its logic — a working, tested core shouldn't be disturbed to add safety around it.

## Segment 2 (code: audit logging)

Lesson 21's log shape, applied directly. Every call — approved, rejected, or ungated — writes one entry: timestamp, tool, input, the approval decision if there was one, and the result. Appended, never edited in place.

## Segment 3 (code: stopping conditions and budget)

Lesson 23 and 24's limits, but sized to this specific task, not copy-pasted. Eight iterations, not fifteen — this task needs far fewer. A fifty-cent budget, because a refund lookup is cheap. Exactly one record modified, because that's exactly what the task calls for, and nothing about this agent's job should ever need to touch a second order.

## Segment 4 (code: scoped credentials)

And Lesson 25's least privilege, applied to the one real credential this project holds. Refunds write, orders read — nothing more. Even if every other control somehow failed, this key alone can't reach a customer's account settings or payment method on file.

## Segment 5 (outro)

Nothing about the working core changed — only what's wrapped around it. That's the whole argument of Chapter 5, in miniature: safety as layers around good design, not a replacement for it. Next: taking this from a working build to something actually deployable.
