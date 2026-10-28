# Lesson 15 — Rule Tuning and Reducing False Positives

**Chapter 4 · Correlation Rules & Alert Logic · Lesson 15 of 32**

## What you'll learn

- Why a brand-new correlation rule almost always fires too often in its first days or weeks
- What tuning actually means in practice: adjusting thresholds and adding exclusions
- A real example of a legitimate exclusion — a backup service account that fails logins overnight
- Why an untuned rule causes real alert fatigue, and why that's a genuine security risk, not just an annoyance

## New rules are noisy by default

The brute-force rule from Lesson 14 looks solid on paper, but deploy it exactly as written against a real production environment and it will almost certainly fire more than expected in its first days live. Real environments are messier than the clean example used to design the rule: service accounts retry connections automatically, scheduled jobs reauthenticate on their own schedules, and users genuinely mistype passwords in bursts right before a lockout. None of that is malicious, but a threshold-and-time-window rule built from a textbook example can't tell the difference yet — it just counts events. **Tuning** is the process of teaching the rule that difference.

## What tuning actually means

Tuning a correlation rule usually comes down to two kinds of changes:

- **Adjusting thresholds** — if 5 failures in 10 minutes turns out to flag dozens of ordinary lockout situations a day, raising it to 8 failures in 5 minutes (a tighter, more specific pattern) can cut that noise sharply without missing real brute-force attempts, which tend to generate many more failures much faster than a person fumbling a password.
- **Adding exclusions** — explicitly telling the rule to ignore specific, known-benign sources. A real, common example: a backup service account that connects to dozens of servers overnight and occasionally fails a logon against one of them because of an expired credential on just that one server — a pattern that looks exactly like the rule's trigger condition but is completely expected, every night, from that one account. Adding that account to an exclusion list (sometimes called an allowlist or a suppression list) stops the rule from firing on behavior the SOC has already investigated and confirmed is benign.

## Why untuned rules cause real alert fatigue

**Alert fatigue** isn't just an inconvenience — it's a genuine security risk. When a correlation rule fires dozens of times a day for the same known-benign backup account, analysts learn, correctly, that most of those alerts from that rule aren't worth a deep investigation. The real danger is what happens next: that learned habit doesn't turn off selectively. An analyst who has dismissed the same false positive forty times is measurably more likely to give the forty-first alert from that rule a quick glance instead of a real investigation — even on the one night it's an actual attacker instead of the backup job. Tuning isn't a nice-to-have cleanup step; it's what keeps a rule's alerts worth an analyst's full attention.

## Tuning is ongoing, not one-time

A rule that's well-tuned today can get noisy again later — a new service account gets deployed, a scheduled task changes its timing, a legitimate business process starts behaving differently. SOCs typically revisit a rule's false-positive rate on a recurring basis (often monthly, or whenever an analyst flags the same exclusion request more than once) rather than tuning a rule once at launch and never touching it again.

## Key terms

| Term | Meaning |
|---|---|
| Tuning | Adjusting a rule's thresholds or adding exclusions so it fires only on behavior worth investigating |
| Exclusion / allowlist | A specific, confirmed-benign source explicitly told not to trigger a rule |
| False positive | An alert that fires on legitimate, non-malicious activity |
| Alert fatigue | The real risk that repeated false positives from one rule make analysts under-investigate its future alerts, including true ones |

## Check yourself

Without looking back: why is adding an exclusion for the backup service account a better fix than just raising the rule's threshold for everyone?
