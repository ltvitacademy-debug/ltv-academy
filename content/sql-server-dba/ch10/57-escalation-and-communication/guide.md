# Escalation & Communication

Triage told you what to prioritize; common issues gave you specific incidents to recognize.
Neither of those matters if the DBA handling an incident goes quiet, or tries to handle
something genuinely beyond their authority alone. This lesson is about the two things a DBA
does *around* the technical work: knowing when to bring in help, and saying something useful
while doing it.

## What you'll learn

- When escalating is the right call, versus when it's premature or unnecessary
- Who a DBA typically escalates to, and for what kind of problem
- What actually belongs in a good incident status update

## When to escalate

Escalating isn't a failure; not escalating when it's warranted is. The honest signals that it's
time: you've spent a reasonable amount of time and the problem still isn't stabilized, especially
under time pressure; the blast radius is bigger than you can act on alone — a full outage
touching multiple applications, not a single slow report; or the fix requires authority or access
you don't have — data recovery decisions with real business tradeoffs, or a change that needs
sign-off above the DBA level. Escalating early on a genuinely large incident costs almost
nothing; escalating too late, after struggling silently for an hour, costs real time everyone
else could have used.

## Who to escalate to

Escalation isn't a single lever — different problems go to different people. A technically hard
problem beyond your current experience goes to a senior DBA or the broader DBA team. A problem
that looks database-side but is actually rooted in how the application is using the database —
a new deployment issuing a pathological query pattern, for instance — goes to the application
team, since the DBA can stabilize the symptom but the app team owns the fix. A problem with real
business impact — data loss, an extended customer-facing outage — goes to management, who need
to know regardless of whether the DBA needs their technical help, because they're the ones who'll
field questions about it.

## What a good status update contains

A status update during an active incident has a small, consistent shape, and it should never
promise more certainty than actually exists:

- **Impact** — what's actually affected, in terms non-DBAs understand (e.g., "checkout is
  failing for all users," not "the OrderProcessing procedure is blocked")
- **Current action** — what's being done right now to address it
- **ETA, if genuinely known** — and if it isn't known yet, saying so honestly ("still assessing,
  next update in 15 minutes") is far better than guessing a number that turns out wrong

The last point matters more than it sounds: a DBA who says "fixed in 10 minutes" and misses that
by an hour damages trust more than one who says "don't have an ETA yet, next update at 2:45"
and delivers on that. False certainty under pressure is a common, avoidable mistake.

## Key terms

| Term | Meaning |
|---|---|
| Escalation | Bringing in additional help or authority during an incident, deliberately and early when warranted |
| Blast radius | How much of the system an incident affects — a key input into whether/how urgently to escalate |
| Status update | A concise, honest communication given during an incident: impact, current action, and ETA if known |

## Check yourself

An incident has real customer-facing impact, but you don't yet know when it will be resolved.
What should a status update say about the ETA, and why is guessing a specific time the wrong move?
