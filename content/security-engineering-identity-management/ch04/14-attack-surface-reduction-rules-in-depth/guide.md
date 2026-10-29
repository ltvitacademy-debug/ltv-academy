# Lesson 14 — Attack Surface Reduction Rules in Depth

**Chapter 4 · Windows System Hardening Engineering · Lesson 2 of 4**

## What you'll learn

- What Attack Surface Reduction (ASR) rules actually target, and how that's different from traditional antivirus
- Four real ASR rules, what each one specifically blocks, and why those behaviors are worth blocking
- The four modes an ASR rule can run in, and why Audit mode exists at all
- How a real audit-before-enforce rollout works, so a rule doesn't break a legitimate business process on day one

## Blocking behaviors, not files

**Attack Surface Reduction (ASR)** rules are a feature of Microsoft Defender Exploit Guard that
target specific *behaviors* malware commonly relies on, rather than scanning for known-bad files
the way traditional antivirus signatures do. The logic: ransomware and malicious macros rarely
invent a brand-new technique — they spawn a child process from Office, run an obfuscated script,
or reach into `lsass.exe` for credentials, the same handful of moves over and over. An ASR rule
blocks that specific move outright, regardless of which malware family is attempting it, which is
exactly why ASR rules keep working against malware that didn't exist yet when the rule shipped.

## Four real rules worth knowing

- **Block Office applications from creating child processes** (GUID `D4F940AB-401B-4EFC-AADC-AD5F3C50688A`) — stops a malicious macro from launching `cmd.exe`, `powershell.exe`, or anything else as a child of Word or Excel.
- **Block execution of potentially obfuscated scripts** (GUID `5BEB7EFE-FD9A-4556-801D-275E5FFC04CC`) — flags heavily obfuscated PowerShell, VBScript, or JScript, a near-universal trait of malicious scripts trying to dodge signature detection.
- **Block Win32 API calls from Office macros** (GUID `92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B`) — stops a macro from calling Windows APIs directly, a technique used to inject code or escalate privileges without ever writing a separate executable to disk.
- **Block credential stealing from the Windows local security authority subsystem** (GUID `9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2`) — blocks the exact kind of `lsass.exe` memory access that Mimikatz-style credential dumping relies on, which pairs directly with the Credential Guard and LSA Protection controls covered in Lesson 15.

## Four modes, and why Audit mode exists

Each ASR rule is configured independently with one of four actions: **Not configured** (0, off),
**Block** (1, actively enforced), **Audit** (2, logs what would have happened but doesn't stop it),
and **Warn** (6, shows the user a bypassable warning). They're set via PowerShell's
`Set-MpPreference`, an Intune endpoint security policy, or GPO. Audit mode exists because flipping
straight to Block on day one is how a security team breaks a legitimate business process without
warning — a rule has no way to know the difference between a malicious macro and a trusted,
macro-driven finance tool that *legitimately* spawns a child process to call a batch job.

## A real audit-before-enforce rollout

**Concrete example:** a company enables **Block Office applications from creating child
processes** in Audit mode across the fleet for two weeks. Each time the rule *would have* blocked
something, Windows logs **Event ID 1125** in the Microsoft-Windows-Windows Defender/Operational
log (Event ID **1121** is the equivalent log entry once the rule is actually blocking). Reviewing
those two weeks of 1125 events — through Microsoft Defender for Endpoint's ASR rules report, or
the raw Event Viewer log — surfaces one legitimate hit: a macro-enabled Excel tool used by Finance
that spawns `cmd.exe` to kick off a nightly batch job. The team adds a targeted file-path exclusion
for that one workbook, confirms during a second audit pass that the legitimate process no longer
triggers the rule, and only then flips the rule to Block mode fleet-wide — now confident it stops
real attacks without a surprise outage on the Finance team's desk.

## Key terms

| Term | Meaning |
|---|---|
| ASR rule | A Microsoft Defender Exploit Guard rule that blocks a specific malware-associated behavior |
| Audit mode | An ASR mode that logs what a rule would have blocked, without actually blocking it |
| Event ID 1125 / 1121 | The Windows Defender event logged when a rule would-have-blocked (audit) vs. actually blocked (enforced) an action |
| Exclusion | A targeted exception that lets one verified-legitimate file or process bypass a specific rule |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why does a security team run a
new ASR rule in Audit mode for a period of time before switching it to Block mode, rather than
enabling Block immediately?
