# Lesson 17 — What an IOC Actually Is and Common Types

**Chapter 5 · Threat Intelligence & Indicators of Compromise · Lesson 17 of 32**

## What you'll learn

- What an Indicator of Compromise (IOC) actually is, and why it's always something observable, not a guess or a feeling
- The four IOC types you'll encounter constantly: file hashes, malicious IPs/domains, registry keys, and email patterns
- Why a cryptographic hash is such a reliable match even after an attacker renames or repacks a file
- How one famous domain became one of the most well-documented IOCs in security history

## IOCs: observable evidence, not suspicion

An **Indicator of Compromise (IOC)** is a concrete, observable artifact that signals a system or
network has likely been compromised — not a hunch, not a risk score, but something specific
enough to match exactly: this file hash, this IP address, this registry key, this email subject
line. That precision is the entire point. A SOC analyst or a piece of EDR software can't act on
"this traffic feels weird," but it can absolutely act on "this exact SHA256 hash matches a file
on three known-malicious-file lists." IOCs are what turn threat intelligence from a narrative into
something a machine can check automatically, at scale, across thousands of endpoints at once.

## File hashes: the same fingerprint every time

A **cryptographic hash** (commonly MD5 or SHA256) is a fixed-length string generated from a
file's exact contents. The MD5 hash of the five-character text "hello", for example, is always
`5d41402abc4b2a76b9719d911017c592` — run it a thousand times, on a thousand machines, and you get
that exact same string every time, because the hash depends only on the bytes in the file. Change
a single byte and the hash changes completely and unpredictably. That property is exactly why
hashes make such a strong IOC: a piece of malware can be renamed, moved to a different folder, or
given an innocent-looking icon, and its hash still matches the one published by security vendors
for that known-malicious file. EDR tools check file hashes against published bad-hash lists
continuously, which is why a renamed copy of known ransomware still gets caught on first contact.

## Malicious IPs and domains: network-level IOCs

IOCs aren't limited to files. A **malicious IP address or domain** — one documented as attacker
infrastructure, such as a command-and-control server — is just as valid an indicator, and it's
one that can be blocked at the firewall before traffic ever reaches further. One of the most
famous real examples: during the 2017 WannaCry ransomware outbreak, the malware checked whether
one specific, long, randomly-generated domain name was already registered before it would proceed
to encrypt a victim's files. A security researcher registered that domain while investigating the
sample, which accidentally caused every future infection to see the domain as "already live" and
stop — an unintentional kill switch. That domain is now one of the most documented network IOCs
in security history, and it illustrates the point well: a domain string, by itself, became
evidence of compromise the moment it was associated with the malware's behavior.

## Registry keys and email patterns: artifacts beyond the network

Two more IOC types matter day to day. A **suspicious registry key** — commonly an entry added
under a Windows "Run" key so a program launches automatically at startup — is a classic
persistence artifact: malware that survives a reboot usually has to plant something exactly like
this. And an **email-based IOC** — a repeated subject line like "Invoice Overdue — Action
Required" hitting dozens of inboxes in the same hour, or a sender display name that doesn't match
the actual sending domain — is how a SOC recognizes a phishing campaign in progress, even before a
single attachment is opened. None of these require guessing; each is a specific, documented,
matchable artifact, which is exactly what makes something an IOC instead of just a suspicion.

## Key terms

| Term | Meaning |
|---|---|
| Indicator of Compromise (IOC) | A concrete, observable artifact that signals a likely compromise |
| File hash (MD5/SHA256) | A fixed-length fingerprint of a file's exact contents, unique to that content |
| Malicious IP/domain | A network address or domain name documented as attacker infrastructure |
| Registry key artifact | A Windows registry entry, often a Run key, used by malware for persistence |
| Email-based IOC | A phishing campaign's recurring subject line or spoofed sender pattern |

## Check yourself

A piece of malware is renamed and moved to a new folder on an infected machine. Why does its file
hash still work as a reliable IOC even though its filename and location have both changed?
