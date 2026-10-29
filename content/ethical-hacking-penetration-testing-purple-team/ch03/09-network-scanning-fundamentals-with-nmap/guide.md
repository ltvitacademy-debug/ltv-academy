# Lesson 9 — Network Scanning Fundamentals with Nmap

**Chapter 3 · Scanning and Enumeration · Lesson 1 of 4**

## What you'll learn

- The real difference between a TCP connect scan, a SYN scan, and a UDP
  scan — and why Nmap's default behavior changes depending on your
  privilege level
- How to read Nmap's three port states (`open`, `closed`, `filtered`)
  instead of treating every non-open result the same way
- What OS fingerprinting (`-O`) can realistically tell you, and where
  its confidence percentage starts to lie to you
- How Nmap's timing templates trade scan speed for stealth, and why
  that tradeoff is a rules-of-engagement decision, not just a
  performance setting

## From mapping an attack surface to touching it

Chapter 2 ended with an attack surface map built almost entirely from
OSINT and passive signals — domains, IP ranges, technology guesses.
Scanning is where you finally send packets at the target and get
ground truth back: which hosts are actually alive, which ports are
actually open, and what's actually listening on them. Nmap ("Network
Mapper") is the tool nearly every pentest report's scanning phase
runs through, and understanding exactly what each scan type does —
not just which flag to type — is what separates reading `nmap -sV
target` off a cheat sheet from being able to explain a finding to a
client.

## The TCP SYN scan: Nmap's default for a reason

Run with root (Linux) or Administrator (Windows) privileges, Nmap
defaults to a **TCP SYN scan** (`-sS`), often called a half-open scan:

```
nmap -sS 10.10.10.5
```

Nmap sends a TCP SYN packet to each target port and reads the
reply. A `SYN/ACK` back means the port is **open**, and Nmap
immediately sends a `RST` instead of completing the handshake — so a
full TCP connection is never established. A bare `RST` back means
**closed**. No response at all, or an ICMP "destination unreachable,"
means **filtered**: something (usually a firewall) is dropping the
probe, and Nmap genuinely doesn't know if the port is open behind it.
A typical result looks like this:

```
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3389/tcp filtered ms-wbt-server
```

Treating `filtered` as "closed" is a common beginner mistake — it
means the question wasn't answered, not that the answer was no.

## The scan types you'll actually choose between

- **`-sT` (TCP connect scan)** completes the full three-way handshake
  using the OS socket API. It doesn't need raw-socket privileges, so
  it's your fallback when `-sS` isn't available, but it's louder — it
  shows up in target-side connection logs that a half-open scan often
  doesn't.
- **`-sU` (UDP scan)** is slow and ambiguous by nature: UDP has no
  handshake, so a port with no response at all is reported
  `open|filtered` rather than a clean answer. Budget real time for it
  — `nmap -sU --top-ports 100 target` is far more realistic than
  scanning all 65,535 UDP ports.
- **`-sN` / `-sF` / `-sX` (null, FIN, Xmas scans)** manipulate TCP
  flags to slip past older, purely stateless packet filters. Modern
  stateful firewalls mostly defeat them, but they're worth knowing —
  an unexpected result difference between a SYN scan and a FIN scan
  can itself be a clue about what's filtering traffic.

## OS fingerprinting with `-O`

`nmap -O target` compares subtle quirks in a host's TCP/IP stack —
initial TTL, TCP window size, how IP IDs increment, option ordering —
against Nmap's `nmap-os-db` fingerprint database, and returns a guess
with a confidence percentage:

```
Aggressive OS guesses: Linux 5.4 - 5.15 (93%), Linux 5.10 (89%)
```

That percentage is a statistical match, not a certainty. Hardened or
heavily load-balanced hosts frequently return low-confidence or
flatly wrong guesses. Use `-O` to narrow your assumptions going into
enumeration, never as a cited fact in a report.

## Timing templates and why speed is a judgment call

Nmap's six timing templates, `-T0` (paranoid) through `-T5` (insane),
control how aggressively it paces probes. `-T0` can take hours per
host but is far less likely to trip an IDS threshold or flood a
fragile target; `-T4`/`-T5` finish fast but generate a burst of
traffic that's trivial to detect and, on a brittle legacy system,
can occasionally cause instability. The right timing isn't "whatever
finishes fastest" — it's whatever your signed rules of engagement and
the target's known fragility call for. A production OT network and
an isolated internal lab do not get the same `-T` setting.

## Key terms

| Term | Meaning |
|---|---|
| SYN scan (`-sS`) | Half-open TCP scan; sends SYN, reads SYN/ACK or RST, never completes the handshake |
| Filtered | A port state meaning no answer was received — likely blocked by a firewall, not confirmed closed |
| Connect scan (`-sT`) | Full-handshake scan using the OS socket API; works without raw-socket privileges but is logged more visibly |
| Timing template | Nmap's `-T0`–`-T5` settings controlling probe pacing, trading scan speed against detection risk |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does Nmap report `filtered` instead of `closed` when a firewall drops
a probe, and what tradeoff are you actually making when you choose
`-T1` over `-T4` on a live engagement?
