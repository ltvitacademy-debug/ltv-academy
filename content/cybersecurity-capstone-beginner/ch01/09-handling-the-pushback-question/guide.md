# Lesson 9 — Handling the One Pushback Question

**Chapter 1 · Beginner Capstone: Baseline Security Hardening and the First Detection Rule · Lesson 9 of 10**

## What you'll learn

- Why a good presentation still earns at least one hard question, and why that's a sign the
  meeting went well, not badly
- How to answer a specific, reasonable pushback with evidence instead of reassurance
- Why "I already checked" is a stronger answer than "it should be fine"

## The question Dale actually asks

Lesson 8's presentation lands well — but partway through, Dale raises the one question Mara
should have expected:

> "This all sounds good, but HRU-APP01 is the server our metering vendor remotely connects to
> once a month to pull usage data for billing reconciliation. Did any of this touch that access?
> I don't want next month's billing run to fail because of a firewall rule."

This is exactly the kind of pushback a real stakeholder raises — not hostile, not uninformed, but
a specific, legitimate business concern Mara needs to answer with evidence, not reassurance. A
manager who approves security work without asking a question like this isn't paying close enough
attention; the fact that Dale asks is a sign the presentation earned his real engagement.

## Why "it should be fine" isn't an answer

The worst way to respond to this question is "it should be fine" or "I don't think we touched
that." Dale isn't asking for Mara's confidence — he's asking whether she *knows*, specifically,
because a failed billing reconciliation run has a real business cost that a hardening project
doesn't get credit for preventing. The right answer has to be grounded in something Mara actually
checked, not something she assumes.

## The actual answer, grounded in Lesson 3's work

Mara can answer this credibly because of a specific decision made back in Lesson 3: `HRU-APP01`'s
Windows Firewall rules were scoped to the **Domain profile only**, restricting inbound access to
Hartwell's management subnet — but the vendor's monthly connection doesn't come in through that
path at all. It authenticates through a separate, pre-existing vendor VPN tunnel that was never
part of this project's checklist, and Mara confirms this concretely rather than guessing:

> "I checked specifically — the vendor's monthly connection comes in through the existing VPN
> tunnel, not through any of the firewall rules I touched on HRU-APP01. I also pulled the VPN
> connection logs from the last billing cycle before this meeting to confirm that path still
> works exactly as it did before. The only firewall changes were to the Domain profile's SMB and
> RDP rules, scoped to our own management subnet — the vendor's traffic was never affected by
> either one."

This answer works because it's specific (names the exact path the vendor uses), checkable (VPN
logs, not a feeling), and scoped (explains exactly what did and didn't change) — not because it's
confident-sounding.

## What if the answer had actually been "yes, it might"

Not every pushback has a clean "no impact" answer, and pretending otherwise is worse than
admitting a real tradeoff. If the vendor's access genuinely had run through a rule Mara changed,
the credible answer would instead be: "Yes, that path was affected — here's exactly what changed,
here's how I'd test it before the next billing cycle, and here's the rollback if it breaks." Dale
isn't looking for zero risk; he's looking for someone who already knows where the risk is and has
a plan for it, instead of being surprised by it later.

## Key terms

| Term | Meaning |
|---|---|
| Reasonable pushback | A specific, legitimate business concern raised about proposed changes, not an objection to the idea itself |
| Grounded answer | A response backed by something specifically checked, like a log or a scoped rule, rather than a general assurance |
| Scoped answer | A response that names exactly what did and didn't change, rather than a blanket reassurance |

## Lab

Write out, word for word, the answer Mara would give if the vendor's access *had* been affected
by the Domain-profile firewall change — following the "yes, here's what changed, here's the test,
here's the rollback" structure from this lesson.

## Check yourself

You're ready for Lesson 10 when you can explain why "I checked specifically" is a stronger answer
than "it should be fine," and why the fact that Dale asked a hard question is a sign the
presentation succeeded rather than a sign something went wrong.
