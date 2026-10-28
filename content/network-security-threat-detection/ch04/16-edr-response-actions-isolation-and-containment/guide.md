# Lesson 16 — EDR Response Actions: Isolation and Containment

**Chapter 4 · Endpoint Detection Deep Dive · Lesson 16 of 32**

## What you'll learn

- The three core response actions an EDR platform actually puts in an analyst's hands: isolate, kill process, quarantine file
- What host isolation means technically, and why it's usually the first move once a compromise is confirmed
- Why isolating a host beats powering it off, and exactly what evidence a shutdown destroys
- How isolation, process termination, and file quarantine combine into a real containment response

## Three real actions, not just an alert

Detection is only half of EDR's name. Once telemetry and behavioral rules — the process trees, the LOLBin command-line patterns, everything covered so far in this chapter — confirm a compromise, an analyst needs to actually do something about it on a live, running machine, remotely, without physically touching it. Three actions cover the overwhelming majority of real responses: **isolate** the host from the network, **kill** the malicious process, and **quarantine** the offending file.

## Isolation: cutting off the network, not the machine

**Host isolation** is usually the first move, and it's more precise than it sounds. Isolating a host doesn't shut it down — it cuts off essentially all of its normal network traffic while leaving a single secure channel open between the EDR agent and the management console. The machine keeps running. The analyst can still issue commands to it, pull files off it, and watch its live telemetry stream in real time. What the machine loses is the ability to talk to anything else: it can't reach out to a command-and-control server, it can't move laterally to other machines on the network (the exact WMI/PsExec pattern from Lesson 15), and it can't exfiltrate any more data, because every path off the host except the one the analyst controls has been shut.

## Why not just power it off

The obvious-seeming alternative — unplug the machine or shut it down — is usually the wrong call, and the reason comes straight back to how modern attacks actually run. A running process, its decrypted strings, any code injected into legitimate processes (the DLL-load telemetry from Lesson 13), active network connection state, and encryption keys in active use all live in **volatile memory** — RAM — and none of that survives a power-off. A fileless attack, by definition, never wrote most of what matters to disk in the first place; powering off the machine destroys the only copy of evidence that ever existed. Some more sophisticated malware goes further and includes anti-forensic logic that specifically triggers on shutdown or reboot, deliberately erasing its own traces the moment it detects the machine going down. Isolation keeps the machine running precisely so none of that is lost — an analyst can pull a full memory dump and build an accurate forensic timeline from a machine that's still live, which is simply impossible once it's powered off.

## Kill process and quarantine file: the smaller, faster tools

**Killing a process** remotely stops a specific malicious process immediately without taking the whole host offline — useful when a single confirmed-bad process needs to stop right now, but the broader investigation doesn't yet call for full network isolation. **Quarantining a file** moves or encrypts a malicious file so it can no longer execute, the same end result traditional antivirus has always delivered, but issued remotely by an analyst as one tool within a larger, deliberate response rather than the platform's only available action.

## Concrete example: containing the LOLBin incident

Picking up the Lesson 15 incident: EDR has already flagged the certutil download, the WMI remote-execution call, and the shared process lineage tracing back to the original foothold. Once an analyst confirms the activity is malicious, the response isn't to power off all four machines — that would destroy the memory-resident evidence that showed exactly how the attacker moved between them. Instead, the analyst isolates the originally compromised host first, cutting it off from reaching the other three while leaving it running for investigation, kills the malicious process on each of the other machines to stop the immediate activity, and quarantines the downloaded payload file everywhere it landed. The network is contained, the processes are stopped, and the machines stay live long enough to reconstruct exactly what happened.

## Key terms

| Term | Meaning |
|---|---|
| Host isolation | Cutting off a machine's network traffic while leaving it running and reachable by the EDR agent/console |
| Volatile memory (RAM) evidence | Running processes, injected code, and connection state that exists only while a machine stays powered on |
| Kill process | Remotely terminating a specific malicious process without taking the whole host offline |
| Quarantine file | Moving or encrypting a malicious file remotely so it can no longer execute |
| Containment | The combined use of isolation, process termination, and file quarantine to stop an active incident |

## Check yourself

A compromised host is still running a fileless, memory-resident attack. Why does isolating it from the network preserve more forensic evidence than powering it off — and what specifically would powering off destroy that isolation keeps intact?
