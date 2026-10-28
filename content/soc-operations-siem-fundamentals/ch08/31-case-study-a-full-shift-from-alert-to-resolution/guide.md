# Lesson 31 — Case Study: A Full Shift, From Alert to Resolution

**Chapter 8 · Capstone: A Day in the SOC · Lesson 31 of 32**

## What you'll learn

- How Lesson 29's Alert C and Lesson 30's correlation rule become one real incident, followed
  from the first log entry to full resolution
- Which chapter of this course supplies each step of the response, in the order the SOC
  actually uses them
- What a Tier 2 investigation adds that Tier 1 triage can't, and why that division of labor
  exists at all
- How one contained incident still shows up on a dashboard metric and a leadership report days
  after it's closed

## The scenario

The rule Lesson 30 just built fires for real, three weeks after it goes live, against
R. Nguyen's accounts-payable account at Thornfield Financial Services — the exact
impossible-travel-plus-mailbox-rule pattern Lesson 29 walked through by hand. This time it runs
the full lifecycle: detection, triage, escalation, investigation, resolution, and the metrics it
leaves behind.

## Step 1: the log source (Chapter 3)

Both login events start as raw sign-in records: Windows Event Forwarding delivers the Chicago
login from the domain controller, and the mail platform's own audit log delivers the Hanoi
login over the legacy protocol that skips MFA. Neither log on its own says "attack" — they're
just two authentication records, collected and normalized into the SIEM exactly the way
Chapter 3 describes.

## Step 2: the correlation logic (Chapter 4)

Lesson 30's standing rule is what turns those two ordinary-looking records into one alert. It
groups the pair by user ID, finds them inside its sixty-minute window, calculates a travel speed
no flight could match, and raises severity further the instant the mailbox-rule-change event
lands for the same account seconds later — one composite alert instead of two separate,
lower-priority ones sitting in different parts of the queue.

## Step 3: Tier 1 triage (Chapter 5)

Jordan, the same analyst from Lesson 29, runs the validate-scope-classify process again: the
events are real, the context shows no travel request and an active forwarding rule aimed at an
external address, and every one of Chapter 5's escalation criteria is met at once. Jordan writes
a full case note and escalates to Tier 2 rather than attempting remediation — Tier 1's job is
accurate, fast judgment, not the deeper investigation that comes next.

## Step 4: Tier 2 investigation

Sam, a Tier 2 analyst, picks up the case note and goes further than a shift's worth of triage
time allows. Pulling the mail audit trail shows exactly three messages matched the forwarding
rule before anyone caught it, all containing invoice attachments from real vendors. A quick
sweep of other accounts finds no sign the same technique hit anyone else. Sam's conclusion: a
confirmed business email compromise, aimed at redirecting an upcoming vendor payment — not a
random credential test.

## Step 5: resolution

Sam disables the account and revokes its active sessions, removes the malicious forwarding
rule, and blocks the external destination address at the mail gateway. The accounts-payable
team gets a direct warning not to act on any of the three forwarded invoices until each one is
manually re-verified with the vendor by phone. The account is reset with a new password and
re-enrolled in MFA, with the legacy protocol that let the second login skip MFA disabled for
that account entirely.

## Step 6: SOAR and automation (Chapter 7)

Once Sam confirms the compromise, the repeatable part of the response runs through a SOAR
playbook instead of by hand: disable the account, revoke sessions, delete the mailbox rule, and
post a containment summary to the SOC's alert channel — the same category of playbook Lesson 28
walked through. What took roughly 40 minutes of manual steps in an earlier, similar case runs in
under three minutes here. Sam still makes every judgment call; the playbook only executes the
actions once that judgment is made.

## Step 7: what it leaves on the dashboard (Chapter 6)

The case closes with a timestamp at every stage — alert raised, Tier 1 escalation, Tier 2
resolution — which feeds directly into the dashboard metrics from Chapter 6. Detection-to-
escalation time is fast here, because the correlation rule fired on both signals at once
instead of waiting on a human to notice two separate alerts; that's a good MTTD. The fuller
investigation adds to MTTR, which is expected and correct for a case this serious. It also
becomes one line in next week's leadership report: a contained business email compromise,
caught before any payment was actually redirected.

## Key terms

| Term | Meaning |
|---|---|
| Business email compromise (BEC) | An attack that uses a compromised mailbox to redirect legitimate business communication, often toward fraudulent payments |
| Tier 2 investigation | Deeper analysis beyond Tier 1 triage — audit trails, lateral sweeps, root-cause confirmation — once a case is escalated |
| MTTD / MTTR | Mean time to detect / mean time to resolve — the two dashboard metrics a case like this directly affects |
| Containment playbook | A SOAR-automated sequence of the repeatable response actions, executed once an analyst confirms the judgment call |

## Check yourself

Step 6's SOAR playbook only runs after Sam has already decided the account is compromised. Why
does automating the response actions themselves, rather than automating that decision, keep the
analyst's judgment in the loop where it matters most?
