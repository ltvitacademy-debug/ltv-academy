# Lesson 19 — Defender for Office 365 and Email Threat Protection

**Chapter 5 · Microsoft Defender XDR · Lesson 19 of 32**

## What you'll learn

- What Defender for Office 365 actually protects, and where it fits as one of Defender XDR's four workloads
- How Safe Links and Safe Attachments defend against malicious links and attachments
- How anti-phishing and impersonation detection catch credential phishing and Business Email Compromise, which often involve no malware or link at all
- Why email is such a common entry point for the kind of multi-product attack chain Lesson 17 described

## What Defender for Office 365 actually covers

**Defender for Office 365 (MDO)** is the workload from Lesson 17's list that protects email and
collaboration tools — Exchange Online, SharePoint, OneDrive, and Teams. It exists because email
remains the most common way an attacker gets an initial foothold: a convincing message is
cheaper to send than an exploit is to build, and it only has to work once.

## Safe Links: checking a URL again at click-time

A malicious link doesn't have to be malicious the moment it arrives. An attacker can send a link
to a page that's clean when the email lands in an inbox, then weaponize that page an hour later
once the email has already passed every filter. **Safe Links** defends against exactly that: it
rewrites URLs inside email, Office documents, and Teams messages, and re-checks the destination
against current threat intelligence **at the moment someone clicks it** — not just once at
delivery. A link that was safe on Monday can be blocked on Tuesday without a new email ever
being sent.

## Safe Attachments: detonating before delivering

**Safe Attachments** targets the other classic vector: a malicious file riding along with a
normal-looking email. Rather than scanning an attachment statically and hoping a signature
matches, Safe Attachments opens it in an isolated sandbox environment and watches what it
actually does — a technique often called detonation — before the message is delivered to the
inbox at all. A macro-laden document that only drops its payload when opened behaves the same
way in the sandbox as it would on a real machine, which is exactly what gets it caught.

## Anti-phishing policies and impersonation: no link or attachment required

Not every email attack needs a malicious link or file. **Business Email Compromise (BEC)** is a
pure social-engineering attack: an email that impersonates an executive or a known vendor,
asking someone in finance to redirect a wire transfer or buy gift cards — no malware, no link,
nothing for a sandbox to detonate. Defender for Office 365's **anti-phishing policies** catch
this differently, using impersonation detection and **mailbox intelligence** (learning a given
mailbox's normal senders and patterns) to flag a message that claims to be from the CFO but
doesn't match how the CFO's real mail actually behaves.

## Why email matters to the bigger picture

Go back to Lesson 17's attack chain: it started with a phishing email. That's not a coincidence
— email is the most common opening move precisely because Safe Links, Safe Attachments, and
anti-phishing policies each defend against a different shape of email attack, and an attacker
only needs one of those defenses to fail once to get a foothold that Defender for Identity and
Defender for Endpoint then have to catch further downstream.

## Key terms

| Term | Meaning |
|---|---|
| Defender for Office 365 (MDO) | The Defender XDR workload protecting email and collaboration tools (Exchange Online, SharePoint, OneDrive, Teams) |
| Safe Links | Rewrites URLs and re-checks them against threat intelligence at click-time, not just at delivery |
| Safe Attachments | Detonates attachments in an isolated sandbox before delivering the message |
| Anti-phishing policies | Impersonation detection and mailbox intelligence that flag phishing without relying on a link or attachment |
| Business Email Compromise (BEC) | A pure social-engineering email attack impersonating an executive or vendor, with no malware or link |

## Check yourself

Explain why a Safe Links check has to happen again at the moment someone clicks a link, rather
than only once when the email first arrives — and why Business Email Compromise needs a
different defense (anti-phishing/impersonation detection) than Safe Links or Safe Attachments
provide.
