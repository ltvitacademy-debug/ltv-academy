# Lesson 28 — When and How to Report a Significant Security Incident Upward

**Chapter 7 · Security Metrics and Board Reporting · Lesson 4 of 4**

## What you'll learn

- Why not every incident is "material," and who actually makes that
  call — never the security team alone
- The real internal escalation chain from incident response through
  legal, the disclosure committee, and the board
- What the SEC's cybersecurity disclosure rules actually require of
  U.S. public companies, in both timing and content
- Why materiality-based disclosure and data-breach notification laws
  are two separate, parallel obligations — not the same requirement
  twice

## Materiality: not every incident goes to the board

A ransomware infection on a single laptop and a multi-week breach of
the customer database are both "security incidents," but they don't
belong in front of the same audience. The legal concept that sorts
them is **materiality** — the long-standing securities-law standard
(from *TSC Industries v. Northway*) asking whether there is a
substantial likelihood that a reasonable investor would consider the
information important to the total mix of information available. That
is a legal judgment, not a technical one, and it is made jointly by
the CISO, legal and privacy counsel, and typically a disclosure
committee — never by the security team in isolation, and never based
on technical severity alone. A highly contained incident with a huge
CVSS score attached can be immaterial; a comparatively simple incident
that exposes regulated data at scale can be highly material.

## The internal escalation chain

A GRC program that works well has this chain defined and rehearsed
*before* an incident happens, so the clock doesn't start with
confusion about who to call:

1. **Incident response team** detects and classifies severity.
2. **CISO** is notified immediately for anything above a defined
   severity threshold, and makes the first call on whether this needs
   legal involvement.
3. **Legal and privacy counsel** are brought in to assess materiality
   and any breach-notification trigger — this is the point where a
   technical incident becomes a legal and disclosure question.
4. **Disclosure committee** (where one exists — typically general
   counsel, CFO, and senior leadership) formally determines materiality
   and decides what gets disclosed, to whom, and on what timeline.
5. **Board or the relevant committee** (often audit) is briefed,
   consistent with its oversight role, and any public filing proceeds
   from there.

Defining severity thresholds in advance — which incident classes
automatically trigger a call to legal, regardless of how "under
control" the technical response feels — is what keeps this chain from
breaking down under the pressure of an actual incident.

## What the SEC's rules actually require

For U.S. public companies, the SEC adopted cybersecurity disclosure
rules in July 2023, and they now impose two distinct, real obligations:

- **Form 8-K, Item 1.05 (incident disclosure)**: once a company
  determines an incident is material, it must disclose that incident
  within **four business days** of that materiality determination —
  not four days from discovery of the incident. The filing must
  describe the incident's nature, scope, and timing, and its material
  impact or reasonably likely material impact on the company. A narrow
  delay is available only if the U.S. Attorney General determines
  immediate disclosure would pose a substantial risk to national
  security or public safety.
- **Form 10-K, Item 106 of Regulation S-K (annual disclosure)**: every
  public company must describe, annually, its processes for assessing,
  identifying, and managing material cybersecurity risks, and describe
  the board's oversight of cybersecurity risk and management's role and
  expertise in managing it.

The four-business-day clock is the detail most often misunderstood: it
runs from the materiality determination, which is exactly why having a
disclosure committee and a defined escalation chain ready in advance
matters. An organization that takes three weeks to even convene the
people who can make that determination has already put itself at risk
of a late filing before the clock has formally started.

## Two parallel obligations, not one

It's a mistake to treat SEC disclosure as "the" breach reporting
requirement. It exists alongside, not instead of, other obligations
that can apply to the same incident:

- **State data-breach notification laws** — all 50 U.S. states have
  their own statutes, triggered by compromise of personal information
  (not by a materiality judgment), typically requiring notice to
  affected individuals and sometimes a state attorney general, on
  timelines that vary by state.
- **Sector-specific rules** — HIPAA breach notification for healthcare
  entities, GLBA-related requirements for financial institutions, and
  others layered on top of the general obligations.
- **Cross-border rules** — GDPR requires notifying the relevant
  supervisory authority within 72 hours of becoming aware of a
  personal-data breach, for organizations subject to EU law, which is
  a materially different clock than the SEC's four-business-day,
  materiality-triggered standard.

The distinction worth holding onto: **breach notification laws protect
individuals** and trigger on exposure of their data; **SEC disclosure
protects investors** and triggers on materiality to the business. The
same incident can trigger both, on different clocks, assessed by
different tests — which is exactly why legal counsel, not the security
team, owns the determination of which obligations apply and when each
clock starts.

## Key terms

| Term | Meaning |
|---|---|
| Materiality | The securities-law standard: whether a reasonable investor would consider information important to the total mix of available information — a legal judgment, not a technical severity score |
| Disclosure committee | The group (often general counsel, CFO, senior leadership) that formally determines materiality and governs what gets disclosed, to whom, and when |
| Form 8-K, Item 1.05 | The SEC filing requirement for material cybersecurity incidents, due within 4 business days of the materiality determination |
| Form 10-K, Item 106 (Reg S-K) | The SEC's annual disclosure requirement covering a company's cyber risk management processes and the board's oversight role |
| State breach notification laws | Separate, PII-triggered statutes (all 50 U.S. states) requiring notice to affected individuals, distinct from and parallel to SEC materiality-based disclosure |

## Check yourself

You've completed Chapter 7 when you can explain, for a specific
incident scenario, who makes the materiality call, what the SEC's
four-business-day clock actually measures from, and name at least one
other notification obligation — state, sector, or cross-border — that
could apply to the same incident on a different timeline.
