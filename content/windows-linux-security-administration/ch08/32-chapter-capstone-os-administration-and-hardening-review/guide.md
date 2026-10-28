# Lesson 32 — Chapter Capstone: OS Administration & Hardening Review

**Chapter 8 · Capstone: Hardening a Mixed Environment · Lesson 32 of 32**

## What you'll learn

- How a brand-new sysadmin would bring an entire mixed Windows/Linux environment up to a
  real, auditable baseline, chapter by chapter
- How the Windows side (AD, GPO, logging) and the Linux side (hardening, patching, endpoint
  protection) fit together into one coherent security posture, not two separate skill sets
- A chapter-by-chapter recap of everything this course covered
- What comes next in this career path, now that this course is complete

## Ninety days, one mixed environment

You've just taken over as the sysadmin for a mid-sized company's IT estate — a mix of
Windows servers running Active Directory and a handful of Linux boxes running internal
applications — and you have ninety days to bring the whole thing up to an auditable
baseline before the next external review. Every chapter of this course is a piece of that
ninety days.

**Windows: AD, GPO, and logging (Chapters 1-3).** Week one starts with an inventory of what's
actually in Active Directory — the domain structure, the OUs, who's in which security group,
and which NTFS and share permissions have quietly drifted from what they should be. Week two
applies the fix: a CIS-based GPO baseline linked to every server OU, Windows Firewall rules
scoped correctly by profile, BitLocker turned on with recovery keys escrowed to AD, and audit
policy and Sysmon configured so the Security log and Sysmon/Operational log actually capture
what happens on these machines, not just that something happened.

**Linux: hardening, patching, and endpoint protection (Chapters 4-7).** Week three moves to the
Linux estate: sudoers files get scoped to exactly what each role needs, PAM policies get
reviewed, file permissions and ACLs get audited for anything too permissive, and cron jobs
and systemd timers get checked for anything running with more access than it should. Week
four layers on SELinux or AppArmor enforcing mode, auditd rules that watch the files an
auditor cares about, SSH hardened to key-only auth, and fail2ban watching the door. From
there, the ongoing work takes over: a real Patch Tuesday and `apt`/`dnf` cadence instead of
patching whenever someone remembers, vulnerability scans tracked by CVE and CVSS score, and
endpoint protection — EDR on Windows, a Linux-appropriate equivalent on the servers that need
it — backed by an asset inventory that actually lists every machine, because none of this
protects a server nobody knew existed.

By day ninety, the environment isn't just patched — it's documented, auditable, and built so
the next review doesn't turn into Lesson 31's case study.

## The course, chapter by chapter

- **Chapter 1 — Windows Server & AD fundamentals.** Server roles, domain controllers, AD's
  domain/tree/forest/OU structure, users and groups, NTFS vs. share permissions.
- **Chapter 2 — Group Policy & Windows hardening.** GPOs and how they apply, CIS security
  baselines, Windows Firewall and Defender, BitLocker.
- **Chapter 3 — Windows logging & event management.** Event Viewer and the Security log, key
  Event IDs, Sysmon, and audit policy.
- **Chapter 4 — Linux administration deep dive.** sudo and sudoers, PAM, file permissions and
  ACLs, cron/systemd timer security.
- **Chapter 5 — Linux hardening & security tools.** SELinux and AppArmor, auditd, SSH
  hardening, fail2ban.
- **Chapter 6 — Patch management & baseline configuration.** Patch Tuesday, WSUS, `apt`/
  `yum`/`dnf`, vulnerability scanning with CVE/CVSS.
- **Chapter 7 — Endpoint protection & monitoring.** Antivirus vs. EDR, Windows Defender for
  Endpoint, Linux endpoint protection, asset inventory.
- **Chapter 8 — Capstone.** A Windows hardening lab, a Linux hardening lab, a failed-audit
  case study, and this review — every chapter applied to real scenarios.

## Check yourself

Of the ninety-day plan above, which single piece — the AD/GPO inventory, the Linux hardening
pass, or the ongoing patch and endpoint-protection cadence — do you think matters most for
making sure the *next* audit doesn't produce the same findings as Lesson 31's, and why?

## Course complete

That's the full course. You've gone from what a domain controller does to hardening both
operating systems you'll actually be defending, patching them on a real schedule, and
responding to a failed audit like the one this chapter just walked through. Next up in this
path: **Network Security, Endpoint Protection & Threat Detection**.
