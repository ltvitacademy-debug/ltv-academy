# Lesson 14 — What Discovery Actually Does

**Chapter 4 · Discovery Fundamentals · Lesson 14 of 26**

## What you'll learn

- What Discovery actually is: an automated scanning capability, not a manual data-entry tool
- Why manual CI entry — the only approach available through Chapter 3 — doesn't scale
- How Discovery uses a MID Server to reach into a network ServiceNow's cloud can't see directly
- The real relationship between Discovery and the governance covered in Chapter 5
- Why Discovery doesn't replace the honest data-quality problem from Chapter 1, it just changes who does the work

## The problem this chapter exists to solve

Chapter 1 was honest about something most CMDB marketing isn't: a CMDB is only as good as
the data in it, and data entered and maintained entirely by hand goes stale fast. Someone
decommissions a server and forgets to update its CI. Someone racks a new switch and never
creates a record for it at all. Chapter 3's governance material gave you the policy side of
keeping that from happening — ownership, audits, reconciliation. But policy alone doesn't
scan a network. Something has to actually go look at the infrastructure and tell the CMDB
what's really out there. That something is Discovery.

## What Discovery actually is

Discovery is ServiceNow's built-in capability for automatically finding devices and software
on a network and using what it finds to create or update CMDB records — without a person
manually typing in a server's IP address, operating system, or installed applications. Instead
of an administrator opening a new record and filling in fields from memory or a spreadsheet,
Discovery reaches out across a defined range of the network, finds what's actually running,
and populates the CI data itself. It is the mechanism that makes "the CMDB reflects reality"
achievable at a scale no team of administrators typing by hand could keep up with.

```
Manual CI entry (Chapters 1-3):        Discovery (this chapter):
- a person types in every field        - Discovery scans the network itself
- accurate the day it's entered        - re-runs on a schedule, stays current
- goes stale the moment something      - catches new devices, removed devices,
  changes and nobody updates it          and changed specs automatically
```

## Discovery needs a way into the network — that's where the MID Server comes back in

ServiceNow's instance runs in ServiceNow's own cloud. It has no direct line of sight into a
customer's internal network any more than a REST integration does. Course 7's "What a MID
Server Does" lesson covered exactly this gap: a MID Server is a customer-installed Java
application, sitting inside the customer's own network, that makes outbound-only connections
back to the instance. Discovery is one of the specific jobs a MID Server was built to carry
out. When Discovery needs to scan a range of IP addresses, it's the MID Server — not the
cloud instance itself — that actually sends the probes onto that network and relays the
results back. Without a MID Server reachable from the target network, Discovery has no way
to run at all; Lesson 17 in this chapter covers exactly what that requires.

## Discovery doesn't replace governance — it feeds it

It's tempting to treat Discovery as a complete fix for the data-quality problem Chapter 1
raised, but that overstates what it does. Discovery is excellent at finding infrastructure-level
facts: a server exists at this address, it's running this OS, it has this much memory, this
software is installed on it. It is not, by itself, a guarantee that every CI it creates gets
assigned the right owner, the right business service relationship, or the right lifecycle
status — that's still the governance work from Chapter 3 and Chapter 5. Discovery keeps the
infrastructure layer of the CMDB current with far less manual effort; it doesn't remove the
need for a human-owned process to keep that data meaningful once it's there.

## Key terms

| Term | Meaning |
|---|---|
| Discovery | ServiceNow's capability for automatically scanning a network to find devices and software and populate or update CMDB records |
| MID Server | The customer-installed, on-premises application that actually carries out Discovery's scans on the target network |
| Infrastructure-level data | The facts Discovery is good at finding: what exists, its specs, what's installed on it |
| Data staleness | What happens to manually entered CI data once something changes and nobody updates the record |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why can't Discovery run at
all without a MID Server, and what kind of CMDB data does Discovery actually keep current —
versus what still depends on governance from Chapter 3 and Chapter 5?
