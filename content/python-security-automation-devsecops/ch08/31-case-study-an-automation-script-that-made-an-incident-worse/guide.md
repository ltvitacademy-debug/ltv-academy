# Lesson 31 — Case Study: An Automation Script That Made an Incident Worse

**Chapter 8 · Capstone: An Automated Detection-to-Response Pipeline · Lesson 31 of 32**

## What you'll learn

- Why an automated containment script's biggest risk is usually a
  correlation query that's too broad, not a syntax bug
- How a single shared signal — like a VPN exit IP used by dozens of
  legitimate employees — can turn one real compromise into a mass lockout
- Why a dry-run default, a hard blast-radius cap, and a human approval gate
  are three *separate* guardrails, not one guardrail described three ways
- How this scenario would have gone differently if it had used the pattern
  Lesson 29 built instead

This lesson is an illustrative scenario for this course, not a report of a
real company or a real incident. Caldera Finance is fictional; the pattern
of mistake it demonstrates is a common and well-documented one in security
automation.

## The scenario

Caldera Finance, a mid-size fintech company, built its own automated
containment script roughly a year before anyone there had seen anything
like Chapter 3's approval-gate lesson. Their SOC had one real, specific
compromise to deal with: an attacker had obtained one employee's
credentials and was signing in from a residential IP address nowhere near
the company's offices. The response the team wanted was simple — find any
account showing suspicious sign-in activity "from that same source," and
disable it automatically the moment Sentinel raised a High-severity alert
on it, with no human in the loop. Speed, in their reasoning, mattered more
than review, because every extra minute was an extra minute of attacker
access.

## The query that was too broad

The automation rule's correlation logic looked for accounts with sign-ins
sharing a source IP within the active incident's time window:

```kusto
SigninLogs
| where TimeGenerated > ago(1h)
| where IPAddress == "{incident_ip}"
| project UserPrincipalName
```

That query is correct as written. The mistake was upstream of it: the
`{incident_ip}` value the automation rule filled in wasn't the attacker's
actual residential IP — it was the IP address Sentinel's alert happened to
list as "most recent known sign-in source" for the compromised account,
which, because that employee had connected through the corporate VPN
earlier that same hour, was the VPN's shared public exit address. Thirty-
eight other Caldera employees, working remotely that afternoon, were
routing through that exact same exit IP for entirely unrelated, legitimate
work.

## What happened next

The automation rule fired, matched all thirty-nine accounts against the
query, and disabled every one of them — not because the script had a bug
in the sense of throwing an exception, but because it did precisely what it
was told, against a signal that meant something different than the person
who wrote the rule assumed it meant. Thirty-eight employees were locked out
mid-shift, several in the middle of handling their own customer calls, with
no warning and no obvious reason visible to them. The SOC spent the next
two hours fielding confused help-desk tickets and manually re-enabling
accounts one at a time, instead of focusing on the one account that was
actually compromised — the real incident got *slower* to resolve, not
faster, because the team investigating it was also the team un-breaking
thirty-eight unrelated logins.

## What guardrail would have prevented it

Three separate, independent guardrails each would have caught this on
their own — which is itself worth noticing, because a team that had built
only one of them might still have shipped this bug:

- **A dry-run default.** If the automation rule's first real-world
  execution had logged "would disable these 39 accounts" instead of
  disabling them, the absurdity of the number would have been caught by
  the very first human who glanced at the log, before any account was
  touched.
- **A scoped blast-radius cap.** A hard rule like "a single automated
  containment action may affect at most one account per execution, full
  stop" would have made the query's mistake harmless — the rule would have
  either failed loudly on thirty-nine matches or only ever acted on one,
  depending on how the cap was implemented, but either way nobody would
  have lost access by surprise.
- **A human approval gate before the action executes**, exactly the
  pattern `execute_containment()` enforced in Lesson 29 with its
  `approved_by` parameter. A human reviewing "disable 39 accounts" before
  it ran would almost certainly have asked the one question that mattered —
  "why thirty-nine?" — and caught the shared-VPN-IP mistake in seconds.

None of these three guardrails fixes the underlying correlation logic. All
three would have stopped the bad logic from causing real damage anyway —
which is exactly the point. Good automation doesn't depend on every query
being written perfectly the first time; it depends on bad queries failing
safely instead of failing wide.

## Key terms

| Term | Meaning |
|---|---|
| Shared signal | An attribute — like a VPN exit IP — that legitimately applies to many unrelated accounts, making it a poor sole criterion for a containment match |
| Blast-radius cap | A hard limit on how many accounts or resources a single automated action may affect, independent of how the matching logic behaves |
| Failing safely vs. failing wide | A guardrail's job: a flawed rule should do nothing or little, not something large and irreversible |
| Correlation logic | The rule that decides which accounts, resources, or findings a containment action applies to — the actual source of risk in most automation incidents |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: name the
three guardrails from this case study, and explain why Caldera Finance would
have avoided the lockout even if only one of the three — any one — had been
in place that afternoon.
