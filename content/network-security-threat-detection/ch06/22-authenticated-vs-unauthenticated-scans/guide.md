# Lesson 22 — Authenticated vs. Unauthenticated Scans

**Chapter 6 · Vulnerability Assessment & Scanning · Lesson 2 of 4**

## What you'll learn

- What an **unauthenticated scan** can and can't see, and why it mirrors an outside attacker's
  view
- What an **authenticated scan** sees once the scanner is given valid credentials to log in
- Why authenticated scanning is far more thorough — and what it costs an organization to run one
  safely
- Why most mature vulnerability management programs run both, rather than picking just one

## Unauthenticated scans: the outside attacker's view

An **unauthenticated scan** interacts with a target purely over the network, with no credentials
at all — exactly the position an outside attacker is in before they've compromised anything. It
can see open ports, identify the service listening on each one, read whatever version banner that
service is willing to advertise, and run plugin/NVT checks against anything visible from the
outside. That's genuinely useful information: it tells you exactly what an unauthenticated
attacker scanning your network would see too.

But it's also inherently limited. A scanner with no credentials can't log into the host, so it
can't enumerate every installed application and its exact patch level, can't read local
configuration files, and can't see vulnerabilities in software that isn't exposing a network
service at all. It's left inferring a lot from the outside, which means both missed vulnerabilities
(nothing visible to flag) and occasional false positives (a service banner that looks outdated but
was actually patched without the version string changing).

## Authenticated scans: logging in to look around

An **authenticated scan** gives the scanner valid credentials — a local administrator account on
Windows, typically connecting over protocols like SMB or WinRM, or an SSH account on Linux — and
has it actually log into the target the way an administrator would. From inside, the scanner can
enumerate the full list of installed software and exact version numbers, check patch levels
directly against the operating system's own records, inspect configuration settings and registry
values, and find local vulnerabilities that never touch the network at all.

**Concrete example:** an unauthenticated scan of a Windows server sees only that port 443 is open
and reports on the web service listening there. An authenticated scan of the same server, logging
in with a domain account, additionally discovers an outdated PDF reader installed locally, three
missing security updates the operating system hasn't applied yet, and a registry setting that
weakens a security control — none of which ever appear on the network and none of which the
unauthenticated scan could have possibly seen.

## The real tradeoff: thoroughness vs. credential risk

Authenticated scanning is unambiguously more thorough and produces far fewer false positives and
false negatives, because the scanner is looking at ground truth instead of inferring from the
outside. The real cost isn't performance — it's **credential management**. Scanning credentials
typically need broad administrative access across every scanned system, which makes them a high-
value target in their own right if stored carelessly or reused, and someone has to maintain,
rotate, and restrict those accounts across potentially thousands of machines. That's exactly why
mature vulnerability management programs run authenticated scans as the primary, scheduled
assessment, while still running occasional unauthenticated scans to validate what an attacker with
zero access would actually be able to see.

## Key terms

| Term | Meaning |
|---|---|
| Unauthenticated scan | Probes a target from the outside with no credentials, like an attacker before compromise |
| Authenticated scan | Scanner logs in with valid credentials and inspects the target from the inside |
| Service banner | Version information a network service voluntarily advertises to anyone who connects |
| Credential management | The ongoing work of storing, rotating, and restricting the scanning accounts an authenticated scan depends on |

## Check yourself

An authenticated scan and an unauthenticated scan are run against the same server, and the
authenticated scan reports far more findings. Is the unauthenticated scan "wrong"? What is each
scan actually telling you?
