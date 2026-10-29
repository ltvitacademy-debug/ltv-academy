# Lesson 1 — Rules of Engagement, and Why Authorization Comes Before Anything Else

**Chapter 1 · Ethical Hacking Fundamentals and Methodology · Lesson 1 of 4**

## What you'll learn

- Why the exact same techniques you'll learn in this course are either a
  paid professional service or a federal crime, with no middle ground
- What actually counts as "authorization" — and why a verbal okay or a
  friendly email thread doesn't meet that bar
- What a real Rules of Engagement (ROE) document contains: testing
  windows, in-scope/out-of-scope systems, emergency contacts, and an
  escalation procedure for critical findings
- Why every lesson in this course assumes a signed ROE already exists

## A signature is the entire difference

Port scanning a network, brute-forcing a login, exploiting an unpatched
server — every technique this course teaches is also, word for word, a
description of a crime. In the United States, the **Computer Fraud and
Abuse Act (CFAA)** makes it a federal offense to access a "protected
computer" without authorization, full stop. It does not have an exception
for good intentions, and it does not require that you caused damage. The
UK's **Computer Misuse Act** works the same way. Intent to help doesn't
matter to the statute; authorization is the only thing that matters.

That means the single most important skill in this entire course isn't a
tool or a technique — it's understanding that **written, signed
authorization is what converts a crime into a professional engagement**.
Everything else in this course — Nmap scans, Metasploit modules, password
attacks, web app exploitation — is taught strictly for use inside a
scoped, authorized, consensual penetration test. Never anywhere else,
never on a system you don't have explicit written permission to test.

## What "authorization" actually has to look like

A Slack message from a developer saying "yeah go ahead and test our app"
is not authorization. Neither is a verbal okay from someone in a hallway,
or an implied green light because a client hired your firm generally. Real
authorization is a **signed contract plus a Rules of Engagement (ROE)
document**, agreed to in writing by someone who actually has the legal
authority to grant it — typically a system owner, a CISO, or a named
executive sponsor, not just whichever employee happens to be your point of
contact.

That authority question matters more than it sounds. If you're testing a
client's cloud environment, the person signing needs to actually own that
environment — not a marketing contact who invited you in. If the
in-scope application runs on a third party's infrastructure (a SaaS
vendor, a cloud reseller, a managed hosting provider), your client's
signature alone doesn't authorize testing someone else's systems — you
need separate, explicit authorization from whoever owns *that*
infrastructure too.

## Anatomy of a real Rules of Engagement document

A professional ROE, consistent with how the Penetration Testing Execution
Standard (PTES) treats pre-engagement interactions, spells out:

```
RULES OF ENGAGEMENT — key sections

1. Testing window
   Start/end date and time, time zone, and any blackout
   periods (e.g. no testing during month-end financial close)

2. In-scope systems
   Exact IP ranges, hostnames, domains, and applications —
   named explicitly, not "the whole network"

3. Out-of-scope systems
   Explicit exclusions: production payment systems, medical
   devices, third-party-hosted services without separate sign-off

4. Permitted and prohibited techniques
   e.g. no denial-of-service testing, no social engineering of
   named individuals, no modifying or exfiltrating real production data

5. Emergency contacts
   Named individuals, reachable by phone, for the full
   duration of the testing window

6. Escalation procedure
   What the tester does immediately upon finding an active
   compromise or a trivially exploitable critical vulnerability —
   before the final report, not instead of it
```

## Why the escalation procedure earns its own line item

Two things go wrong without one. First, a tester who finds a critical,
actively exploitable flaw — say, a web server already compromised by
someone else — needs a predefined path to report it *immediately*, not
bury it in a report delivered three weeks later. Second, a client's own
incident response team may well detect the authorized test's traffic and
treat it as a real attack. The emergency contact is who confirms, in real
time, "that's the pentest we hired — stand down," so a lawful engagement
doesn't accidentally trigger its own incident response.

## Key terms

| Term | Meaning |
|---|---|
| Authorization | Signed, written permission from someone with actual legal authority over the systems being tested — the one thing separating a pentest from a crime |
| CFAA / Computer Misuse Act | Real statutes (US and UK respectively) criminalizing unauthorized computer access regardless of intent or damage caused |
| Rules of Engagement (ROE) | The signed document defining testing windows, in-scope/out-of-scope systems, permitted techniques, emergency contacts, and escalation procedure |
| Escalation procedure | The predefined process for immediately reporting an active compromise or critical finding discovered mid-engagement |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does
the CFAA make "I didn't cause any damage" an irrelevant defense, and what
two real-world problems does a documented escalation procedure actually
prevent?
