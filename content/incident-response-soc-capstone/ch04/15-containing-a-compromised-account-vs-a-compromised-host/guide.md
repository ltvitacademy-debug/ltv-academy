# Lesson 15 — Containing a Compromised Account vs. a Compromised Host

**Chapter 4 · Containment Strategies · Lesson 15 of 32**

## What you'll learn

- What containing a compromised *account* actually involves, and what it leaves untouched
- What containing a compromised *host* actually involves, and what it leaves untouched
- Why an attacker using a compromised account from a compromised host requires both actions, not one
- How to recognize, from an alert, when you're looking at an account problem, a host problem, or both

## Two different compromises, two different responses

So far this chapter has mostly talked about containing *systems*. But a huge share of real incidents
start with a compromised **identity**, not a compromised machine — a phished password, a stolen
session token, reused credentials from an unrelated breach. Containing an account and containing a
host are genuinely different actions, aimed at different problems, and a real incident very often
needs both at the same time.

**Account containment** means disabling the compromised account, forcing a password reset, and —
critically — revoking any active sessions or tokens, not just changing the password. A stolen session
token or an already-authenticated session can keep working even after a password reset, which is why
session/token revocation is its own separate step, not an automatic side effect of changing a
password. **Host containment** is what the EDR lesson covered: isolating the machine from the network
so it can't talk to anything else while it's live and still under investigation.

## Why neither one alone is enough

Here's the scenario that makes the distinction matter: an attacker who has **a compromised account
being used from a compromised host**. If the analyst only disables the account, the attacker still
has a foothold on the infected machine — malware or a backdoor that can harvest a *different* set of
credentials the moment the first account stops working, or move laterally using whatever access the
host itself still has. If the analyst only isolates the host, the attacker can still use the stolen
credentials to log in from somewhere else entirely — their own device, a different compromised
machine, or, for a cloud or SaaS account, simply any browser anywhere on the internet, since that
account was never tied to the one infected laptop in the first place. Containing only half the problem
leaves the other half of the attacker's access completely intact.

## Reading the alert to know which one you're facing

The signal usually tells you which containment this is. A sign-in from an impossible or unfamiliar
location, an MFA prompt the real user never requested, or a login at an hour nobody on that account
normally works — that's an account problem, pointing at credential theft. Suspicious process
execution, a beacon to a command-and-control domain, or EDR flagging malware on a specific machine —
that's a host problem. When the same incident shows *both* signals tied together — a suspicious login
followed immediately by suspicious activity from the device that login came from — that's the signal
that both containment actions are needed, together, right now.

## Concrete example: the phishing email that became both

A user clicks a phishing link and malware lands on their company laptop. From that infected laptop,
the attacker harvests the user's cached Office 365 credentials and logs into their cloud mailbox
directly — a different system entirely from the laptop itself. The SOC needs to do two things at once,
not sequentially: **disable the Office 365 account and revoke its active sessions and tokens**, so the
attacker can't keep using that identity from anywhere, cloud or otherwise; and **isolate the infected
laptop via EDR**, so the malware that stole those credentials in the first place can't harvest the
*next* account or move to another machine on the network. Doing only the account containment leaves
an active backdoor running on company hardware. Doing only the host containment leaves a valid, active
cloud identity in an attacker's hands, reachable from anywhere in the world.

## Key terms

| Term | Meaning |
|---|---|
| Account containment | Disabling an account, resetting its password, and revoking its active sessions/tokens |
| Host containment | Isolating a compromised machine from the network while leaving it running for investigation |
| Session/token revocation | Invalidating an already-authenticated session so a stolen token stops working, not just the password |
| Credential reuse / lateral path | The route an attacker keeps if only one of account or host containment is performed, not both |

## Check yourself

An attacker phished a user's password and is using it to log into a cloud mailbox from a company
laptop that's also running malware. Why does disabling only the account, without also isolating the
laptop, leave the incident only half-contained?
