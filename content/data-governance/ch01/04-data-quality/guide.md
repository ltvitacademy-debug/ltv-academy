# Lesson 4 — Data Quality

**Chapter 1 · Governing Data · Lesson 4 of 14**

## What you'll learn

- The common dimensions of data quality (completeness, accuracy, consistency, timeliness, uniqueness) applied to Salesforce records
- How Matching Rules and Duplicate Rules work together to manage uniqueness
- Why Salesforce does not block duplicates out of the box, and what has to be configured for it to
- How Validation Rules and required fields enforce completeness and accuracy at the point of entry
- Why prevention (point-of-entry controls) is cheaper than cleanup (after-the-fact deduplication)

## The standard dimensions, applied to a Salesforce record

Data quality is usually broken into a small set of dimensions, and each one has a direct Salesforce-specific failure mode:

- **Completeness** — an Account missing an Industry value, making it impossible to segment for a campaign.
- **Accuracy** — a Contact's email address that's spelled wrong, so outreach bounces.
- **Consistency** — the same State value entered as "California," "CA," and "Calif." across different Contact records because the field is free text instead of a picklist.
- **Timeliness** — an Opportunity Close Date that was never updated after a deal actually closed weeks ago.
- **Uniqueness** — the same real-world customer existing as three separate Account records.

Each dimension calls for a different kind of control, which is why a single "data quality" initiative usually has to attack several of these at once rather than one silver-bullet fix.

## Matching Rules and Duplicate Rules — two different jobs

Salesforce manages uniqueness through two cooperating pieces of configuration. A **Matching Rule** defines *how* Salesforce should recognize that two records are probably the same real-world thing: which object it applies to (Lead, Contact, Account, or a custom object), which fields it compares (Name, Email, Phone, Billing Address), and whether the comparison is exact or fuzzy. A **Duplicate Rule** then defines *what happens* when a Matching Rule finds a potential match: it references one or more Matching Rules, sets an action (Alert the user, Block the save, or just Report it for later review), and specifies whether the rule applies through the UI, the API, or both. One object can have several Duplicate Rules pointing at different Matching Rules — for example, a name-based rule and a separate phone-based rule for Accounts, since name-only matching misses real duplicates that share a phone number but not a name.

A common misconception worth correcting directly: Salesforce does **not** block duplicate records out of the box. Standard Matching Rules exist for Lead, Contact, and Account, but they — and the Duplicate Rules that reference them — have to be activated, and a newly created org or a custom object typically has none configured at all. "Duplicate management" in Salesforce is something an org has to deliberately turn on and tune, not a default behavior.

## Finding duplicates that already exist

Duplicate Rules only evaluate records as they're created or edited going forward — they don't retroactively scan records that already exist, including ones created before the rules were activated, or ones that came in through an API path the rule wasn't configured to cover. Finding existing duplicates is a separate, batch-style activity (a Duplicate Jobs report in Setup, or a third-party/AppExchange dedupe tool for larger-scale cleanup), distinct from the ongoing prevention Duplicate Rules provide.

## Validation Rules and required fields — completeness and accuracy at the point of entry

Where Matching/Duplicate Rules target uniqueness, **Validation Rules** and the **Required** checkbox on a field target completeness and accuracy, by stopping a bad or incomplete save before it happens. A Validation Rule is a formula that must evaluate to false for a record to save — for example, blocking a save if Close Date is in the past but Stage isn't "Closed," or if an Opportunity Amount is negative. Marking a field Required forces a value to exist at all, which is the simplest possible completeness control, though it has to be used carefully: making too many fields required at the UI layer pushes users toward entering junk values just to get past the form, which trades one quality problem for another.

## Prevention beats cleanup

Every one of these controls shares a theme: it's far cheaper to stop a quality problem at the point of entry than to find and fix it after thousands of bad records already exist, downstream reports have already been built on top of them, and other systems have already synced the bad data outward. A governance program's practical job in this area is less about running periodic cleanup projects (though those are sometimes necessary) and more about getting the point-of-entry controls — Matching/Duplicate Rules and Validation Rules — configured and actually activated before bad data accumulates.

## Key terms

| Term | Meaning |
|---|---|
| Matching Rule | Defines how Salesforce detects that two records likely represent the same real-world entity (object, fields compared, exact/fuzzy) |
| Duplicate Rule | Defines what action (Alert, Block, Report) to take when a Matching Rule finds a potential duplicate |
| Validation Rule | A formula-based save-time check that blocks a record from saving if the formula evaluates to true for a bad state |
| Duplicate Jobs | A batch tool for finding duplicates among records that already exist, separate from ongoing Duplicate Rule prevention |
| Point-of-entry control | A rule enforced at the moment data is created or edited, rather than after the fact |

## Lab

A client's Salesforce org has never activated any Duplicate Rules, and a Lead import six months ago created roughly 2,000 duplicate Lead records. Propose a two-part plan: (1) the ongoing-prevention piece (which Matching Rule fields and Duplicate Rule actions you'd configure for Leads going forward, and why you'd choose Alert vs. Block for this object), and (2) the existing-duplicates piece (what kind of tool or process is appropriate for the 2,000 already-created duplicates, and why it's a separate effort from part 1).

## Check yourself

Can you explain the difference between a Matching Rule and a Duplicate Rule, and why Salesforce needs both rather than just one? Can you explain why Duplicate Rules alone wouldn't have caught the 2,000 Leads in the lab scenario above?
