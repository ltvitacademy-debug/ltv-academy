# Lesson 11 — Privileged Access Management (PAM) Concepts

**Chapter 3 · Authorization Models at Scale · Lesson 11 of 32**

## What you'll learn

- Why standing privileged access — an admin account that's always privileged — is a real, significant risk, not a theoretical one
- What credential vaulting is, and why it replaces memorized or shared admin passwords
- What session recording adds on top of vaulting, and why checkout alone isn't enough
- The real tools category PAM belongs to, with concrete examples including CyberArk and Azure PIM

## The risk standing privileged access actually creates

A **standing privileged account** is an account that holds elevated rights — domain admin, database owner, root — all the time, whether or not anyone is actively using that privilege right now. The risk isn't abstract: a standing admin account is a maximum-value target for every attacker and every piece of malware on the network, twenty-four hours a day, because it never needs to wait for the right moment to be useful — it's already privileged the instant it's compromised. Phishing an ordinary user's credentials gets an attacker a foothold; phishing a standing domain admin's credentials gets them the keys to the whole environment, immediately, with no further escalation required. The longer an account sits privileged without being actively used for that privilege, the longer that maximum-value target sits exposed for no operational benefit — most of an admin's working day doesn't actually require admin rights at all.

## Vaulting: credentials nobody memorizes

**Privileged access management (PAM)** is the discipline and tooling built specifically to reduce that exposure, and its foundational piece is **credential vaulting**: privileged account passwords are stored in an encrypted vault rather than memorized by an administrator or shared across a team in a spreadsheet or sticky note. When an admin needs privileged access, they authenticate to the vault, and the vault checks out the credential to them — often rotating the password automatically afterward so the same credential can't be reused without going through the vault again. Nobody actually knows the domain admin password anymore; it exists only inside the vault, checked out under a logged, individually-attributable event each time it's used. That single change closes off an entire class of problem: a shared admin password written down somewhere, used by five different people, impossible to trace back to any one of them after an incident.

## Session recording: visibility into what privileged access actually did

Vaulting controls *who can obtain* privileged credentials, but it doesn't by itself capture *what happened* once someone used them. **Session recording** closes that gap: the privileged session itself — every command run, every screen shown, sometimes full video — is captured and stored for later review. This matters for two different reasons at once. For incident response, a session recording turns "we think the compromised admin account was used for something" into an exact, reviewable record of every action taken during that session. And for ordinary oversight, it means privileged activity is auditable in detail even when nothing has gone wrong, which is the kind of accountability a shared, unrecorded admin login could never provide.

## The real tools category: PAM platforms

PAM isn't a theoretical model — it's a real, established category of enterprise security tooling. **CyberArk** is one of the longest-standing dedicated PAM platforms, built around vaulting, session recording, and privileged workflow automation across on-prem and cloud environments. **Azure PIM (Privileged Identity Management)**, built into Microsoft Entra ID, is a cloud-native example focused specifically on role-based privileged access in Azure and Microsoft 365 — and it's the mechanism behind just-in-time role activation, which Lesson 12 builds on directly. Both solve the same underlying problem — reducing standing privileged exposure — through the same core mechanisms of vaulting, logging, and controlled checkout, even though one is a general-purpose vault and the other is tightly integrated into a single cloud identity platform.

## Key terms

| Term | Meaning |
|---|---|
| Standing privileged access | An account holding elevated rights continuously, whether or not the privilege is actively being used |
| Credential vaulting | Storing privileged account passwords in an encrypted vault, checked out on demand instead of memorized or shared |
| Session recording | Capturing the commands and screen activity of a privileged session for later review |
| PAM (privileged access management) | The discipline and tooling for reducing standing privileged exposure through vaulting, recording, and controlled checkout |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why is a standing privileged account a meaningful risk even if it's never actually misused, and what does session recording add that credential vaulting alone doesn't provide?
