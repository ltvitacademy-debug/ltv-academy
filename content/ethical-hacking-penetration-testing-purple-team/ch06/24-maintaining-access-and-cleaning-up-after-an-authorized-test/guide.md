# Lesson 24 — Maintaining Access, and Cleaning Up After an Authorized Test

**Chapter 6 · Post-Exploitation and Privilege Escalation · Lesson 4 of 4**

## What you'll learn

- Why an engagement sometimes needs persistent access, and what
  "needs" actually means here
- The professional obligation to document every artifact you create
  during a test
- A real cleanup checklist for closing out an authorized engagement
- Why the audit trail proving cleanup happened is itself a
  deliverable

## Why persistence is sometimes part of the scope

Some engagements explicitly test whether a defender notices and
removes unauthorized persistence — a scheduled task, a service, a
registry run key — placed to simulate what a real intrusion looks
like days or weeks in. When that's part of the signed scope, it's
treated exactly like any other test artifact: documented the moment
it's created, time-stamped, and tied to the specific authorization
that permits it. Persistence that isn't explicitly scoped is not
something a tester improvises on their own judgment.

## Documentation starts the moment you create something

Every account, scheduled task, file, or configuration change made
during an engagement goes into a running log the moment it's
created — not reconstructed from memory at the end. That log is what
makes cleanup possible and verifiable, and it's also what protects
the tester: if a client's own incident response team stumbles onto an
unexplained artifact mid-engagement, the documented log is the proof
it was authorized testing activity, not a real intrusion.

## A real cleanup checklist

Before an engagement closes, a tester works through a checklist like:

- Remove every test account created during the engagement
- Remove any scheduled tasks, services, or persistence mechanisms
  that were placed as part of scoped testing
- Restore any configuration that was changed to its original state
- Confirm no test tooling or payloads were left on disk
- Cross-check the cleanup against the running documentation log,
  item by item, not from memory

## The audit trail is itself a deliverable

A completed cleanup isn't just something a tester does quietly — it's
something the final report documents explicitly: what was created,
when, and confirmation of removal. A client's security team needs
that record to confirm their own environment is back to its pre-test
state, and it closes the loop on the chain-of-custody-style
discipline this course opened with in Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| Persistence | A mechanism (scheduled task, service, registry key) that maintains access across a reboot or session end |
| Cleanup checklist | The documented steps a tester follows to remove every artifact created during an engagement |
| Audit trail | The timestamped record of what was created and confirmation that it was removed |

## Check yourself

You're ready for Lesson 25 when you can explain why documentation
has to start the moment an artifact is created, not at the end of the
engagement, and name at least three items a real cleanup checklist
covers.
