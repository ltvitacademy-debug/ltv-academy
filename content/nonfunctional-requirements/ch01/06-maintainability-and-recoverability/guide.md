# Lesson 6 — Maintainability and Recoverability

**Chapter 1 · Nonfunctional Requirements · Lesson 6 of 18**

## What you'll learn

- Maintainability as an NFR: how easily the system can be understood and changed safely by someone other than its original builder
- Recoverability as an NFR: how the system returns to a known-good state after an outage or data-loss event
- Why these two are grouped together despite sounding different
- Salesforce-specific maintainability and recoverability tools: source control, sandboxes, metadata documentation, and backup strategy

## Maintainability: can someone else safely change this?

**Maintainability** measures how easily a system can be understood, modified, and extended — ideally by someone other than the person who originally built it, and ideally without breaking something else in the process. It's easy to underrate because an org with poor maintainability can look completely fine from the outside: it does what it's supposed to do today. The cost shows up later, the first time a new admin or a different consultant has to change something and discovers that nothing is documented, automation logic is duplicated across six different Flows that all fire on the same object, and nobody remembers why a particular validation rule exists.

A maintainability NFR should be concrete about what "maintainable" means for this org: a maximum of one automation tool per object trigger context (to avoid order-of-execution confusion between competing Flows and triggers), every Apex class carrying header comments describing its purpose and any non-obvious business logic, a naming convention that's actually followed, and a requirement that nothing is deployed to production without first passing through version control and a documented change description. None of these are automatically true just because a Salesforce instance works — they have to be stated as requirements and checked, the same as a performance target.

## Recoverability: what happens after things go wrong

**Recoverability** measures how the system returns to a known-good state after a disruptive event — an admin accidentally deletes 50,000 records with a bad mass-update tool, a bad deployment overwrites validation rules, a bug in a custom integration silently corrupts a date field across every record for three weeks before anyone notices. Recoverability asks: once this is discovered, how do we get back to correct data, and how long does that take?

This is deliberately paired with maintainability in this course because both are about the organization's ability to safely act on the system after go-live, rather than about the system's behavior for an end user in the moment. A maintainable org with no backup strategy is still exposed to catastrophic, unrecoverable data loss; a well-backed-up org that nobody can safely change without breaking something is still expensive and risky to operate. Both failure modes point at the same root cause: insufficient investment in what happens after the initial build.

## Salesforce-specific maintainability tools

- **Source control and a deployment pipeline** (Salesforce DX, scratch orgs or sandboxes, and a CI/CD process) turn configuration and code changes into a reviewable, versioned, auditable history — rather than changes made directly in production with no record of what changed or why.
- **Sandboxes** (Developer, Developer Pro, Partial Copy, and Full sandboxes, each with different refresh intervals and data-copy scope) give teams an environment to build and test changes without touching production, which is itself a maintainability requirement: changes should be validated somewhere other than live data.
- **Clear ownership and documentation conventions** — a data dictionary, an automation inventory listing what fires on which object and in what order, and change logs — reduce the "nobody knows why this exists" failure mode that makes otherwise-simple changes risky.

## Salesforce-specific recoverability tools

- **Salesforce Backup and Restore** is Salesforce's native backup product: it supports automated backups of standard and custom object data, backups are encrypted at rest and in transit, and it supports restoring backed-up data back into an org, with logging to support auditing which backups ran and who restored what.
- **Field history tracking and Field Audit Trail** (the latter a Shield feature covered in Lesson 3) preserve a record of what a field's value used to be, which supports recovering from a bad data change by showing exactly what changed and when.
- **Third-party backup and archiving tools** are common in practice alongside or instead of native options, particularly where an org needs more granular restore capability (field-level or object-level, rather than a full org restore) or longer retention than the native product's policy windows.

A recoverability NFR should specify what has to be recoverable, within what timeframe, and from what kind of event — "accidental bulk deletion of up to 10,000 records must be recoverable within 4 business hours using the org's backup solution" is testable in a way that "we have backups" is not.

## Key terms

| Term | Meaning |
|---|---|
| Maintainability | How easily a system can be understood and safely changed, ideally by someone other than its original builder |
| Recoverability | How the system returns to a known-good state after an outage or data-loss event |
| Sandbox | A separate Salesforce environment (Developer, Partial Copy, Full, and others) used to build and test changes without touching production |
| Salesforce Backup and Restore | Salesforce's native product for automated, encrypted backups of standard and custom object data, with restore capability |
| Field history tracking | A feature that preserves a record of a field's prior values, supporting recovery and audit after a bad data change |

## Lab

A client has no source control, no sandbox strategy, and makes all configuration changes directly in production. Write a maintainability NFR and a recoverability NFR that, together, would close the biggest risks in this setup. For the recoverability NFR specifically, name the kind of event it should cover (accidental deletion, bad deployment, silent data corruption) and a maximum acceptable time to recover.

## Check yourself

Can you explain why maintainability and recoverability are grouped together in this course despite describing different things? Can you name two Salesforce-specific tools for each, and explain what gap in an unmanaged org each one closes?
