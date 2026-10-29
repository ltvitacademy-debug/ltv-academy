# Lesson 15 — Credential Guard and LSA Protection

**Chapter 4 · Windows System Hardening Engineering · Lesson 3 of 4**

## What you'll learn

- What Credential Guard actually isolates, and why that stops Mimikatz-style credential theft even on a compromised host
- The real hardware and configuration requirements Credential Guard depends on
- What LSA Protection (RunAsPPL) does differently, and why it's a separate, complementary control
- How the two controls work together against a real credential-dumping attempt

## Credential Guard: isolating the secrets, not just the process

Normally, `lsass.exe` (the Local Security Authority Subsystem) holds NTLM password hashes and
Kerberos tickets in its own memory space on the running OS — which is exactly what tools like
Mimikatz read straight out of, once an attacker has administrative code execution. **Credential
Guard** changes where those secrets actually live. Using **Virtualization-Based Security (VBS)**,
it runs an isolated process called **LSAIso.exe** inside a hypervisor-protected, VM-like container
separate from the main Windows kernel. The regular `lsass.exe` still runs normally, but it no
longer holds the raw secrets itself — it has to ask the isolated LSAIso process to do the actual
NTLM and Kerberos operations. Even an attacker with full kernel-level code execution on the host
OS can't simply read those secrets out of memory anymore, because they were never in that memory
space to begin with.

## Real hardware and configuration requirements

Credential Guard isn't a checkbox that works on anything — VBS has real prerequisites: a 64-bit
CPU with virtualization extensions (Intel VT-x or AMD-V) and **SLAT** (Second Level Address
Translation), **UEFI firmware with Secure Boot** enabled, and Windows 10/11 Enterprise or
Education (or the Server equivalent) — Credential Guard isn't available on Windows Home or Pro. A
**TPM 2.0** chip is recommended for stronger key protection, and every boot driver on the machine
needs to be compatible with running underneath a hypervisor, since VBS uses the Hyper-V hypervisor
layer even when the Hyper-V role itself is never installed. Microsoft's `DG_Readiness_Tool.ps1`
script checks a given machine against all of this before anyone tries to turn the feature on.

## LSA Protection (RunAsPPL): hardening the process itself

**LSA Protection**, enabled via the `RunAsPPL` setting, is a separate and complementary control —
it doesn't move secrets anywhere, it hardens `lsass.exe` itself. Once enabled, `lsass.exe` runs as
a **Protected Process Light (PPL)**, meaning the OS only allows signed, trusted code to load into
its address space. That directly blocks the classic Mimikatz technique of injecting an unsigned
DLL into `lsass.exe` to read its memory. It's set via registry
(`HKLM\SYSTEM\CurrentControlSet\Control\Lsa`, `RunAsPPL = 1`) and requires a reboot; a value of
**2** runs it in **audit mode** first, logging Event IDs **3065/3066** in the
Microsoft-Windows-CodeIntegrity/Operational log for any plugin or driver that would have been
blocked — exactly the same audit-before-enforce discipline from Lesson 14, applied here before
flipping to full enforcement.

## Together: what actually happens to a real attack

**Concrete example:** a red-teamer with local administrator rights on a hardened workstation runs
`mimikatz.exe` and attempts `sekurlsa::logonpasswords`, the standard command for dumping cached
credentials. With Credential Guard enabled, there's nothing to dump — the real NTLM hashes and
Kerberos tickets never lived in `lsass.exe`'s own memory space. With LSA Protection enabled on top,
the attempt to even inject Mimikatz's module into `lsass.exe` fails outright, because `lsass.exe`
is now a protected process that refuses unsigned code. Two different mechanisms, stopping two
different steps of the same attack technique.

## Key terms

| Term | Meaning |
|---|---|
| Credential Guard | Uses Virtualization-Based Security to isolate NTLM hashes and Kerberos tickets in a protected LSAIso.exe process, outside normal OS memory |
| VBS / SLAT | Virtualization-Based Security and the CPU feature (Second Level Address Translation) it depends on to create an isolated memory region |
| RunAsPPL | The registry setting that runs lsass.exe as a Protected Process Light, blocking unsigned code injection |
| Protected Process Light (PPL) | A process type that only allows signed, trusted code to load into its address space |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: Credential Guard and LSA
Protection both stop credential theft, but they stop it by doing two genuinely different things.
What does each one actually prevent?
