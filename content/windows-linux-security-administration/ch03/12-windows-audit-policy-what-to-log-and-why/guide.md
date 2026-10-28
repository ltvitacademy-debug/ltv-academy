# Lesson 12 — Windows Audit Policy: What to Log and Why

**Chapter 3 · Windows Logging & Event Management · Lesson 12 of 32**

## What you'll learn

- Where Windows audit policy actually lives, and the real categories it's organized into
- How `auditpol` lets you inspect and set audit policy from the command line
- The real trade-off between logging everything and logging too little
- How to think about sizing an audit policy to what your team can actually detect and store

## Where audit policy lives

Everything in this chapter so far — the Security log, the specific Event IDs, even what Sysmon
adds on top — depends on audit policy being configured to actually generate those events in the
first place. Audit policy is configured in **Local Security Policy** (`secpol.msc`) under
**Advanced Audit Policy Configuration**, or, in a domain environment, through **Group Policy**
under **Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy
Configuration**. Without the right subcategory enabled, the event you're looking for in Event
Viewer simply never gets written — Event Viewer can't show you what Windows was never told to
log.

## The real categories

Windows organizes advanced audit policy into top-level categories, each broken into finer
subcategories. The ones that come up constantly in this chapter and in real SOC work:

- **Logon/Logoff** — governs 4624 and 4625 from Lesson 10, plus related session events.
- **Account Management** — governs 4720 (account created) and 4728 (added to a group), also from
  Lesson 10.
- **Privilege Use** — governs events like 4672, special privileges assigned to a logon.
- **Object Access** — governs auditing of access to specific files, folders, or registry keys,
  but only once a matching SACL (System Access Control List) is also set on that object.
- **Policy Change** — governs changes to the audit policy itself, among other security settings —
  so an attacker who tries to quietly weaken logging to cover their tracks generates an event of
  their own.

## Checking audit policy from the command line

`auditpol.exe` is the command-line tool for viewing and setting audit policy without opening a
console at all — useful for scripting a baseline across many machines, or for quickly confirming
what's actually enabled on a system you're investigating.

```
auditpol /get /category:*
auditpol /get /subcategory:"Logon"
```

The first command dumps the current setting for every top-level category; the second checks one
specific subcategory.

## The real trade-off: everything vs. too little

Logging everything sounds safer, but it isn't free. Enabling every subcategory, especially Object
Access across a busy file server, can generate an overwhelming volume of events — the storage and
SIEM-ingestion cost climbs fast, and buried in that volume, the handful of events that actually
matter become harder, not easier, to find. That's alert fatigue: a team drowning in noise starts
missing the real signal.

Logging too little is the opposite failure, and it's just as real. If Account Management auditing
was never enabled, Lesson 10's 4720 and 4728 simply don't exist on that machine — there's no
record to review after the fact, no matter how good your detection logic is. A gap in audit policy
is a gap in evidence, discovered only when you need it most.

## Sizing audit policy to what you can actually use

The right answer isn't "log everything" or "log the minimum" — it's enabling the categories that
map to detections and investigations your team will actually use, at a volume your storage and
SIEM can actually absorb. Logon/Logoff and Account Management are cheap to log and nearly always
worth it, given how directly they feed the Event IDs from Lesson 10. Object Access is powerful but
expensive, so it's usually scoped narrowly — SACLs on a handful of genuinely sensitive files or
folders, not the whole file server. Getting this balance right is exactly the kind of judgment
call a working SOC analyst or sysadmin makes constantly.

## Key terms

| Term | Meaning |
|---|---|
| Advanced Audit Policy Configuration | The policy area (Local Security Policy or Group Policy) that controls which categories of events get logged |
| auditpol | The command-line tool for viewing and setting audit policy |
| SACL (System Access Control List) | The per-object setting required alongside Object Access auditing before access events are logged |
| Alert fatigue | The failure mode of logging too much — real signal gets buried in noise |
| Audit policy gap | The failure mode of logging too little — no record exists to review after the fact |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: why does enabling Object Access
auditing on an entire busy file server create a real cost, even though it sounds like the "safer"
choice?
