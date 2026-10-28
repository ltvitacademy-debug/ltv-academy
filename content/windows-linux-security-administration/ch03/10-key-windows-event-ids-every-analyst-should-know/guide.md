# Lesson 10 — Key Windows Event IDs Every Analyst Should Know

**Chapter 3 · Windows Logging & Event Management · Lesson 10 of 32**

## What you'll learn

- The five Security-log Event IDs that come up constantly in real SOC and sysadmin work
- What each one actually signals, and what it does *not* tell you by itself
- Why a 4672 right after a 4624 is worth a second look, and why 4720 followed by 4728 is a
  classic pattern to watch for
- How to recognize a suspicious sequence of these IDs rather than judging any one in isolation

## Why these five, specifically

Lesson 9 showed you where the Security log lives and how to filter it by Event ID. This lesson
gives you the five IDs worth memorizing before you ever sit down in front of a real log, because
they show up in almost every logon-related investigation, account audit, and privilege-escalation
question you'll face: **4624**, **4625**, **4672**, **4720**, and **4728**.

## 4624 — An account was successfully logged on

This is the single most common Security-log event on any active machine — it fires every time a
logon succeeds, interactive or not. The field that turns a 4624 from noise into a lead is **Logon
Type**: type 2 is an interactive logon at the keyboard, type 3 is a network logon (accessing a
share, for instance), and type 10 is a RemoteInteractive logon — RDP. The same Event ID, three
very different stories, depending on that one field.

## 4625 — An account failed to log on

The failure twin of 4624. One 4625 is nothing — a user fat-fingered their password. A burst of
4625s against the same account, or the same account failing from many different source machines,
is the signature of a password-guessing or brute-force attempt, and it's one of the first patterns
any SOC alerting rule is built to catch.

## 4672 — Special privileges assigned to new logon

This fires whenever an account logs on with administrator-equivalent rights — membership that
carries privileges like debugging processes or taking ownership of objects. It's not inherently
alarming on its own (plenty of legitimate admin work triggers it), but a 4672 immediately
following a 4624 for an account that *shouldn't* have admin rights is exactly the kind of pairing
worth escalating.

## 4720 — A user account was created

Exactly what it says: a new account now exists on this system or domain. On its own, this is
routine IT work. The context that matters is *who* created it, *when*, and what happens to that
account in the following minutes.

## 4728 — A member was added to a security-enabled global group

This fires when an account is added to a security-enabled *global* group — the kind of group that
can carry real permissions across a domain. Watched together, 4720 followed shortly by 4728
adding that brand-new account into a privileged group, followed by a 4672 showing it logging on
with elevated rights, is a textbook pattern for an attacker (or a malicious insider) quietly
provisioning themselves persistent admin access.

## Key terms

| Term | Meaning |
|---|---|
| 4624 | Successful logon; the Logon Type field (2=interactive, 3=network, 10=RDP) tells the real story |
| 4625 | Failed logon; a burst of these signals a brute-force or password-guessing attempt |
| 4672 | Admin-equivalent logon — special privileges assigned to the new logon |
| 4720 | A new user account was created |
| 4728 | A member was added to a security-enabled global group |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why is seeing 4720, then 4728,
then 4672 for the same account in quick succession more concerning than seeing any one of those
Event IDs alone?
