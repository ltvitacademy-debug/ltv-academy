# Lesson 25 — Metrics That Mean Something to a Board, Not Just Engineers

**Chapter 7 · Security Metrics and Board Reporting · Lesson 1 of 4**

## What you'll learn

- Why "number of alerts triaged this month" tells a board nothing, even
  though it's a perfectly reasonable thing to track on an engineering
  dashboard
- The three tests a metric has to pass before it belongs in front of
  directors: is it a trend, does it map to a risk they already own, and
  does it point toward a decision
- A working set of board-grade metrics — and why each one survives the
  three tests while raw activity counts don't
- Why this isn't about dumbing anything down; it's about choosing the
  altitude the audience actually operates at

## Two audiences, two different questions

A SOC analyst and a board member are both asking "how secure are we?" —
but they mean completely different things by it. The analyst wants to
know whether today's queue is under control: how many alerts came in,
how many got triaged, how long the backlog is. A board member isn't
equipped to act on any of that, and more importantly, it isn't their
job to. Their job is to decide whether the organization is carrying an
acceptable level of risk, whether management is addressing it with
appropriate urgency, and whether more budget, more oversight, or a
policy change is needed. A metric only belongs on a board deck if it
helps answer one of those three questions.

This is why "we triaged 4,200 alerts last quarter" lands with a shrug
in a boardroom. It's an activity count — it says the team was busy, not
whether risk went up or down. It doesn't tell a director whether the
organization is more or less exposed than last quarter, and it gives
them nothing to decide on. Compare that to "critical unpatched systems
dropped from 340 to 95 over the quarter, against a board-approved target
of under 50 by year end." Same underlying work, completely different
value to the audience, because the second version is a trend tied to a
target the board already agreed to.

## The three tests

Before a metric goes on a board report, run it through three questions:

1. **Is it a trend, not a snapshot?** A single number — "we have 95
   critical unpatched systems" — has no context. Is that good or bad?
   Better or worse than last quarter? A trend line over 3-4 reporting
   periods answers the question the single number can't.
2. **Does it map to a risk the board already owns?** Boards are
   responsible for overseeing enterprise risk, not engineering output.
   A metric earns its place by connecting to a risk category the board
   already tracks — financial exposure, regulatory compliance,
   reputational risk, operational resilience — not to an internal team's
   workload.
3. **Does it point toward a decision?** The best board metrics suggest
   an action: approve more remediation budget, accept a residual risk
   formally, escalate a vendor relationship, or simply confirm that no
   action is needed this quarter. A metric that only informs, with no
   decision attached, is a status update — useful elsewhere, not here.

"Number of alerts triaged" fails all three: no trend context by itself,
no mapped risk, no decision implied. "% reduction in critical
unpatched systems" passes all three: it's inherently a trend, it maps
directly to the risk of exploitation of known vulnerabilities, and it
tells the board exactly what to ask about if the trend reverses.

## A working set of board-grade metrics

Security leaders who report well to boards converge on a similar small
set, independent of industry:

- **% reduction in critical/high unpatched systems**, trended
  quarter-over-quarter against an agreed target — the single clearest
  signal of whether the basics are under control.
- **Time-to-remediate critical vulnerabilities**, trended against the
  SLA the organization set for itself — not the raw count found, which
  mostly reflects scanning coverage, not risk.
- **% of critical third-party vendors with a current security
  assessment** — ties directly into Chapter 6's point that a vendor's
  risk is the organization's risk.
- **Quantified risk exposure in dollar ranges** for the top handful of
  risks, produced using FAIR (Chapter 3, Lesson 11) — the single most
  effective way to make risk legible to people who think in budgets.
- **Compliance posture against the frameworks that matter to this
  business** (SOC 2, ISO 27001, PCI DSS, HIPAA — Chapter 5), reported
  as status against target, not a raw control count.
- **Outstanding risk acceptances above the board's own threshold** —
  how many risks has management chosen to accept rather than remediate,
  and are any of them stale or past their review date.

None of these require a director to understand CVSS scoring, SIEM
tuning, or how a WAF rule works. That's the point: the metric has
already done the translation work the board shouldn't have to do
itself.

## Why this isn't "dumbing it down"

It's tempting to read this as softening the message for an audience
that "doesn't get" security. That's backwards. A board of directors is
making capital allocation and risk-acceptance decisions across the
entire enterprise — legal exposure, market risk, operational risk,
cyber risk, all at once. Handing them a vulnerability count is actually
the lazier move: it pushes the translation work onto an audience that
has neither the time nor the technical grounding to do it well, and it
usually gets ignored or misread as a result. Choosing the right
altitude is a harder, more disciplined exercise than reporting
everything you measured — and Lesson 26 picks up exactly that
translation work for individual risks, not just trend metrics.

## Key terms

| Term | Meaning |
|---|---|
| Activity metric | A count of work done (alerts triaged, scans run) — useful operationally, meaningless without translation at board level |
| Outcome/trend metric | A measure of risk posture over time, trended against a target — the form a board-grade metric takes |
| Risk acceptance | A formal decision to carry a known risk rather than remediate it, reported to the board as an outstanding item with an owner and review date |
| FAIR | Factor Analysis of Information Risk — the quantitative model (Chapter 3) used to express risk exposure in dollar ranges a board can weigh against other enterprise risks |

## Check yourself

You're ready for Lesson 26 when you can take any metric your team
already tracks and run it through all three tests — trend, mapped
risk, implied decision — and explain, for a metric that fails, exactly
which test it fails and what you'd report instead.
