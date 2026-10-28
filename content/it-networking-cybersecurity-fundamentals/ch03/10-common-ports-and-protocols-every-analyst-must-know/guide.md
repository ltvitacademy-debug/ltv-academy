# Lesson 10 — Common Ports and Protocols Every Analyst Must Know

**Chapter 3 · Ports, Protocols & Network Services · Lesson 10 of 32**

## What you'll learn

- What a port number actually is, and why 65,535 of them exist per IP address
- The well-known ports a SOC analyst is expected to recognize on sight, with no lookup
- Why reading a port number in a firewall or SIEM log line tells you the likely service instantly
- How an unexpected port tied to a "wrong" protocol becomes a red flag worth investigating

## What a port number is for

An IP address gets traffic to the right **host**. A port number gets traffic to the right
**application** running on that host. Ports are 16-bit numbers, 0–65,535, and the first 1,023 are
**well-known ports** — reserved, by long convention, for specific standard services. When a client
connects to a server on port 443, both ends already know, before any data is exchanged, that
they're almost certainly about to speak HTTPS. That convention is what makes the rest of this
lesson possible: a number alone tells you the probable protocol.

## The ports every analyst must memorize

```
Port   Protocol   Purpose
20/21  FTP        File Transfer Protocol (data/control)
22     SSH        Secure Shell — encrypted remote login
23     Telnet     Unencrypted remote login (legacy, avoid)
25     SMTP       Sending email between mail servers
53     DNS        Resolving domain names to IP addresses
80     HTTP       Unencrypted web traffic
110    POP3       Retrieving email (downloads, often deletes)
143    IMAP       Retrieving email (syncs across devices)
443    HTTPS      Encrypted web traffic
445    SMB        Windows file/printer sharing
3306   MySQL      MySQL database connections
3389   RDP        Windows Remote Desktop Protocol
```

These aren't arbitrary trivia — this is the exact list CompTIA Network+ and Security+ expect
memorized cold, because a working analyst doesn't have time to look each one up mid-incident.

## Why a port number is the first clue in a log line

A SOC analyst spends most of a shift reading logs: firewall logs, proxy logs, SIEM alerts. Every
one of those lines includes a destination port, and that number is read before anything else,
because it tells you the probable service instantly. See `DST PORT 3389` from an external IP
hitting an internal server at 2 a.m.? That's RDP — Remote Desktop — and an unexpected inbound RDP
connection is one of the most common ransomware entry points in real incident reports, so it gets
investigated immediately, before the analyst even opens the payload. See `DST PORT 23`? That's
Telnet, a protocol that sends credentials in plaintext — its mere presence on a modern network is
often itself the finding, regardless of what's inside the packet.

## When the port and the protocol don't match

Ports are a convention, not an enforced rule — nothing stops an attacker from running a hidden
command-and-control channel over port 443 to blend in with normal HTTPS traffic, or scanning for
open port 445 (SMB) to spread laterally the way the WannaCry ransomware did in 2017. That's why
experienced analysts treat the port as a strong *hint*, not a guarantee, and why tools like deep
packet inspection exist to check whether the traffic on a port actually matches the protocol that
port name implies.

## Key terms

| Term | Meaning |
|---|---|
| Port number | A 16-bit number (0–65,535) that routes traffic to the right application on a host |
| Well-known ports | Ports 0–1023, reserved by convention for standard services like HTTP (80) and SSH (22) |
| SMB (port 445) | Windows file and printer sharing protocol; a common lateral-movement target |
| RDP (port 3389) | Windows Remote Desktop Protocol; unexpected inbound RDP is a frequent ransomware entry point |

## Check yourself

A firewall log shows an internal workstation making an outbound connection to an unfamiliar
external IP on port 445. Which protocol does that port number point to, and why would a SOC
analyst flag that connection for review?
