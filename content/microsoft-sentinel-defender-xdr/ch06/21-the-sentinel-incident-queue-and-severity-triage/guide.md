# Lesson 21 — The Sentinel Incident Queue and Severity Triage

**Chapter 6 · Incident Investigation in Sentinel · Lesson 21 of 32**

## What you'll learn

- What a Sentinel **incident** actually is, and why it's a different object from an alert
- The four real severity levels Sentinel assigns — Informational, Low, Medium, High — and what
  each one is meant to tell an analyst at a glance
- How the Incidents page's queue, assignment, and status fields turn the generic triage loop
  from the previous course into a concrete Sentinel workflow
- Why working the queue by severity, not by arrival order, is the practice that actually matters

## An incident is a group of alerts, not a single one

The previous course taught the real four-step triage loop — fire, review, classify, act — as a
generic SOC process that applies to any SIEM. Sentinel implements that loop around one specific
object: the **incident**. An incident is not the same thing as an alert. Sentinel's analytics
rules (Chapter 3) can fire several related alerts — a suspicious sign-in, a new OAuth grant on
that same account, and an unusual mail-forwarding rule created minutes later — and rather than
handing an analyst three separate, disconnected alerts to investigate one at a time, Sentinel's
incident correlation groups related alerts that share the same underlying entities into **one
incident**. That grouping is the whole point: an analyst opening incident #4821 sees the full
picture of what happened to one account, not three alerts they'd have to mentally stitch together
themselves.

## Four severities, one at-a-glance signal

Every incident Sentinel creates gets a **severity**: Informational, Low, Medium, or High. Severity
is set by the analytics rule that generated the incident's alerts, and it exists so an analyst
scanning a queue of dozens of incidents can tell, before opening a single one, roughly how urgent
it is. **Informational** covers things worth recording but not worth independent action — a
successful password reset, logged for context. **Low** covers activity that's a little unusual but
rarely malicious on its own, like a single failed sign-in. **Medium** covers activity that
genuinely warrants a human look — impossible travel, a new admin role grant from an unfamiliar
device. **High** is reserved for patterns that closely match real attack behavior — a sign-in from
a known-malicious IP immediately followed by mass file downloads, for example — and should jump to
the top of any analyst's queue regardless of when it arrived.

## The Incidents page: queue, assign, work

Sentinel's **Incidents page** is the queue itself: a filterable, sortable list where every open
incident shows its severity, status (New, Active, or Closed), and owner. A real analyst's workflow
on that page is the Sentinel-specific version of the generic review-and-classify loop: filter the
queue by severity so High incidents surface first, **assign** an incident to yourself (or have it
auto-assigned) so two analysts don't duplicate work on the same case, open it to review the
grouped alerts and the entities involved, and move its status from New to Active while working it.
When the investigation concludes, the analyst closes it with a classification — True Positive,
False Positive, or Benign Positive, the same three outcomes from the earlier triage lesson, now
recorded directly on the incident record itself rather than just in an analyst's head.

## Why severity order beats arrival order

A queue worked strictly in the order incidents arrived treats a High-severity credential-compromise
incident from ten minutes ago exactly the same as a Low-severity incident that's been sitting for
two hours — and that's backwards. The two hours an older Low incident waited cost nothing extra;
the ten minutes a High incident waits is ten extra minutes of dwell time for a possible active
attacker. Working the queue by severity first, then by age within each severity band, is what
actually limits dwell time in practice rather than just in theory.

## Key terms

| Term | Meaning |
|---|---|
| Incident | Sentinel's object that groups one or more related alerts sharing common entities |
| Severity | Informational, Low, Medium, or High — how urgent an incident is, set by its analytics rule |
| Incidents page | Sentinel's queue view: filter, sort, assign, and track status on open incidents |
| Status | New, Active, or Closed — where an incident sits in the triage workflow |

## Check yourself

Two incidents sit in the queue: a Low-severity incident that arrived two hours ago, and a
High-severity incident that arrived ten minutes ago. Which should an analyst open first, and why
does working by severity rather than arrival order actually limit dwell time?
