# Lesson 11 — Introduction to Sysmon for Deeper Visibility

**Chapter 3 · Windows Logging & Event Management · Lesson 11 of 32**

## What you'll learn

- What Sysmon actually is, and why it's not something Windows logs by default
- The three Sysmon event types a SOC team leans on most, and what each one captures that
  standard Windows auditing doesn't
- Where Sysmon writes its events, and why that location is separate from the Security log
- Why SOC teams install Sysmon on top of everything covered so far in this chapter

## What Sysmon actually is

Sysmon — short for System Monitor — is a free tool from the Microsoft Sysinternals suite,
originally written by Mark Russinovich and Thomas Garnier. It is not installed on Windows by
default; someone has to download it and install it deliberately, as a Windows service plus a
device driver that stays resident and watches system activity continuously. Once running, it logs
events far richer than anything the default Security log captures, which is exactly why it's
covered right after the native Event IDs from Lesson 10: Sysmon is what you deploy when "a logon
happened" isn't enough detail, and you need to know *what that logon then did*.

## Why default auditing isn't enough

The Event IDs from Lesson 10 tell you a lot about logons and account changes, but almost nothing
about what a process actually *did* after it started, or what a program talked to over the
network. Windows' native auditing can be configured to log that a process was created, but not,
by default, with the full command line that process was launched with — and the full command line
is frequently where an attack reveals itself (a legitimate-looking `powershell.exe` launched with
an encoded, obfuscated command is a very different story than a bare `powershell.exe`). Sysmon
closes exactly that gap.

## The three event types that matter most

- **Event ID 1 — Process Create**: logged every time a process starts, and critically, it
  includes the **full command line**, the process hash, and the parent process — so an analyst
  can see not just that something ran, but exactly how it was invoked and what launched it.
- **Event ID 3 — Network Connection**: logged when a process initiates a network connection,
  including source/destination IP and port — turning "something reached out to the internet"
  into "this specific process reached this specific address."
- **Event ID 11 — File Create**: logged when a file is created or its creation time is
  overwritten — the second case matters because attackers sometimes "timestomp" a file to make it
  look older than it is, and Sysmon catches that behavior too.

## Where it logs, and how it's configured

Sysmon writes its own dedicated log, separate from Security, found under **Applications and
Services Logs → Microsoft → Windows → Sysmon → Operational** in Event Viewer. It's installed and
configured from the command line, typically with an XML configuration file that defines include
and exclude rules — without filtering, Sysmon can generate an overwhelming volume of events, so
most real deployments start from a published community baseline (SwiftOnSecurity's Sysmon config
is the best-known example) and tune it from there.

```
sysmon64.exe -accepteula -i config.xml
sysmon64.exe -c
```

The first command installs Sysmon using a given configuration file; the second displays the
configuration currently running.

## Why SOC teams deploy it

Every other lesson in this chapter works with what Windows already logs. Sysmon is the deliberate
exception: SOC teams install it specifically because default Windows auditing, even with a
well-tuned audit policy, leaves process-level and network-level visibility on the table. A SIEM
built on Security log Event IDs alone can tell you *who* logged on; a SIEM that also ingests
Sysmon can tell you what that logon then *did*.

## Key terms

| Term | Meaning |
|---|---|
| Sysmon | System Monitor — a free Microsoft Sysinternals tool for deep system-activity logging |
| Event ID 1 (Process Create) | Logs process creation with full command line, hash, and parent process |
| Event ID 3 (Network Connection) | Logs a process initiating a network connection, including IP and port |
| Event ID 11 (File Create) | Logs file creation or a changed file creation timestamp |
| Sysmon config (XML) | The include/exclude rule file that controls what Sysmon logs, often based on a published community baseline |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why does a 4624 successful-logon
event in the Security log, on its own, tell you far less than a Sysmon Event ID 1 for the process
that logon then launched?
