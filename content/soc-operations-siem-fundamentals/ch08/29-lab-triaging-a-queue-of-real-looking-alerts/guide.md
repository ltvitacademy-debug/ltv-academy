# Lesson 29 — Lab: Triaging a Queue of Real-Looking Alerts

**Chapter 8 · Capstone: A Day in the SOC · Lesson 29 of 32**

## What you'll learn

- How to run Chapter 5's validate → scope → classify triage process against three alerts that
  actually look alike at first glance
- Why the same "new location" signal can be a false positive, a benign true positive, and the
  first clue in a real incident, depending entirely on what the analyst checks next
- How a documented change ticket or an approved travel request closes an alert faster than
  guesswork ever could
- What specifically separates "close this out" from "escalate this now," using Chapter 5's
  actual escalation criteria

## The scenario

Jordan is two hours into the Friday overnight shift at Thornfield Financial Services, a
mid-sized regional bank whose SOC runs the 24x7 rotation from Chapter 1. Three alerts land in
the queue within ten minutes of each other, and all three involve a login or an account doing
something slightly unusual. None of them say "false positive" or "incident" on the label —
that's Jordan's job to work out, using nothing but the triage process from Chapter 5.

## Alert A: repeated failed logins, svc-backup01

**Validate.** The SIEM's Windows sign-in correlation rule fired on nine failed logon events
(Event ID 4625) for the nightly backup service account, forwarded straight from the file server
through Windows Event Forwarding — Chapter 3's collection pipeline, working exactly as designed.
The events are real; nothing was dropped or mis-parsed on the way in.

**Scope.** Jordan pulls the account's recent activity and cross-references the SOC's change
calendar. A password-rotation ticket for `svc-backup01` closed 22 minutes before the first
failure, and the backup job's stored credential wasn't updated until the next scheduled sync —
a known, self-inflicted gap, not an attacker guessing passwords.

**Classify.** **False positive, root cause documented.** Jordan closes the alert with a case
note referencing the change ticket number, and flags the credential-sync timing gap for the
backup job — the kind of finding that quietly makes next month's queue a little shorter.

## Alert B: new-country login, Director of Sales

**Validate.** A geo-anomaly rule flags a login for M. Alvarez's account from Lisbon, Portugal —
a country this account has never logged in from. The login itself succeeded with MFA approved
on the registered device, so there's no sign of a stolen credential at this stage.

**Scope.** Jordan checks the travel request system: Alvarez has an approved trip to a Lisbon
conference that started that morning. The device matches the corporate asset tag, and there's
no mailbox rule change, download spike, or second login from anywhere else on the account.

**Classify.** **True positive, benign.** The alert correctly caught a real new-location login —
it just wasn't an attacker. Jordan closes it as validated user activity and adds a time-boxed
travel exception so the same trip doesn't re-fire the rule for the rest of the week.

## Alert C: impossible travel plus a mailbox rule change

**Validate.** The same account, an accounts-payable clerk named R. Nguyen, logs in from Chicago
at 09:02 local time — then again from Hanoi, Vietnam at 09:41 local, roughly 8,000 miles and 39
minutes apart. The Hanoi session authenticated over a legacy mail protocol that doesn't enforce
MFA, which is exactly how an attacker with only a stolen password gets past an MFA policy that
otherwise looks solid.

**Scope.** Within two minutes of the Hanoi login, a hidden inbox rule appears, silently
forwarding every message containing "invoice" or "wire" to an external address. Chapter 4's
correlation logic is what ties these into one alert in the first place — a login anomaly alone,
or a mailbox rule change alone, would each be a lower-priority single event; together, fired by
the same composite rule, they're a different alert entirely.

**Classify.** **Escalate now.** This meets every one of Chapter 5's escalation criteria at
once: a confirmed compromise indicator, financial data at risk, and a live mailbox rule still
actively forwarding mail. Jordan writes a full case note under Chapter 5's format and hands it
to Tier 2 rather than attempting remediation alone — exactly the judgment call Lesson 31 picks
up from here.

## Key terms

| Term | Meaning |
|---|---|
| Validate | Confirming an alert's underlying events are real and accurately parsed, before judging intent |
| Scope | Gathering the surrounding context — tickets, calendars, related events — needed to classify an alert correctly |
| Benign true positive | An alert that correctly detected a real event, which turns out to be legitimate rather than malicious |
| Legacy authentication bypass | An older protocol that authenticates with just a password, skipping an MFA policy enforced elsewhere |

## Check yourself

Alert B and Alert C both start with a "new location" signal, and both are true positives — the
login really happened. What specific piece of scoping information is the only thing that
separates Jordan closing one as benign and escalating the other immediately?
