# Lesson 14 — Governance Documentation

**Chapter 3 · Architecture Practice · Lesson 14 of 16**

## What you'll learn

- Which documents a real Salesforce governance program actually needs, beyond a single "governance policy" file
- What an Architecture Decision Record (ADR) is and why it matters more than the decision it records
- How a data dictionary (introduced in Lesson 13) fits into the broader documentation set
- Why documentation that isn't kept current is often worse than no documentation at all
- Who owns keeping each document up to date, and how that connects to the roles from Lesson 9

## Documentation is a set of distinct artifacts, not one file

A common mistake is treating "governance documentation" as a single policy document that gets written once at the start of a program and referenced occasionally afterward. A working governance program actually needs several distinct kinds of documentation, each serving a different audience and updated on a different rhythm:

- **The governance charter.** The Lesson 3 strategic-level document: who has what decision rights, how the CoE is structured, how disputes escalate. Updated rarely — only when the governance structure itself changes.
- **Standards and policy documents.** The Lesson 1 release strategy, the Lesson 4 change-control policy, naming conventions, data model standards. Updated periodically as the organization's practice matures or a retrospective surfaces a gap.
- **The data dictionary.** Introduced in Lesson 13: what each field, object, and major automation is for and who owns it. Updated continuously, ideally as part of the change-control process itself rather than as a separate afterthought task.
- **Architecture Decision Records.** Covered in detail below. Created once per significant decision and essentially never edited afterward — they're a historical record, not a living document.
- **Release and change records.** The actual history of what was deployed, when, and by whom — largely generated as a byproduct of the change-control process (Lesson 4) and the deployment tooling itself, rather than written by hand.

## Architecture Decision Records (ADRs)

An **Architecture Decision Record (ADR)** is a short, standard-format document capturing one significant architectural decision: what was decided, what alternatives were seriously considered, and — critically — *why* this option was chosen over the others, written at the time the decision was made rather than reconstructed later from memory. A typical ADR is short (often one page): a title, the context that created the need for a decision, the options considered, the decision itself, and the consequences accepted by making it.

The value of an ADR isn't really the decision itself — admins and architects can usually figure out *what* was built just by looking at the org. The value is the **why**, which is exactly the thing that's impossible to recover later. Two years after a decision to use a single custom object instead of two separate ones, nobody remembers whether that was a deliberate simplification, a time-pressure shortcut, or a decision made for a business reason that no longer even applies — unless an ADR was written down at the time. Without that record, the next architect reconsidering the same area has to re-derive the reasoning from scratch, or worse, assumes there was no reasoning at all and "fixes" something that was actually a deliberate trade-off.

## Stale documentation can be worse than none

Documentation that isn't kept current creates a specific, dangerous failure mode: it looks authoritative, so people trust it, but it's wrong, so decisions made based on it are wrong too — which is actually worse than having no documentation and knowing you have to go verify the current state firsthand. A data dictionary that still lists a field as "active, owned by sales ops" three years after that team stopped using it actively misleads the next person who checks it before making a change. This is exactly why Lesson 13 recommended updating the data dictionary as part of the change process itself, rather than treating documentation upkeep as a separate task that competes with "real" work and reliably loses.

## Ownership ties back to roles

Documentation doesn't maintain itself, and "everyone's responsibility" in practice means nobody's. Ownership has to map to the roles from Lesson 9: the change owner updates the data dictionary entry for anything their change touches as part of submitting the change (not as a follow-up task); the technical architect writes the ADR for any decision significant enough to warrant one; the CoE or governance committee from Lesson 3 owns keeping the charter and standards documents current, reviewing them on the same kind of periodic cadence Lesson 13 described for debt-reduction budgeting.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A short, standard-format record of one significant architectural decision, its alternatives, and the reasoning behind the choice made |
| Governance charter | The strategic-level document defining decision rights, CoE structure, and escalation paths |
| Stale documentation | Documentation no longer reflecting current reality, which misleads readers who trust it more dangerously than having no documentation at all |

## Lab

A team is deciding whether to add a new field to an existing Account custom object or create a brand-new related object to store an emerging category of customer preference data (echoing Lesson 12's Worked Scenario 2). Write a short ADR for whichever option you'd recommend: include a title, the context, at least two alternatives considered, the decision, and the consequences you're accepting by choosing it.

## Check yourself

Can you name the five distinct kinds of governance documentation this lesson describes and the different rhythm each is updated on? Can you explain why the value of an ADR is mostly in the "why," not the "what"? Can you explain why stale documentation can be more dangerous than no documentation at all?
