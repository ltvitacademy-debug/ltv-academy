# Lesson 7 — Windows Firewall and Windows Defender

**Chapter 2 · Group Policy & Windows Hardening · Lesson 7 of 32**

## What you'll learn

- The three Windows Firewall profiles — Domain, Private, and Public — and why a single machine can be governed by different rules depending on which network it's connected to
- The difference between an inbound rule and an outbound rule, and which direction is restrictive by default
- What Microsoft Defender Antivirus's real-time protection actually watches
- What cloud-delivered protection adds on top of real-time protection, and why it matters for brand-new threats

## Three firewall profiles, not one

**Windows Firewall with Advanced Security** doesn't apply one fixed rule set to a machine — it applies one of three **profiles** depending on what kind of network the machine is currently connected to, and each profile can have a completely different rule set:

- **Domain** — active when the machine is connected to a network where it can authenticate to its Active Directory domain controller. Typically the most permissive profile, since the network is presumed to be the organization's own managed network.
- **Private** — for networks the user has manually marked as trusted (a home or small-office network), but that aren't domain-joined networks.
- **Public** — for untrusted networks like a coffee shop or airport Wi-Fi. This is the most restrictive profile by default, since the machine has no reason to trust anything else on that network.

**Concrete example:** a laptop has file-sharing enabled for the Domain and Private profiles so coworkers on the office network can reach it, but that same inbound rule is disabled under the Public profile — so the moment that laptop connects to airport Wi-Fi, it stops answering file-sharing requests entirely, without the user changing anything manually.

## Inbound vs. outbound rules

Windows Firewall rules are split by direction, and the two directions have opposite default postures:

- **Inbound rules** govern traffic arriving at the machine from the network, trying to reach something listening on it. By default, inbound traffic is **blocked unless a rule explicitly allows it** — which is why a new application that needs to accept incoming connections (a game server, a remote-access tool) often needs its own inbound rule created before it works.
- **Outbound rules** govern traffic leaving the machine. By default, outbound traffic is **allowed unless a rule explicitly blocks it** — so most everyday activity (a browser reaching a website, an app checking for updates) just works without any rule being created.

That asymmetry is deliberate: it's far more dangerous for something on the network to reach into a machine uninvited than for software already running on the machine to reach out.

## Microsoft Defender Antivirus: real-time protection

**Microsoft Defender Antivirus** (the built-in antivirus/anti-malware engine in Windows) runs **real-time protection** by default: it continuously monitors the system, scanning files the moment they're opened, run, downloaded, or modified, rather than waiting for a user to kick off a manual scan. If a file matches a known malicious signature or exhibits behavior Defender flags as malicious, it's blocked or quarantined immediately, before it can do anything.

## Cloud-delivered protection: catching what's brand new

Real-time protection alone still depends on Defender's local definitions recognizing a threat. **Cloud-delivered protection** closes that gap: when Defender encounters a file it can't confidently classify locally, it can query Microsoft's cloud-based detection service in near real time, drawing on threat intelligence gathered across a vastly larger population of machines than any single signature update could cover. This lets Defender react to brand-new, fast-moving malware campaigns far faster than waiting for the next scheduled definition update — which matters because the window between a new threat first appearing and a traditional signature catching up is exactly when the most damage gets done.

**Concrete example:** a user downloads a file carrying a malware variant that appeared only hours earlier. Defender's local signatures don't recognize it yet, but cloud-delivered protection checks the file's characteristics against Microsoft's cloud intelligence and blocks it anyway — protection that wouldn't exist if the machine relied solely on its last downloaded signature update.

## Key terms

| Term | Meaning |
|---|---|
| Domain / Private / Public profile | The three Windows Firewall profiles, applied automatically based on the current network's trust level |
| Inbound rule | Governs traffic arriving at the machine; blocked by default unless explicitly allowed |
| Outbound rule | Governs traffic leaving the machine; allowed by default unless explicitly blocked |
| Real-time protection | Microsoft Defender Antivirus continuously scanning files as they're opened, run, downloaded, or modified |
| Cloud-delivered protection | Near-instant classification of unknown files against Microsoft's cloud threat intelligence, ahead of a local signature update |

## Check yourself

A file-sharing inbound rule is enabled for the Domain and Private profiles but not Public. A user takes their laptop to a coffee shop and can't reach a shared folder on it from their phone. Is that a misconfiguration, or expected behavior — and why?
