# Lesson 14 — Data Ownership

**Chapter 3 · Ownership and Consistency · Lesson 14 of 26**

## What you'll learn

- Why "who owns this data?" is a governance question before it's a technical one
- The difference between a data owner, a data steward, a system owner, and a business process owner
- Where ownership conflicts actually surface on a shared object like Account or Contact
- How to resolve an ownership dispute with a RACI model instead of whoever escalates loudest
- Why an architect cares about ownership at all — it decides who can approve a schema change

## Ownership is a decision right, not a job title

In a single-department org, ownership questions rarely come up — there's one team using the data, and whoever runs that team makes the call. Enterprise Salesforce orgs don't work that way. The same Account record is read and written by Sales, Service, Marketing, Finance, and sometimes Legal, each with a different idea of what the object should look like and who gets to change it. **Data ownership** is the decision right over a specific dataset: who is accountable for its accuracy, who approves changes to its structure, and who gets the final word when two teams disagree about what a field should mean. Ownership is not "whoever created the object" or "whoever has admin access" — it's an assigned accountability, and in a mature architecture it's written down, not inferred from org charts.

## Four roles that get confused with each other

- **Data owner.** The business-side role accountable for a dataset's accuracy and fit for purpose. For the Account object, this is often a VP of Sales Operations or a Customer Data lead — someone who answers for the data's quality, not someone who writes Apex.
- **Data steward.** The person who does the day-to-day work of keeping the data correct: resolving duplicates, fixing malformed addresses, running dedup jobs. The steward executes what the owner is accountable for.
- **System owner.** The person accountable for the platform itself — in this case, the Salesforce org. The system owner cares about uptime, licensing, release management, and technical architecture, not whether the Industry field is populated correctly.
- **Business process owner.** The person accountable for a process that happens to touch the data — the lead-to-opportunity process, for example — without necessarily owning any specific object. A business process owner can care deeply about a field without being its data owner.

These four roles are frequently held by different people, and conflating any two of them is where ownership structures break down. A system owner (a Salesforce admin, say) often ends up making data-ownership decisions by default simply because they're the one with the access to make the change — not because they're the right person to decide it.

## Where ownership conflicts actually show up

Ownership disputes rarely show up as abstract philosophy — they show up as a change request. Marketing wants to add forty custom fields to Account for campaign-attribution scoring. Sales says the page is already too cluttered and the new fields will make duplicate detection worse, since reps will start creating new Accounts rather than hunting through a crowded layout. Finance wants a "Billing Hold" checkbox that only they should be able to set, but it needs to be visible (not necessarily editable) to Service so reps don't promise a refund timeline that Finance has already blocked. None of these are technical disagreements — they're ownership disagreements dressed up as field requests, and without an assigned data owner for Account, the dispute gets resolved by whichever team has the loudest sponsor or the admin with the most spare capacity.

## A RACI model for ownership disputes

The standard fix is a RACI matrix applied at the object or field-group level — spelling out who is **Responsible**, **Accountable**, **Consulted**, and **Informed** for a given piece of data, before the next field-request fight happens, not during it.

| Role | On the Account object |
|---|---|
| Responsible (does the work) | Data steward — runs dedup, enforces data-entry standards |
| Accountable (owns the outcome) | Data owner — a single named business role who approves structural changes |
| Consulted (asked before a change) | Every department that reads or writes the object — Sales, Service, Marketing, Finance |
| Informed (told after a change) | Downstream teams whose reports or integrations depend on the object's shape |

The critical property of this model is that **Accountable** is a single name, not a committee. Consulted can be — and usually is — several departments. But when Marketing and Sales disagree about the forty new fields, the data owner is the one who makes the call, after consulting both sides, and that call is final unless escalated to a governance body above them.

## Ownership and schema governance

This is why data ownership belongs in an architecture course and not just an org-chart slide: every schema-governance process a Salesforce architect designs — change approval boards, field-request intake forms, sandbox-to-production promotion gates — ultimately routes a decision to *someone*. If that someone was never explicitly assigned, the process either stalls waiting for a decision-maker to emerge, or it gets decided by whoever happens to have System Administrator access. Assigning data ownership explicitly, object by object, is cheap. Discovering you don't have an owner in the middle of a cross-departmental field dispute is not.

## Key terms

| Term | Meaning |
|---|---|
| Data owner | The accountable business-side role who approves structural and quality decisions for a dataset |
| Data steward | The role who performs the day-to-day work of keeping data accurate |
| System owner | The role accountable for the platform (the Salesforce org) itself, distinct from the data on it |
| Business process owner | The role accountable for a business process that touches the data, without owning the data itself |
| RACI matrix | A model assigning Responsible, Accountable, Consulted, and Informed roles for a decision |

## Lab

A global manufacturer runs one Salesforce org shared by Sales, Service, and Marketing, all of whom read and write the Account object. Marketing has submitted a change request for forty new custom fields to support a campaign-scoring model. Sales has objected, citing page clutter and a rise in duplicate Accounts. There is currently no assigned data owner for Account — change requests have historically been approved by whichever admin picks up the ticket first. Draft a short ownership proposal: name the role (not a specific person) that should hold Accountable for Account, list who should be Consulted, and describe the one process change that would have prevented this specific dispute from reaching a stalemate.

## Check yourself

Can you explain the difference between a data owner, a data steward, a system owner, and a business process owner using a role other than the ones in this lesson's examples? Can you describe why "Accountable" in a RACI matrix must be a single role rather than a committee, using the Marketing-versus-Sales scenario above?
