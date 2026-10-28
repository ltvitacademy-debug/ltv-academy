# Lesson 18 — Validating, Scoping, and Escalating an Alert

**Chapter 5 · Alert Triage & Investigation Workflow · Lesson 18 of 32**

## What you'll learn

- How to validate an alert — confirming the underlying data actually supports it instead of trusting the alert's label
- How to scope an incident once it's confirmed — figuring out what else might be affected
- The real criteria that decide whether an alert needs to go to Tier 2
- How validation and scoping work together on a single realistic alert, start to finish

## Validation: trust the data, not the label

A correlation rule's alert text is a summary, not a verdict. It was written by whoever built the
rule, based on what that rule is supposed to detect — it is not a guarantee that the activity is
actually malicious, or even that it happened the way the rule assumed. **Validation** is the step
where an analyst checks the raw data the alert is based on: the actual log lines, the raw
authentication event, the actual process execution record, the actual network connection — and
confirms the alert's claim is really true before acting on it.

Skipping validation is how both failure modes from Lesson 17 happen. An analyst who trusts an
alert's label at face value might close out a real true positive because the label sounded routine,
or escalate a false positive because the label sounded scary. Validation is the only way to
actually know which of the three outcomes — true positive, false positive, or benign true positive
— an alert really is.

## Scoping: what else is affected

Once an alert is validated as something real, the next question isn't "what do I do about this
alert" — it's "**how far does this go**." **Scoping** means figuring out what else might be
touched by the same activity: other hosts the same account logged into, other accounts that logged
in from the same unusual source, other machines that reached out to the same suspicious external
address, or any sign the activity has already moved beyond the one host or account the original
alert named.

Scoping matters because the first alert is rarely the full picture. A single validated alert about
one compromised account can represent a problem that's already touched five other accounts by the
time anyone looks at it — and an analyst who treats the alert as a one-host, one-account problem
without checking will miss that spread entirely.

## Escalation criteria: when this goes to Tier 2

Not every validated alert needs to go to Tier 2 — plenty get handled and closed at Tier 1. An alert
genuinely needs escalation when any of three things is true: the activity is **confirmed
malicious** and needs a response beyond what Tier 1 is authorized to take on its own; the **scope
is unclear** and the spread can't be fully determined with the tools and access Tier 1 has; or the
situation **needs deeper tools** — forensic analysis, memory capture, or cross-system correlation
that sits outside Tier 1's normal toolset. An alert that's validated as malicious but fully scoped
and within Tier 1's authority to contain doesn't need to go anywhere — it gets handled and
documented at Tier 1.

## A worked example: validation and scoping together

A SIEM fires: "suspicious login — new geographic location." Validation starts with the raw
authentication log: it confirms a real login did occur, from the IP and location the alert names,
at the stated time, and that it succeeded on the first MFA prompt rather than after repeated
failures — all details the summary alert never included.

Scoping comes next. The analyst checks whether any other account logged in from that same IP range
in the surrounding hours (none did), and whether the same account made any further unusual activity
after that login — and finds the account then attempted to access a file share it has never touched
before. That one finding changes everything: the login alone looked containable, but an unfamiliar
login immediately followed by access to a sensitive, previously-untouched resource meets the
"confirmed malicious, needs a broader response" bar. This alert escalates to Tier 2 — not because
the original login alert looked scary, but because validation and scoping, together, turned up
something the Tier 1 toolset can't fully run down alone.

## Key terms

| Term | Meaning |
|---|---|
| Validation | Checking an alert's underlying raw data to confirm the alert's claim is actually true |
| Scoping | Determining what else — hosts, accounts, systems — might be affected by the same activity |
| Escalation | Handing an alert to Tier 2 because it's confirmed malicious, unclear in scope, or needs deeper tools |
| Raw data | The actual log line, event, or record an alert is based on, as opposed to the alert's summary text |

## Check yourself

An alert is validated as real and malicious, but the activity is confined to one host and is fully
within what Tier 1 is authorized to contain. Does this alert need to escalate to Tier 2? Why or why
not?
