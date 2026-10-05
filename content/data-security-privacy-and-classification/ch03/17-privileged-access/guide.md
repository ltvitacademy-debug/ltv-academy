# Lesson 17 — Privileged Access

**Chapter 3 · Access Control · Lesson 17 of 30**

## What you'll learn

- What counts as a privileged account, and why it's a small group with outsized risk
- What a PAM (privileged access management) vault actually does
- Just-in-time elevation, applied specifically to admin rights
- Break-glass accounts and session recording as the last layer of control

## Why privileged accounts are a different category

Every control earlier in this chapter applies to privileged accounts too — but they get extra layers on top, because the math is different. A regular user account compromised by an attacker can touch whatever that one person's job required. A compromised **privileged account** — a database `sysadmin`, a domain administrator, a cloud subscription owner — can touch almost everything: read any table, change any permission, disable the very logging that would have caught the intrusion. The blast radius (Lesson 14) of a privileged account is, by definition, close to the whole environment.

Privileged accounts aren't just "regular accounts with more permissions." They're specifically: database and server administrators, domain/cloud administrators, service accounts that run with elevated rights for an application, and emergency "break-glass" accounts. Any of these held permanently, with no extra scrutiny, is the single highest-value target an attacker can find.

## PAM: a vault, not a login

A **privileged access management (PAM)** system changes how administrators actually get elevated access. Instead of an admin knowing a `sysadmin` password and typing it in whenever they want, the password lives in a **vault** that the admin doesn't directly know. To use the privileged account, they check it out from the vault for a session; the vault can rotate the password automatically afterward, so even the admin who used it doesn't know the current value. This single change closes a long list of problems at once: shared admin passwords, admin passwords that never get rotated because rotating them means telling everyone the new one, and no record of *who* used the shared account on a given day.

## Just-in-time elevation for admin rights

Lesson 14 introduced just-in-time (JIT) elevation generally. For privileged access specifically, it works like this: an administrator doesn't hold `sysadmin` permanently — they request elevation, state a reason, get approved (often automatically, for a routine case), and receive the elevated right for a bounded window — an hour, a specific maintenance ticket's duration. When the window closes, the elevation is automatically removed. The account spends the overwhelming majority of its time at normal-user privilege, and is only briefly, deliberately elevated when there's an actual task that needs it.

## Break-glass accounts and session recording

A **break-glass account** is a last-resort credential, kept outside normal day-to-day access, for the scenario where the normal privileged-access system itself is unavailable (the PAM vault is down, the identity provider is unreachable) and someone needs emergency administrative access anyway. Break-glass accounts are tightly controlled precisely because they bypass the normal controls: used rarely, monitored closely, and every use triggers an automatic alert and a mandatory after-the-fact review.

**Session recording** is the other backstop: when a privileged session is active, the system records what commands were run and what screens were seen — not to create surveillance for its own sake, but so that if something goes wrong during a privileged session, there's a precise record of what happened, rather than relying on the administrator's memory or the vault's checkout log alone.

## Key terms

| Term | Meaning |
|---|---|
| Privileged account | An account with broad administrative rights — database, server, domain, or cloud admin — whose compromise has an outsized blast radius |
| PAM (privileged access management) | A system that vaults privileged credentials, checks them out for a session, and rotates them, instead of admins knowing a shared static password |
| Break-glass account | A last-resort privileged credential used only when normal privileged-access systems are unavailable, tightly monitored when used |
| Session recording | Logging the commands and screens of a privileged session for after-the-fact review |

## Lab

List every account you know of (at work, or in your own home lab/project) that has administrative rights over something — a server, a database, a cloud subscription, even a home router. For each, note whether it's used permanently or only checked out for specific tasks. Pick one that's permanently elevated and sketch what a just-in-time version of it would look like.

## Check yourself

- Why does a compromised privileged account carry a larger blast radius than a compromised regular user account?
- What specific problem does a PAM vault solve that a shared, never-rotated admin password creates?
