# Lesson 28 — Why Honeypot Alerts Are High-Fidelity Signals

**Chapter 7 · Honeypots & Deception Technology · Lesson 28 of 32**

## What you'll learn

- Why a honeypot or deception alert carries an unusually low false-positive rate, compared to a firewall or IDS alert
- The real reason for that difference: a firewall or IDS judges traffic that could legitimately be either benign or malicious, while a honeypot has no legitimate traffic at all
- Why that near-perfect precision makes honeypot alerts worth building a response process around, even though they only catch attackers who happen to stumble onto them
- How to position honeypots and deception technology as one layer in an overall detection strategy, not a complete replacement for the rest of this course's tools

## Most alerts are judgment calls

A firewall rule or an IDS signature almost always has to make a judgment call, because the traffic it's evaluating could legitimately be either benign or malicious. A spike in outbound connections might be a backup job or data exfiltration. A login from an unusual location might be an employee traveling or a stolen credential. An IDS signature matching unusual command-line activity might be a legitimate admin script or an attacker's reconnaissance. Every one of those alerts requires a human analyst to add context — who, when, from where, does this match a known pattern — before deciding whether it's actually a problem. That judgment work is exactly why SOCs drown in alert volume: most of what fires isn't malicious, it just *looks* ambiguous enough to need a second look.

## Why a honeypot alert skips that judgment entirely

A honeypot or deception alert doesn't have that ambiguity to resolve, because of the one property covered back in Lesson 25: **nothing legitimate should ever touch it.** A firewall alert might be legitimate traffic that looks suspicious. A honeypot alert, by definition, is traffic that has no legitimate explanation at all, because no real user, application, or process was ever configured to generate it. There's no "maybe it's just a backup job" explanation available, because the honeypot was never part of any backup job, any user's workflow, or any application's configuration in the first place.

That's what makes these alerts **high-fidelity**: an extremely low false-positive rate, because the alert isn't asking "does this look bad?" — it's reporting a fact that is, by construction, already bad. When a honeypot or honeytoken fires, an analyst doesn't need to spend time ruling out ten innocent explanations first, the way they would for a firewall or IDS alert. They can treat the alert as true and move straight to response.

## The real limitation, and why it's still worth it

Honeypots and deception technology have a real limitation that's worth stating plainly: **they only catch attackers who happen to interact with them.** An attacker who never touches a decoy share, never tries the honeytoken credential, and never scans the segment the honeypot sits on will walk right past it, undetected, no matter how well-designed the deception is. Unlike an IDS watching all traffic or an EDR agent watching every endpoint, a honeypot only ever sees what comes to it.

That limitation is real, but it doesn't make deception technology less valuable — it just defines what role it plays. Deception technology isn't meant to be comprehensive coverage; it's meant to supply a small number of alerts an analyst can trust completely, specifically for the kind of internal reconnaissance and lateral movement that other tools often miss or bury in noise. A single confirmed honeypot hit can be worth more than a thousand IDS alerts that each still need investigation, precisely because the honeypot hit doesn't need investigating to be believed — only to be acted on.

## Concrete example

A SOC that handles ten thousand firewall and IDS alerts a day has to triage nearly all of them, because most require context to separate the real threats from the noise. That same SOC's honeypot infrastructure fires maybe twice a month — and every single time it fires, the team drops what they're doing and investigates immediately, because they already know, before looking at anything else, that the alert is real. The honeypot's value was never its volume. It was the fact that when it finally speaks, it's always telling the truth.

## Key terms

| Term | Meaning |
|---|---|
| False positive | An alert that fires on activity which turns out to be legitimate, not malicious |
| High-fidelity alert | An alert with an extremely low false-positive rate — when it fires, it can be trusted without extensive investigation |
| Signal-to-noise ratio | The proportion of meaningful alerts compared to the total alert volume a SOC has to review |
| Coverage limitation | A honeypot only detects activity that actually reaches it — it provides no visibility into traffic that never touches it |

## Check yourself

A SOC manager says, "Our honeypot only fired twice last year, so it's not worth the effort." What's the flaw in that reasoning, given what makes a honeypot alert different from a typical firewall alert?
