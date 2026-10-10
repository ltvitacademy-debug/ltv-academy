# Lesson 2 — Data Ownership

**Chapter 1 · Governing Data · Lesson 2 of 14**

## What you'll learn

- The difference between record ownership (a Salesforce security mechanism) and data ownership (a governance accountability)
- How Organization-Wide Defaults and the role hierarchy implement record-level ownership, and why that's a different question from business accountability
- Why a single Account or Contact object usually needs one named business data owner, even though many people touch its records
- How to resolve disputes when two business functions both have a stake in the same object's data
- A concrete way to document data ownership so it survives staff turnover

## Two different things both called "ownership"

Salesforce has a built-in concept called record ownership: every record has an `OwnerId`, Organization-Wide Defaults set the baseline visibility for an object, and the role hierarchy lets ownership grant access upward through managers. This is a **security and access mechanism** — it controls who can see and edit a specific record. **Data ownership**, the governance concept this lesson is about, is a different question entirely: who is accountable, at the business level, for a *type* of data being accurate, consistently defined, and fit for its intended use across the whole org — regardless of which individual user happens to own any one record. A sales rep owns (in the Salesforce sense) the hundred Account records in her territory. She is very unlikely to be the data owner (in the governance sense) for the Account object as a whole — that's a role with authority over definitions and standards, not day-to-day record handling.

## Why one object usually needs one named owner

Account data in a typical company is touched by Sales (who creates and updates it), Marketing (who enriches it with firmographic data), Finance (who needs accurate billing details), and Support (who logs cases against it). If no one is accountable for the Account object's data as a whole, each function optimizes for its own use and the data drifts: Sales leaves the Industry field blank because it doesn't affect a deal closing, Marketing can't segment campaigns reliably, Finance occasionally bills the wrong legal entity. A named data owner — typically a senior business stakeholder, not a Salesforce admin — has the authority to settle which fields are required, what "duplicate" means for this object, and whose use case wins when two departments want contradictory things from the same field. The admin still builds the Validation Rule or Duplicate Rule; the data owner decides what that rule should actually enforce.

## Resolving ownership disputes

The hardest real cases are objects two functions both feel they own. A common one: who owns the Contact object when Sales treats it as "people I'm selling to" and Marketing treats it as "people in my nurture database"? The resolution is rarely "pick a winner" — it's usually to split accountability by *attribute* rather than by object: Sales might own what counts as a qualified Contact's sales-readiness fields, Marketing might own consent and subscription-status fields, and both report into a shared governance body (covered in Chapter 3) when the split itself is contested. What matters is that the split is written down and agreed, not re-litigated every time a conflict surfaces.

## Documenting ownership so it survives turnover

A data ownership assignment that lives only in one person's head disappears the day they change roles. The durable version is a simple, maintained register — one row per major object (Account, Contact, Opportunity, Case, and key custom objects) naming: the business data owner (a role or title, not just a name), the data steward who does the technical maintenance, and the date the assignment was last reviewed. This register doesn't need to be fancy — a tracked spreadsheet or a Salesforce custom object works — but it needs an owner of its own (usually the governance committee from Chapter 3) and a recurring review, or it goes stale exactly the way an un-reviewed classification label does.

## Key terms

| Term | Meaning |
|---|---|
| Record ownership | Salesforce's technical mechanism (OwnerId, OWD, role hierarchy) controlling who can see and edit a specific record |
| Data ownership | The business-level accountability for a data type's accuracy, definition, and fitness for use, independent of who owns any individual record |
| Data owner | The named business stakeholder with authority to decide standards and resolve disputes for a given object's data |
| Data steward | The role that carries out the data owner's decisions technically (covered in depth next lesson) |
| Ownership register | A maintained document naming the data owner and steward for each major object, reviewed on a schedule |

## Lab

Your company's Account object is used by Sales (deal pipeline), Marketing (firmographic segmentation), and Finance (billing/legal entity). No data owner has ever been named. Draft a one-paragraph recommendation for who should be the Account data owner and why, name one attribute-level split you'd propose if Finance and Sales disagree about a required field, and sketch the three columns your ownership register would need to track this decision over time.

## Check yourself

Can you explain why a sales rep who owns a hundred Account records in Salesforce is not automatically the Account object's data owner in the governance sense? Can you describe one realistic way to resolve a dispute between two departments that both believe they own the same object's data?
