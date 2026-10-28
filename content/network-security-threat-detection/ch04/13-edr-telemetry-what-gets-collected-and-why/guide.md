# Lesson 13 — EDR Telemetry: What Gets Collected and Why

**Chapter 4 · Endpoint Detection Deep Dive · Lesson 13 of 32**

## What you'll learn

- The specific categories of telemetry an EDR agent streams off every endpoint, not just "it watches for bad stuff"
- Why full command-line arguments matter far more than knowing a process merely started
- How network, file, registry, and module-load telemetry each catch a different stage of an attack
- Why the sheer volume of telemetry EDR collects is the point, not a performance tax to tolerate

## From "a process ran" to a command line worth reading

Traditional antivirus asks one question about a file: does it match a known-bad signature. EDR asks a much bigger set of questions about everything that happens on the endpoint, continuously, whether or not anything looks suspicious yet. The foundation of that is **process creation telemetry**: every time any process starts, the EDR agent records not just the executable's name, but its **full command line** — every argument it was launched with — along with its parent process, the user context it ran under, and a precise timestamp.

That distinction between "a process started" and "here is the exact command line it started with" is enormous in practice. `powershell.exe` launching with no arguments is unremarkable — it happens constantly on a managed fleet. `powershell.exe -WindowStyle Hidden -EncodedCommand JABzAD0A...` launching from a Word document's temp folder is a different story entirely, and the only way to tell the difference is to actually capture the arguments, not just the filename.

## Network connections: where is this process actually talking to

EDR also tracks every **network connection** a process opens — destination IP or domain, port, protocol, and critically, *which process* initiated it. A browser opening connections to CDN endpoints all day is normal background noise. `certutil.exe` on a workstation that's never made an outbound connection before, suddenly reaching out to an unfamiliar IP address on port 443, is the kind of pairing — unusual process, unusual destination — that gets a telemetry stream flagged for review even before anything is confirmed malicious.

## File and registry telemetry: what got written, and where

**File system telemetry** captures files created, modified, renamed, or deleted, with special attention to sensitive locations — startup folders, system directories, places a legitimate business application has no reason to write to. **Registry telemetry** does the same for registry key changes, and matters enormously for persistence: a huge share of malware survives a reboot by adding itself to a `Run` key or scheduled task entry so it launches again automatically. An EDR agent watching registry writes to those specific keys can catch a persistence attempt at the moment it's created, long before the next reboot would even give the malware a chance to run again.

## DLL loads: catching what rides inside a trusted process

The last major category is **module/DLL load telemetry** — tracking which DLLs get loaded into which running processes. This matters because of techniques like **DLL side-loading** and **process injection**, where an attacker doesn't run their own suspicious executable at all; they get malicious code loaded into the memory space of a process that's already trusted and already running, such as `explorer.exe` or a signed system binary. A file-based scanner looking only at what's on disk has nothing to flag — the "file" is memory-resident code loaded into something legitimate. Telemetry on *which* DLLs load into *which* processes is often the only signal that an injection happened at all.

## A concrete example: all four streams, one incident

A phishing email's attachment runs a macro. The **process creation** stream logs `winword.exe` spawning `cmd.exe`, which spawns `powershell.exe` with a long base64-encoded argument — command-line visibility nobody would get from a file hash. The **network** stream shows that PowerShell process immediately opening a connection to an IP address it's never contacted before. The **registry** stream shows a new value written to a `Run` key moments later. No single stream proves an attack on its own — a Run key write alone could be a legitimate installer — but all of them together, correlated by timestamp and process, tell a story a file-scan model could never see, because none of this ever involved a new file with a bad hash.

## Key terms

| Term | Meaning |
|---|---|
| Process creation telemetry | Full command-line arguments, parent process, user, and timestamp captured every time a process starts |
| Network connection telemetry | Destination, port, and protocol of every connection, tagged to the process that opened it |
| File system telemetry | Files created, modified, or deleted, especially in sensitive locations |
| Registry telemetry | Registry key changes, often used to catch persistence mechanisms like Run keys |
| DLL/module load telemetry | Which DLLs load into which running processes, used to catch injection and side-loading |

## Check yourself

Why does logging a process's full command line matter so much more than just logging that the process started — and which telemetry category would catch a persistence mechanism that writes itself into the registry rather than dropping a new file on disk?
