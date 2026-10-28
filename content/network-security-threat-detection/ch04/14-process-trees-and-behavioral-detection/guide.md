# Lesson 14 — Process Trees and Behavioral Detection

**Chapter 4 · Endpoint Detection Deep Dive · Lesson 14 of 32**

## What you'll learn

- What a process tree actually is, and how EDR builds one directly from process creation telemetry
- Why a parent-child relationship by itself means almost nothing — until you know which two processes it connects
- The classic `winword.exe -> powershell.exe` red flag, and why Word has no legitimate reason to launch a scripting engine
- How EDR platforms turn specific lineage patterns into automatic, high-confidence detection rules

## Building a tree from a parent field

Lesson 13 covered the fact that every process creation event EDR records includes the **parent process** that launched it. A **process tree** (also called process lineage) is simply what you get when you chain that parent field across every event on an endpoint: each process is a node, each "launched" relationship is an edge connecting a parent to its child, and following the chain from any process back to its root shows exactly what started what, in order, down to the second.

That's a much more useful object than any single process in isolation. One process tells you a program ran. A tree tells you the entire sequence of events that led to it running — which is exactly the shape of information an attack produces, because most attacks aren't a single malicious file, they're a chain: something gets opened, which launches something else, which launches something else again.

## Lineage isn't inherently suspicious — context is

It's worth being precise here: a parent-child relationship by itself proves nothing. Processes launch other processes constantly on a healthy, unremarkable endpoint. `explorer.exe` launches whatever application a user double-clicks. `services.exe` launches `svchost.exe` dozens of times at every boot. None of that is noteworthy, and a detection model that alerted on every parent-child pairing would drown an analyst in false positives within minutes.

What makes a specific lineage worth flagging is **which two processes are involved**, not that a relationship exists at all. That's the judgment EDR behavioral rules are built to encode.

## The classic flag: Word spawning PowerShell

The single most cited example in the industry is `winword.exe` spawning `powershell.exe`. Microsoft Word is a document editor. It has no legitimate business reason to launch a general-purpose scripting engine — the only realistic path by which that happens is a malicious macro inside a document doing exactly that. Compare that to `services.exe -> svchost.exe`, which is routine Windows internals, or `explorer.exe -> chrome.exe` from a user opening their browser — both are pairings a behavioral model learns to treat as noise, while `winword.exe -> powershell.exe` gets treated as close to automatic grounds for an alert, independent of whether PowerShell's own executable is "known good" (it is — it's a legitimate, signed Microsoft binary, which is exactly why signature-based tools have nothing to flag here).

## Depth matters too: following the chain further

A tree's value compounds the deeper it goes. `winword.exe -> powershell.exe` is already suspicious on its own, but `winword.exe -> powershell.exe -> certutil.exe` is a different level of concern entirely — a three-hop chain where a document editor launched a scripting engine, which then launched a built-in Windows utility often abused to download or decode payloads (the subject of Lesson 15). Each additional hop down a lineage that starts from an unexpected root adds confidence that this is a staged attack sequence, not a one-off coincidence.

## Concrete example

A user opens an invoice attachment. The process tree EDR builds looks like `outlook.exe -> winword.exe -> powershell.exe -> certutil.exe`. Taken as isolated facts, Outlook launching Word is completely normal — opening an attachment does exactly that. But the moment the chain extends to Word launching PowerShell, a built-in behavioral rule fires: "Office application spawned a script interpreter." The analyst doesn't need to know anything about the specific malware family involved; the lineage pattern alone is enough to generate a high-confidence alert and, on many EDR platforms, to automatically block the child process before it finishes executing.

## Key terms

| Term | Meaning |
|---|---|
| Process tree / lineage | The chain of parent-child "launched" relationships across every process on an endpoint |
| Parent process | The process that launched a given process — the field that makes lineage possible to reconstruct |
| Behavioral detection rule | A rule that flags a specific lineage pattern (not a file hash), such as an Office app spawning a scripting engine |
| Lineage depth | How many hops a process tree extends from its root — deeper, unusual chains carry more weight than a single parent-child pair |

## Check yourself

`services.exe` launching `svchost.exe` happens constantly and is never flagged. `winword.exe` launching `powershell.exe` almost always is. Both are just "a parent process launched a child process" — so what's the actual basis for treating one as noise and the other as a high-confidence alert?
