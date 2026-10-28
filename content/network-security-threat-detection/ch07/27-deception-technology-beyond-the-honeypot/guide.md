# Lesson 27 — Deception Technology Beyond the Honeypot

**Chapter 7 · Honeypots & Deception Technology · Lesson 27 of 32**

## What you'll learn

- Why a honeypot is just one example of a broader category called **deception technology**, not the whole category
- What a **honeytoken** is, and how a fake credential or fake file can trigger an alert without anyone running a dedicated decoy system
- How decoy network shares and fake Active Directory objects extend the same "nothing legitimate touches this" logic across an entire environment
- Why spreading deception widely, rather than relying on one honeypot, gives defenders far more chances to catch lateral movement

## One decoy system is not the whole idea

Everything covered so far in this chapter has focused on the honeypot: a standalone decoy system or service. But the honeypot is really just one implementation of a much broader idea called **deception technology** — deliberately planting fake assets throughout an environment so that interacting with any of them is itself a reliable signal of unauthorized activity. A honeypot is a decoy *system*. Deception technology is the whole category of decoys, planted anywhere an attacker might look, in whatever form makes sense for that location.

That distinction matters because a single honeypot only catches an attacker who happens to stumble onto that one specific system. Spreading smaller, cheaper decoys throughout the environment — on file servers, inside credential stores, inside Active Directory itself — multiplies the number of tripwires an attacker might trip, without requiring a dedicated decoy machine for each one.

## Honeytokens: a fake worth watching

A **honeytoken** is a fake credential, fake file, or fake database entry planted specifically so that any access to it — or any attempt to use it — triggers an alert. Unlike a honeypot, a honeytoken isn't a system at all; it's a single piece of bait sitting inside a real, legitimate environment. A fake AWS access key left in a configuration file nobody should ever read is a honeytoken. A fake "VIP customer" record sitting in a production database, which no legitimate report or query should ever touch, is a honeytoken. The moment that key gets used to authenticate, or that record gets queried, the system knows something is wrong — because nothing legitimate was ever supposed to reach for it.

This works for the same underlying reason honeypots work: the honeytoken has no legitimate purpose, so its use is unambiguous evidence. The difference is scale and cost — a honeytoken can be dropped almost anywhere, in seconds, without standing up any infrastructure at all.

## Decoy shares and fake Active Directory objects

**Decoy network shares** apply the same idea to file systems. A fake SMB share named something an attacker would find tempting — `HR-Salaries-2024` or `IT-Admin-Passwords` — sits on the network with no real data and no legitimate reason for anyone to browse it. An attacker who's already compromised a workstation and is hunting for valuable targets will often enumerate available shares looking for exactly this kind of name, and the moment they open it, that's the alert.

**Fake Active Directory objects** push deception into identity infrastructure itself. A decoy user account that looks like a privileged administrator, or a fake group membership that appears to grant elevated access, can sit in AD specifically so that an attacker performing reconnaissance against the directory — enumerating accounts and groups to plan privilege escalation — eventually touches something fake. Because no legitimate process or administrator would ever authenticate as that decoy account or query that specific fake group for a real reason, any interaction with it is a tripwire.

## Concrete example

A SOC plants a honeytoken — a fake database credential — inside a configuration file on a developer's workstation, alongside decoy AD accounts named to look like service accounts with domain admin rights, and a decoy share named `Backup-Credentials`. Weeks later, an attacker compromises that same workstation through an unrelated phishing email, and immediately starts hunting for anything useful: they read the configuration file (triggering the honeytoken), then enumerate AD groups (brushing against the decoy accounts), then browse available shares (finding `Backup-Credentials`). Any one of those three tripwires alone would have been enough to alert the SOC — together, they give near-certain confirmation within minutes of the actual compromise.

## Key terms

| Term | Meaning |
|---|---|
| Deception technology | The broader category of deliberately planted fake assets — honeypots, honeytokens, decoy shares, fake AD objects — used to detect unauthorized activity |
| Honeytoken | A fake credential, file, or database entry planted to trigger an alert if accessed or used |
| Decoy network share | A fake file share with no real data, named to attract attackers hunting for valuable targets |
| Fake Active Directory object | A decoy account or group placed in AD to catch an attacker performing directory reconnaissance |

## Check yourself

Why can deception technology catch far more lateral-movement activity than a single honeypot alone, even though both rely on the exact same underlying principle?
