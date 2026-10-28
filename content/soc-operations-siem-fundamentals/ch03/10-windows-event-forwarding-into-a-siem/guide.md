# Lesson 10 — Windows Event Forwarding into a SIEM

**Chapter 3 · Log Sources & Collection · Lesson 10 of 32**

## What you'll learn

- What Windows Event Forwarding (WEF) is, and why Windows needs its own mechanism instead of just speaking syslog
- How a WEF subscription actually works: the collector, the source computers, and the protocol that carries events between them
- The difference between source-initiated and collector-initiated subscriptions
- Why a SOC might choose built-in WEF over installing a dedicated forwarding agent on every machine — and when the opposite call makes more sense

## Why Windows needs its own mechanism

Windows doesn't speak syslog natively. Its event logs — Security, Application, System, and the rest —
live in a proprietary binary format read through Event Viewer, not as plaintext lines a syslog
listener can parse. **Windows Event Forwarding (WEF)** is Microsoft's built-in answer: a
subscription-based mechanism, running on top of **WinRM** (Windows Remote Management, over
TCP port 5985 for HTTP or 5986 for HTTPS), that lets a central **Windows Event Collector (WEC)**
server pull or receive events from many source machines without installing a third-party agent on
any of them. It ships with Windows itself — there's nothing extra to license or deploy, just
configuration.

## How a subscription actually works

A WEF deployment centers on one collector server and a **subscription** it defines, which specifies
which event logs (say, Security log Event ID 4625, failed logons) to collect and from which source
computers. There are two subscription models:

```
Source-initiated (push):  GPO tells each source computer "forward to this collector"
Collector-initiated (pull): the collector itself reaches out and pulls from each source
```

**Source-initiated** subscriptions are the common choice at scale — a Group Policy Object pushes the
subscription configuration out to hundreds or thousands of machines at once, and each one starts
forwarding matching events on its own. **Collector-initiated** subscriptions flip that: the collector
maintains the list of sources and reaches out to each one, which suits smaller, more tightly
controlled sets of machines. Either way, forwarded events land in a special log on the collector
called **ForwardedEvents** — a normal Windows event log that a SIEM (or a forwarding agent sitting
on the collector) can then read and ship onward.

## WEF vs. a dedicated forwarding agent

WEF isn't the only way to get Windows logs moving, and it isn't always the right call. A **dedicated
forwarding agent** — Splunk's Universal Forwarder, Elastic's Winlogbeat, IBM QRadar's WinCollect, or
Microsoft's own Azure Monitor Agent — is a lightweight process installed directly on each endpoint
instead of relying on the built-in WEF/WinRM path.

- **WEF** needs no extra software, uses infrastructure Windows already has, and is a natural fit when
  the destination is a central Windows Event Collector or a SIEM that already understands
  ForwardedEvents. Its tradeoff: it's Windows-only, and the subscription model adds a layer of GPO
  and WinRM configuration to get right.
- **A dedicated agent** can forward directly to almost any SIEM, works identically on Windows and
  Linux, and often offers finer-grained filtering at the source. Its tradeoff: it's one more piece of
  software to deploy, update, and monitor on every single host.

Many SOCs end up running both — WEF to consolidate branch-office servers into a regional collector,
then a single forwarding agent on that collector to ship everything into the SIEM.

## Key terms

| Term | Meaning |
|---|---|
| Windows Event Forwarding (WEF) | Microsoft's built-in, subscription-based mechanism for forwarding event logs between Windows machines |
| WinRM | Windows Remote Management — the protocol WEF runs on, over TCP 5985/5986 |
| Windows Event Collector (WEC) | The central server that receives forwarded events per a subscription |
| ForwardedEvents | The event log on the collector where forwarded events land |
| Forwarding agent | Dedicated software (e.g. Winlogbeat, Splunk Universal Forwarder) installed per host to ship logs to a SIEM |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what's the real tradeoff between
using built-in Windows Event Forwarding and installing a dedicated forwarding agent on every
endpoint?
