# A Systematic Approach to Performance Tuning

T-SQL for Database Administrators' Chapter 9 gave you a performance-troubleshooting
toolkit — Query Store, execution plans, top-resource-consuming queries. This course goes
much further: performance tuning as its own discipline, covering query tuning, index
tuning in depth, wait-based methodology, and configuration tuning, all the way through to
a capstone where you diagnose and fix a genuinely slow production database.

## What you'll learn

- Why "just try things until it's faster" is the wrong instinct
- The systematic loop this entire course is built around
- What separates tuning from troubleshooting

## Troubleshooting fixes an incident. Tuning improves a system.

T-SQL for DBAs' performance chapter was about **troubleshooting**: something is on fire
right now, find the expensive query, do something about it. That's a real, necessary
skill — but it's reactive by nature. **Tuning** is different: it's the deliberate,
repeatable practice of making a system measurably faster, whether or not anything is
currently broken. A DBA who only troubleshoots is always one incident behind; a DBA who
tunes catches problems before they become incidents.

## The systematic loop

Every technique in this course — index design, query rewrites, wait analysis,
configuration changes — plugs into the same four-step loop:

1. **Measure** — establish what "normal" actually looks like before touching anything
   (Lesson 3 goes deep on this).
2. **Identify** — find the specific, measurable bottleneck, not a vague feeling that
   "the database is slow."
3. **Change** — make one deliberate change, informed by what you actually measured.
4. **Verify** — measure again. Did the specific bottleneck you targeted actually move?

Skipping straight to step 3 — guessing at a fix without measuring first — is the single
most common mistake this course exists to correct. A rebuilt index, an added `NOLOCK`
hint, or a bumped `MAXDOP` value that "feels like it helped" without a before/after
measurement isn't tuning. It's luck, and it doesn't teach you anything for next time.

## Why this matters beyond just speed

A change made without measuring first can make things *worse* while feeling like it
helped — a classic example is adding an index that speeds up one report query while
silently slowing down every write to that table. The systematic loop isn't
bureaucracy for its own sake; it's the only reliable way to know a change actually did
what you intended, and didn't quietly cost you somewhere else.

## Key terms

| Term | Meaning |
|---|---|
| Troubleshooting | Reactive: diagnosing and fixing an active performance incident |
| Tuning | Proactive: deliberately improving system performance, measured before and after |
| Baseline | A recorded "normal" state of key metrics, used to judge whether a change helped |
| Bottleneck | The single specific resource or operation actually limiting performance right now |

## Check yourself

A colleague adds `WITH (NOLOCK)` to a slow query and reports it "feels faster." Why isn't
that tuning, according to this lesson's four-step loop — and what's missing?
