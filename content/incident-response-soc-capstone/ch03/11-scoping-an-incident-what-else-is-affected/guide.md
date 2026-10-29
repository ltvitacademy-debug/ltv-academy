# Lesson 11 — Scoping an Incident: What Else Is Affected

**Chapter 3 · Detection & Analysis Deep Dive · Lesson 11 of 32**

## What you'll learn

- What **scoping** actually means once an attacker's entry point and timeline are understood
- The three things a scoping check systematically looks for: other accounts, other hosts, and
  exfiltrated data
- Why **incomplete scoping** is one of the most common real IR failure modes
- How to recognize the specific pattern where a team fixes what they found but misses a second
  foothold

## Scoping is a systematic check, not a guess

Lesson 10 reconstructed the timeline: phishing email, initial access, lateral movement, data
staging. Once that sequence is understood, the natural next question is scoping — systematically
checking everything else the attacker might have touched, beyond the entities that happened to
show up in the timeline so far. Scoping isn't a vague "did they do more damage?" question. It
breaks down into three concrete checks: what other accounts did the attacker access using the
credentials or sessions they already had, what other hosts did they connect to beyond the ones
already identified, and did any data actually leave the environment.

## A concrete example: following the access further

Take the account from Lesson 10's timeline — compromised at 9:02am, used for lateral movement to
a file server at 9:15am. Scoping means checking the identity provider's sign-in logs for that same
account across the full incident window, not just the one sign-in already found: did it
authenticate to any other systems? Say that check turns up a second sign-in at 9:28am to a
different application using single sign-on, one nobody had flagged yet. That's a second host the
attacker reached using the same stolen session — one the original timeline, built from the first
set of entities, never surfaced on its own. Scoping is the deliberate act of going back and
checking for exactly that kind of second connection.

## Why incomplete scoping is a common real failure

A very common IR failure pattern is fixing the problem that was found and declaring the incident
closed, without checking whether the attacker established a second foothold elsewhere. A team that
resets the compromised account's password and rebuilds the file server from Lesson 10's timeline
has fixed what they found. If that second sign-in to the SSO application at 9:28am never gets
checked, the attacker may still hold a valid session or a persistence mechanism on that second
system — and the "resolved" incident reopens days later, except now it looks like a brand-new
case instead of the same attacker returning through the foothold nobody scoped.

## What scoping has to confirm before closing

A properly scoped incident can answer three questions with evidence, not assumption: every account
the attacker's sessions or credentials touched has been identified and checked; every host the
attacker connected to, directly or through lateral movement, has been identified and checked; and
any data the attacker could have accessed has been checked for signs of actual exfiltration, not
just potential exposure. Only once those three checks are complete does the incident's real scope
match what actually happened — which is also exactly what Lesson 12's severity classification and
Chapter 4's containment decisions depend on being accurate.

## Key terms

| Term | Meaning |
|---|---|
| Scoping | Systematically checking everything an attacker may have touched beyond what's already found |
| Second foothold | A persistence point or additional compromised system an attacker holds beyond the one already remediated |
| Lateral reach | The full set of accounts and hosts an attacker's stolen credentials or sessions could access |
| Exfiltration check | Confirming whether data the attacker could access actually left the environment |

## Check yourself

A team resets a compromised password and rebuilds one server, then closes the incident. What
specific check did they skip, and why might the incident reopen days later as a result?
