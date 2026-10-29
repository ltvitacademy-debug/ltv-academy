# Lesson 28 — Blameless Postmortems, and Closing the Loop on an Incident

**Chapter 7 · Site Reliability Engineering Fundamentals · Lesson 4 of 4**

## What you'll learn

- Why "blameless" is a deliberate operating principle, not a nicety —
  and what it actually means in practice
- What a real postmortem document contains, section by section
- How to use a Five Whys-style walk to get past the first, shallow
  answer to a real root cause
- Why a postmortem that never tracks its action items to closure
  didn't actually accomplish anything

## Blameless doesn't mean consequence-free

"Blameless" is the most misunderstood word in this process, so it's
worth being precise. A blameless postmortem does **not** mean nobody
is accountable, and it doesn't mean mistakes get ignored. It means the
investigation assumes that the person who, say, pushed the deploy that
caused an outage was doing a reasonable thing with the information and
tools they had at the time — and that the real question is why the
*system* let a reasonable action produce a bad outcome. That reframing
matters practically, not just culturally: if people believe admitting
"I think my deploy caused this" will get them blamed, they hesitate to
say it, and the investigation slows down or gets the facts wrong. A
genuinely blameless process gets the truth faster, which is the whole
point — the honest timeline the Scribe built in the last lesson is
only useful if people keep being honest in the meeting that follows.

## What's actually in a postmortem document

A real postmortem isn't a few paragraphs of prose — it's a structured
document with the same sections every time, so anyone can scan it
later:

- **Summary** — two or three sentences: what broke, for how long, and
  who was affected.
- **Impact** — concrete numbers: how many requests failed, how much
  of the error budget it consumed, revenue or customer impact if
  known.
- **Timeline** — pulled straight from the Scribe's real-time log in
  the last lesson: detection, declaration, key decisions, mitigation,
  closure, with actual timestamps.
- **Root cause** — not "a bug," but the actual chain of conditions
  that let the bug reach production and cause impact (more on this
  below).
- **Contributing factors** — things that weren't *the* cause but made
  it worse or slower to fix: missing alerting, a runbook that was out
  of date, a dashboard that didn't surface the right signal.
- **What went well** — genuinely useful, not just morale-boosting:
  if the rollback tooling worked perfectly, that's worth naming so it
  doesn't get "fixed" into something worse later.
- **Action items** — specific, owned, dated follow-up work, covered
  in detail below.

## Five Whys: getting past the first answer

The first answer to "why did this happen" is almost always too
shallow to act on. "The deploy caused it" is true but useless — every
incident is eventually traceable to some deploy or change. The **Five
Whys** technique forces you past that first answer by repeatedly
asking why, illustrated here:

```
1. Why did checkout fail?          -> A bad config value was deployed.
2. Why was a bad config deployed?  -> The validation step didn't catch it.
3. Why didn't validation catch it? -> It only checked syntax, not ranges.
4. Why did it only check syntax?   -> Range checks were never added
                                      when the config schema grew.
5. Why were they never added?      -> No process flags config schema
                                      changes for a validation review.
```

Notice where that lands: not on "the engineer made a mistake," but on
a *process gap* — config schema changes don't trigger a validation
review. That's a fixable system property, not a person to retrain.
Five Whys doesn't have to stop at exactly five, and it isn't always a
single clean chain — real incidents often have two or three
contributing root causes running in parallel. The discipline is the
same either way: don't stop at the first answer that happens to be
true.

## Action items: the part that's easy to skip

A postmortem that ends with a well-written root cause and no real
follow-through has only documented the problem, not fixed it. Every
action item needs three things to be worth writing down: a specific
owner (a person, not a team), a due date, and a concrete definition of
done — "add range validation to the config schema deploy pipeline,"
not "improve config validation." Vague action items are where good
postmortems go to die; they sit unassigned forever because nobody
feels individually responsible for them.

Closing the loop means tracking those items to actual completion, not
just to "logged in a ticket." Many teams review open postmortem action
items in a recurring operational meeting, explicitly checking which
ones are overdue — because an incident that produces great analysis
but zero completed fixes will, with mechanical certainty, happen
again.

## Key terms

| Term | Meaning |
|---|---|
| Blameless postmortem | A review process that assumes individuals acted reasonably given the information they had, and investigates why the system allowed a bad outcome |
| Root cause | The underlying system or process condition that let an incident happen — not simply "a bug" or "a deploy" |
| Five Whys | A technique of repeatedly asking why an answer is true, to move past a shallow first answer to an actionable, systemic cause |
| Action item | A specific, owned, dated piece of follow-up work from a postmortem, tracked to actual completion rather than just logged |

## Check yourself

You've completed Chapter 7 when you can explain, without looking: why
does a blameless postmortem actually produce a *more* accurate
timeline than a process that assigns individual blame, and what three
things does an action item need before it's actually worth writing
down?
