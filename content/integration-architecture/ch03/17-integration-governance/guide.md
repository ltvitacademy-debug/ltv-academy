# Lesson 17 — Integration Governance

**Chapter 3 · Reliability and Operations · Lesson 17 of 28**

## What you'll learn

- What integration governance means, as distinct from the technical patterns covered in Chapter 2
- The four pillars a real integration governance program covers: an inventory, ownership, standards, and a review process
- Why "no one knows what this integration does anymore" is a governance failure, not a technical one
- How integration governance connects to this course's later lessons on documentation and architecture review

## Governance is about the integration landscape, not any one integration

Everything through Lesson 16 is about designing one integration well. **Integration governance** is the ongoing organizational discipline that keeps the entire *landscape* of integrations healthy over time — as the number of connections grows, as the people who built them move on, and as the systems on either end change. Without governance, an org accumulates exactly the kind of integration debt described in Lesson 2: connections nobody fully understands, built inconsistently, with no one accountable when something breaks.

## Four pillars of integration governance

- **An integration inventory.** A real, maintained record of every integration in the landscape — what it connects, what pattern it uses, how often it runs, and what business process depends on it. Without an inventory, an organization doesn't actually know what it has; a routine change to a field or an API version can silently break an integration nobody remembers exists, because it was never written down anywhere searchable.
- **Clear ownership.** Every integration needs a named owner — not necessarily the original developer, since people leave, but a role or team accountable for knowing what it does, monitoring whether it's healthy, and being the first call when it breaks. An integration with no owner is the technical equivalent of an orphaned asset: it keeps running until it doesn't, and then nobody is positioned to fix it quickly.
- **Standards.** A shared set of conventions for how integrations in this org get built — a standard naming convention, a required error-handling and retry approach (Lesson 16), a standard for how authentication credentials are stored (Named Credentials, Lesson 9, rather than hard-coded secrets), and a standard for how an integration is documented (Lesson 28). Standards exist so that the fiftieth integration an org builds doesn't require relearning decisions the first ten integrations already settled.
- **A review process.** A checkpoint — ideally before a new integration goes live, and periodically for existing ones — where someone with architectural authority checks a new or changed integration against the organization's standards and the four-question framework from Lesson 11, rather than letting every team build and ship independently with no cross-check. Lesson 27 covers this specific review-board skill in depth, in the context of Salesforce's own Technical Architect review board model.

## "Nobody knows what this does" is a governance failure

A specific, recognizable symptom of missing governance: an integration has been quietly running for years, the person who built it left the company long ago, nobody currently on the team is confident they know what would break if it were turned off, and the documentation — if it ever existed — is out of date or missing. This is not a technical failure of the integration itself, which may well still be running correctly. It's a governance failure: the organization lost the institutional knowledge needed to safely change, retire, or even just understand its own integration landscape, because no inventory, ownership, or documentation standard ever captured that knowledge durably in the first place.

## Where governance connects forward in this course

Integration governance isn't an abstract management topic bolted onto the end of this chapter — it's the structural link between everything in Chapters 1 and 2 (patterns, choices) and everything in Chapter 4 (applying architecture in practice). An integration landscape diagram (Lesson 23) is only trustworthy if it reflects a maintained inventory. An architecture review board (Lesson 27) is only effective if standards exist for it to check new integrations against. Integration documentation (Lesson 28) is the concrete artifact that makes ownership and institutional knowledge durable instead of living only in one person's memory.

## Key terms

| Term | Meaning |
|---|---|
| Integration governance | The ongoing organizational discipline keeping an entire integration landscape healthy as it grows and changes |
| Integration inventory | A maintained record of every integration, what it connects, and what depends on it |
| Ownership | A named role or team accountable for an integration's health, independent of who originally built it |
| Standards | Shared conventions for how integrations in an organization are built, secured, and documented |

## Lab

A mid-size company has 40 integrations built over eight years by a rotating cast of contractors, with no central inventory, no documented owners, and no consistent error-handling standard across them. Leadership wants to safely retire an old ERP system, but nobody is confident which of the 40 integrations depend on it. Propose a first-pass governance remediation plan covering all four pillars from this lesson, and explain which pillar you'd tackle first and why, given that the immediate problem is "we don't know what depends on what."

## Check yourself

Can you name the four pillars of integration governance and explain, for each, what specific failure it exists to prevent? Can you explain why "nobody knows what this integration does anymore" is described as a governance failure rather than a technical one?
