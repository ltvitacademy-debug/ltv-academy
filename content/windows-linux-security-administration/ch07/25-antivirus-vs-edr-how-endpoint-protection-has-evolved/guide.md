# Lesson 25 — Antivirus vs. EDR: How Endpoint Protection Has Evolved

**Chapter 7 · Endpoint Protection & Monitoring · Lesson 25 of 32**

## What you'll learn

- How traditional signature-based antivirus actually decides a file is malicious, and why that approach has a hard blind spot
- What EDR (Endpoint Detection and Response) adds that signature matching can't: continuous behavioral monitoring and process-tree visibility
- Why "detection" alone isn't enough, and what real response capability looks like on an endpoint
- Why a modern SOC treats EDR telemetry as a core data source rather than a background utility

## Signature-based antivirus and its blind spot

Traditional antivirus works by comparing files against a database of **signatures** —
hashes and byte patterns collected from malware that's already been found and
catalogued. Scan a file, check it against that list, flag a match and quarantine or
delete it. This approach is fast, cheap, and genuinely effective against malware that's
already been seen somewhere in the world.

Its blind spot is anything that *hasn't* been catalogued yet. **Zero-day** malware has no
existing signature. **Polymorphic malware** deliberately rewrites parts of its own code on
each infection, producing a new hash every time even though the underlying behavior is
identical. And **fileless** attacks — code that runs entirely in memory, often through a
legitimate tool like PowerShell — never write a recognizable file to disk for a scanner to
examine in the first place. Heuristic scanning (flagging suspicious-looking patterns
instead of exact matches) pushed this a bit further, but it's still fundamentally asking
"does this static artifact look bad," not "does this sequence of behavior look bad."

## What EDR watches instead

**EDR (Endpoint Detection and Response)** takes a different approach entirely. Instead of
inspecting a static file, an EDR agent continuously streams telemetry off the endpoint:
every process that starts, which process launched it, the command-line arguments it ran
with, network connections it opens, and files or registry keys it touches. That lets EDR
build a **process tree** — the parent-child chain of what launched what — so an analyst
isn't looking at one suspicious file in isolation, they're looking at a sequence of
behavior across the whole chain of events. A piece of malware can change its hash on every
run; it's much harder to make "Word spawning PowerShell spawning a network connection to an
unfamiliar address" look innocent.

## Detection *and* response

That behavioral view is also why EDR earns the second half of its name. A traditional
antivirus response is limited to quarantining or deleting the offending file. EDR gives an
analyst real actions to take on a live, running endpoint: **isolate** the host from the
network while leaving it powered on for investigation, **kill** a malicious process
remotely, pull a forensic timeline of exactly what happened and when, and in some products
roll back certain changes. Response isn't an afterthought bolted onto detection — it's a
first-class capability the architecture is built around.

## A concrete example: a fileless phishing payload

A user opens a phishing attachment. Its macro launches PowerShell with an obfuscated,
base64-encoded command that downloads a payload directly into memory — nothing is ever
written to disk as a file a scanner could examine. Signature-based antivirus has nothing
to hash and raises no alert; from its point of view, nothing happened. An EDR agent sees a
different picture: `winword.exe` spawning `powershell.exe` with suspicious encoded
arguments, and that PowerShell process immediately opening an outbound connection to an
address it's never talked to before. None of those three events alone is proof of an
attack, but the process tree connecting them is exactly the kind of behavioral signal EDR
is built to flag — often within minutes, well before any file-based scan would ever have a
chance to run.

## Why SOCs rely on EDR as a core data source

That same telemetry stream is why EDR has become central to how security operations
centers work, not just an endpoint-level safety net. EDR data feeds directly into SIEM and
XDR platforms, gets correlated across hundreds or thousands of endpoints at once, and
anchors proactive threat hunting — looking for the same suspicious process-tree pattern
across a whole fleet, not waiting for a single machine to raise an alert on its own.

## Key terms

| Term | Meaning |
|---|---|
| Signature-based detection | Matching a file's hash or byte pattern against a database of known malware |
| Zero-day / polymorphic malware | Malware with no existing signature, or that rewrites itself to evade hash matching |
| Fileless malware | Malicious code that runs in memory without ever writing a recognizable file to disk |
| EDR (Endpoint Detection and Response) | Continuous behavioral monitoring of endpoint activity, paired with the ability to investigate and respond |
| Process tree | The parent-child chain of which process launched which, used to read an attack as a sequence of behavior |

## Check yourself

A fileless attack never writes a file to disk. Why does that defeat signature-based
antivirus specifically, while still leaving a visible trail for EDR to catch?
