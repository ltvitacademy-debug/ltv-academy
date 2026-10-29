# Lesson 7 — Communicating with Customers and Stakeholders During an Outage

**Chapter 2 · Advanced Incident Management · Lesson 3 of 4**

## What you'll learn

- Why the status page exists as its own discipline, separate from
  internal incident chat
- The cadence that builds trust during an outage, and the one that
  erodes it
- The honesty level that actually works — and the two ways teams get
  it wrong in opposite directions
- Why internal stakeholder updates are a different document from the
  public status page, not the same text copy-pasted twice
- The standard status-page lifecycle stages and what each one
  communicates

## The status page is a separate job, on a cadence

Public status pages — whether built on Atlassian Statuspage,
incident.io, or an in-house equivalent — exist because customers
experiencing a problem want two things fast: confirmation that the
company knows, and a sense of when it'll be over. The Communications
Lead from Lesson 5 owns this, and the discipline that matters most is
**cadence**: committing to an update on a fixed schedule — commonly
every 30 minutes for an active incident — regardless of whether
there's technical progress to report. "Still investigating, next
update by 2:45 PM" is itself useful information; silence between
updates is what actually damages trust, far more than slow progress
does.

## The honesty level that builds trust

Two opposite mistakes show up constantly in outage communication,
and both erode trust:

- **Minimizing impact** — calling something "intermittent" or
  "affecting a small number of users" when it's actually widespread.
  Customers who are personally affected see through this immediately,
  and it costs credibility on every future incident, not just this
  one.
- **Over-promising a fix time** — giving a specific ETA before the
  root cause is confirmed, then missing it. An ETA that slips reads as
  worse than no ETA at all.

The level that works in practice: say plainly what's known (impact,
scope, what's confirmed so far), say plainly what's not yet known
(root cause still under investigation), and commit to *when the next
update will come* rather than when the incident will end, until
there's real confidence in a fix.

```
[Investigating] 14:08
We're aware of elevated error rates on checkout for a subset of
customers and are actively investigating. Next update by 14:40.

[Identified] 14:35
We've identified the cause as a recent deployment and are rolling
back. Next update by 15:00.

[Monitoring] 14:50
The rollback is complete and error rates have returned to normal.
We're continuing to monitor before marking this resolved.

[Resolved] 15:15
This incident is resolved. We'll share a summary of what happened
and what we're changing within 5 business days.
```

Those four stages — **Investigating → Identified → Monitoring →
Resolved** — are the standard lifecycle most status page tooling
builds around, and each stage has a specific job: Investigating says
"we know, we're on it"; Identified says "we found the cause"; 
Monitoring says "the fix is in, we're confirming it holds"; Resolved
closes the loop and sets the expectation that a fuller explanation is
coming.

## Internal stakeholder updates are a different document

The public status page is deliberately light on technical detail —
customers don't need to know it was a bad database migration. Internal
stakeholders (your own leadership, sales, support, account management)
need a different document entirely: the real root cause as currently
understood, the actual business impact (revenue affected, which
customer segments, SLA exposure), and what's being done, with enough
specificity that support can answer customer questions accurately and
leadership can decide whether this needs executive attention or a
proactive customer outreach.

Writing one document and trimming it for two audiences usually fails
in one direction or the other — either the public page leaks internal
detail it shouldn't, or the internal update is too vague to actually
inform a business decision. The Communications Lead maintains both,
on their own cadence, because they serve different purposes.

## Why this is a named role, not an afterthought

All of this — cadence, honesty level, the public/internal split —
is genuinely hard to do well while also being the person running the
technical response. That's the direct payoff of Lesson 5's role
separation: because the Communications Lead isn't also debugging the
replication lag, they can hold the discipline of a fixed update
schedule and a consistent honesty level even as the technical picture
keeps changing underneath them.

## Key terms

| Term | Meaning |
|---|---|
| Status page | The public-facing page where a company posts incident updates customers can check without contacting support |
| Update cadence | A fixed schedule for posting updates (e.g. every 30 minutes) regardless of technical progress, so silence never reads as neglect |
| Investigating / Identified / Monitoring / Resolved | The standard four-stage lifecycle most status page tooling is built around |
| Internal stakeholder update | A separate, more detailed document for leadership/support/sales — different content and purpose from the public status page |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what
two opposite communication mistakes damage trust during an outage, and
why does the public status page need to be a genuinely different
document from the internal stakeholder update, not just a trimmed copy
of it?
