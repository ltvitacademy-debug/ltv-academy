# Lesson 20 — Triaging a Cloud Security Alert Without Drowning in Noise

**Chapter 5 · Cloud-Native Security Tooling · Lesson 4 of 4**

## What you'll learn

- Why a raw severity label (High/Medium/Low) is a starting point, not
  the actual answer to "how urgent is this"
- How to factor blast radius and asset criticality into a triage
  decision instead of triaging tools-first
- The recurring false-positive patterns that eat the most analyst time
  in Defender for Cloud and Security Hub/GuardDuty, and how to handle
  them without blanket-dismissing a whole alert type
- A repeatable triage sequence you can actually run against a queue,
  not just triage principles in the abstract

## Severity tells you what the tool thinks; it doesn't tell you what matters

Every alert you've seen in this chapter — a Defender for Cloud security
alert, a GuardDuty finding — ships with a severity label. Treating that
label as the final answer is exactly how a security operations queue
turns into unmanageable noise. Severity is calculated from the alert
type itself, in isolation; it has no idea whether the resource it fired
on is a disposable dev/test sandbox or your production payment
processing database. A Medium-severity finding on a production,
internet-facing, privilege-bearing resource is frequently a bigger deal
than a High-severity finding on an isolated sandbox VM nobody depends
on. Severity is where you start reading, not where you stop.

## Blast radius: what actually happens if this is real

Before deciding how urgently to act, ask what's actually reachable from
the resource the alert fired on. A compromised VM with no attached
managed identity and no network path to anything sensitive has a small
blast radius. The same VM with a system-assigned managed identity that
holds Contributor on the subscription, or an IAM role with broad S3
access, has an enormous one — the alert isn't really about that VM,
it's about everything that identity can touch. This is exactly the
chain Defender CSPM's attack-path analysis tries to make visible before
an incident, but you need to be able to reconstruct it manually too,
by checking the resource's role assignments, network exposure, and
what data it can reach.

## Recognizing real false-positive patterns — without blanket suppression

A handful of patterns genuinely do account for a large share of noisy
alerts, and learning to recognize them fast is a real skill:

- **Known internal tooling mimicking an attack pattern** — a vulnerability
  scanner or a pentest engagement can trigger "SSH brute-force" or
  "unusual process" alerts that are actually your own team at work.
- **Scheduled automation that looks like anomalous access** — a backup
  job or a CI/CD pipeline running at an unusual hour from an unusual
  location can trigger impossible-travel or unusual-login alerts.
- **Dev/test environments generating realistic-looking noise** — a
  sandbox resource with relaxed network rules by design will trip
  recommendations and occasionally alerts that would be genuinely
  urgent on production.

The discipline here isn't "ignore these alert types" — it's **document
the specific, verified reason** a given alert was a false positive
(which tool, which schedule, which environment), scope any suppression
rule as narrowly as the explanation allows, and revisit suppressions
periodically. Blanket-suppressing an entire finding type because it was
a false positive once is how a real attack that happens to resemble a
known-benign pattern slips through unnoticed.

## A repeatable triage sequence

1. **Read the alert/finding fully** — resource, severity, MITRE ATT&CK
   tactic tag, and (for GuardDuty) the finding type name itself, which
   usually tells you most of the story already.
2. **Check for grouping** — is this alert already tied into a Defender
   for Cloud incident, or does Security Hub show related findings on
   the same resource? Triage the group, not the isolated tile.
3. **Establish blast radius** — what identity, network path, and data
   does the affected resource actually touch?
4. **Rule out a known false-positive pattern with evidence**, not
   assumption — confirm it against a change log, a known scanner IP, or
   a scheduled job, don't just guess it's probably fine.
5. **Decide: contain, monitor, or escalate** — contain immediately for
   confirmed malicious activity with real blast radius; monitor for
   low-confidence, low-blast-radius findings; escalate anything you
   can't confidently resolve with the first four steps.
6. **Correlate across the source-of-truth logs** — CloudTrail or Azure
   Activity Log — before closing anything out, so you're not relying
   solely on the alerting tool's own summary of what happened.

## Key terms

| Term | Meaning |
|---|---|
| Severity | A label calculated from the alert type itself, independent of the specific resource's context — a starting point for triage, not a verdict |
| Blast radius | What identity privileges, network paths, and data a compromised resource could actually reach if the alert is real |
| False-positive pattern | A recurring, explainable source of noisy-but-benign alerts (internal scanning, scheduled jobs, dev/test environments) that should be documented and narrowly scoped, never blanket-suppressed |
| Alert grouping / incident | Related alerts tied together into one attack story by the tool (Defender for Cloud incidents, Security Hub's related findings) |
| Source-of-truth correlation | Checking an alert's claim against CloudTrail or Azure Activity Log directly, rather than trusting the alerting tool's summary alone |

## Check yourself

You're ready to move on when you can explain, without looking: why can
a Medium-severity alert deserve faster action than a High-severity one,
and what's the specific risk of handling a recognized false-positive
pattern by permanently suppressing the entire finding type instead of
documenting the narrow reason for that one case?
