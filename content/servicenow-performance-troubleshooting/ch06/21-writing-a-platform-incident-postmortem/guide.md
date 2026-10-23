# Lesson 21 — Writing a Platform Incident Postmortem

**Chapter 6 · Incident Response for Platform Issues · Lesson 21 of 25**

## What you'll learn

- The four real components of a useful postmortem: factual timeline, root cause, resolution, prevention
- Why "the symptom" and "the root cause" are not the same thing, and why a postmortem has to name both
- Why vague prevention commitments ("we'll be more careful") fail, and what a concrete one looks like instead
- The blameless postmortem principle, and the real reason it exists
- How this connects to Course 10's Security Incident Response and to general site-reliability culture

## What a postmortem is actually for

Once a platform incident is resolved, the work isn't finished — writing it up is the part that
actually prevents it from happening again. A postmortem is not a status update ("it's fixed now") and
it's not a narrative for its own sake. It's a structured record built around four real components: a
factual timeline of what happened, the actual root cause, how it was genuinely resolved, and concrete
prevention follow-up with real owners and deadlines. Skip any one of those four and the document stops
being useful — a timeline without a root cause doesn't explain anything, and a root cause without
prevention actions doesn't stop the same incident from happening again next quarter.

## Root cause is not the same thing as the symptom

"Response times tripled for 45 minutes" is a symptom. "An unoptimized Business Rule shipped in that
morning's deployment ran a GlideRecord query against every Incident record update, with no indexed
filter, consuming semaphores faster than they could be released" is a root cause. A postmortem that
stops at the symptom is really just restating the original complaint with more words — it hasn't
explained anything that will help prevent a recurrence. Getting to the real root cause is exactly the
work Lesson 19's triage sequence was built for: confirming scope, checking the deployment timeline, and
checking resource exhaustion don't just resolve the incident in the moment, they produce the specific,
factual chain of cause and effect the postmortem needs to document afterward.

## Prevention actions need owners and deadlines, not good intentions

"We'll be more careful with deployments going forward" commits nobody to anything and changes nothing
about how the next deployment actually happens. A real prevention action names a specific change, a
specific owner, and a specific deadline: "Add a GlideRecord-query performance check to the pre-deployment
ATF suite — owner: [name] — target: before next release window." That level of specificity is what
turns a postmortem from a document people read once into a document that actually changes the process.
If a postmortem's prevention section could be copy-pasted into any other incident with no edits, it
isn't concrete enough to do any real work.

## Blameless, by design, not by courtesy

A genuinely useful postmortem is blameless — it focuses on what in the *process* or *system* allowed
the incident to happen, not on which individual happened to be at the keyboard when it did. This isn't
a soft-skills courtesy; it's a practical requirement for the postmortem to work at all. If writing up an
incident means naming and blaming whoever deployed the problematic change, people stop volunteering
details next time — they describe incidents vaguely, omit what they tried, and slow down the very
investigation a postmortem depends on. A blameless postmortem asks "what let an unoptimized Business
Rule reach production without being caught" (a gap in review or in the ATF suite) rather than "who
wrote the bad rule" — because the first question has an answer that actually prevents a recurrence, and
the second one just assigns fault. This principle carries over directly from Course 10's Security
Incident Response and from general site-reliability engineering culture: the goal of any postmortem,
security or performance, is a system that fails less often, not a search for who to blame when it does.

## Key terms

| Term | Meaning |
|---|---|
| Postmortem | A structured, written record of a resolved incident: timeline, root cause, resolution, prevention |
| Root cause | The actual mechanism that caused the incident, distinct from the symptom users experienced |
| Prevention action | A concrete follow-up change with a named owner and deadline, not a vague intention |
| Blameless postmortem | A postmortem focused on process/system gaps, not on blaming the individual involved |
| Factual timeline | A chronological, evidence-based account of what happened, without speculation |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does a blameless postmortem
actually produce better prevention outcomes than one that names and blames an individual — what
specifically goes wrong when people expect to be blamed for an honest incident write-up?
