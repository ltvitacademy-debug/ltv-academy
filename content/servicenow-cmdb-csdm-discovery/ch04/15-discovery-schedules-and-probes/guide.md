# Lesson 15 — Discovery Schedules & Probes

**Chapter 4 · Discovery Fundamentals · Lesson 15 of 26**

## What you'll learn

- What a Discovery Schedule record actually controls: when Discovery runs and which IP range it scans
- What a probe is: a specific operation that collects one particular kind of information
- The real, phased order Discovery works in — find, classify, then probe
- Why that phasing matters: Discovery doesn't ask every question of every address
- How schedules and probes work together to turn "scan the network" into a repeatable process

## Discovery Schedules: when and where

Lesson 14 established that Discovery scans a network instead of waiting for someone to type
in a CI by hand. A Discovery Schedule record is what actually controls that: it defines when
Discovery runs — on a recurring interval, like nightly or weekly — and what IP range or network
segment it scans when it runs. Without a schedule, Discovery has no defined scope; a schedule is
what turns "we have Discovery" into "Discovery scans this building's server subnet every night
at 2 AM." A single instance typically has multiple schedules, each pointed at a different range,
because different parts of a network may need different scan frequencies or different MID
Servers to reach them.

## Probes: the specific operations that gather detail

Finding that something exists at an IP address is only the first step. A probe is a specific,
targeted operation that collects one particular piece of information once a device has been
found — one probe might identify the operating system, another might inventory installed
software, another might read CPU and memory specs. Each probe is narrow on purpose: it asks
one kind of question and gets one kind of answer back. Discovery doesn't run every probe against
every address it finds; it runs the probes that make sense for what that device turns out to be.

```
A Discovery Schedule defines:          A probe defines:
- WHEN Discovery runs                  - ONE specific thing to collect
  (nightly, weekly, on demand)           (OS, installed software, CPU/RAM)
- WHAT range it scans                  - run only against devices where
  (an IP range or network segment)       that kind of detail makes sense
```

## The real, phased process: find, classify, probe

Discovery doesn't try to learn everything about every address in one pass. It works in phases.
First, an initial scan — effectively a ping sweep or port scan — checks which IP addresses in
the scheduled range actually have something listening at all. Second, for each address that
responds, Discovery classifies what kind of device it is: a Windows server, a Linux server, a
network switch, something else entirely. Third, once it knows the device type, Discovery runs
the specific set of probes appropriate to that type — a Linux server gets probes for its OS
details and installed packages; a network switch gets a different set entirely, suited to what
a switch actually is.

```
Phase 1: Scan           Phase 2: Classify         Phase 3: Probe
Ping sweep / port  -->  What kind of device   --> Run the probes that fit
scan the range          is this?                  that device type only
```

## Why the phasing matters

Running every possible probe against every address would be slow, wasteful, and in many cases
meaningless — asking a network switch to report its installed Windows software doesn't make
sense, because the question doesn't apply. Classifying first means Discovery only asks the
questions that are relevant to what it actually found, which is both faster and produces
cleaner, more accurate CMDB data than a one-size-fits-all scan ever could.

## Key terms

| Term | Meaning |
|---|---|
| Discovery Schedule | A record that defines when Discovery runs and which IP range or network segment it scans |
| Probe | A specific, targeted operation that collects one particular kind of information about a device (OS, software, specs) |
| Ping sweep / port scan | The initial phase that identifies which IP addresses have something listening at all |
| Classification | The phase where Discovery determines what kind of device it found, before deciding which probes to run |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what does a Discovery
Schedule control versus what a probe collects, and why does Discovery classify a device before
running probes against it instead of running every probe against every address?
