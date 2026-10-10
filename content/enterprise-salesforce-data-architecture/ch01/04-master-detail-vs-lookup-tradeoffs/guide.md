# Lesson 4 — Master-Detail vs. Lookup Tradeoffs

**Chapter 1 · Enterprise Data Modeling · Lesson 4 of 26**

## What you'll learn

- Exactly what master-detail controls that lookup doesn't: deletion, ownership, sharing, and page layout requirement
- Why reparenting and relationship-type conversion are restricted, and what that means for a model's flexibility
- The real tradeoff: structural integrity and roll-up summaries vs. independence and flexibility
- A decision framework for choosing between the two on a real project

## What master-detail actually controls

Lesson 3 introduced master-detail as the "tight" relationship type. Concretely, per Salesforce's own object reference documentation, a master-detail relationship does four specific things a lookup never does:

1. **Cascade delete.** "When a record of the master object is deleted, its related detail records are also deleted." Delete the Policy, and every Payment__c record under it is gone too — no confirmation, no partial state.
2. **Forced ownership and sharing inheritance.** "The Owner field on the detail object isn't available and is automatically set to the owner of its associated master record." Detail records can't have their own sharing rules, manual sharing, or queues, because those mechanisms all require an independent Owner field — and a detail record doesn't have one. It inherits whatever the master's sharing and security settings say.
3. **Required relationship field on the layout.** The master-detail field is required on the detail record's page layout. A detail record can never exist as an orphan; it must always point to a master.
4. **Restricted reparenting.** By default, a detail record's master can't be changed once set. Administrators can turn on an "Allow reparenting" option for custom-object master-detail relationships specifically, but that's an explicit override of the default, not the default behavior itself.

A lookup relationship does none of these. Deleting the parent in a lookup relationship leaves the child record intact (with its lookup field now blank or, depending on configuration, blocked from deletion). The child keeps its own Owner, its own sharing, and its lookup field is optional unless you add a validation rule to require it.

## The feature that tips many decisions: roll-up summaries

The single most common reason architects choose master-detail over lookup is a feature that literally does not exist on lookup relationships: the roll-up summary field. Per Salesforce Help, a roll-up summary field "calculates values from related records... The detail record must be related to the master through a master-detail relationship." There is no native equivalent for lookups — if you need Salesforce to automatically keep a count, sum, minimum, or maximum of child records up to date on the parent without custom automation, master-detail is the only relationship type that offers it natively.

This creates a real strategic tension: a relationship might be conceptually "loose" — two objects that don't strictly depend on each other for their existence — but a business requirement for an automatic roll-up pulls the decision toward master-detail anyway, because that's where Salesforce puts the feature. Lesson 6 covers roll-up summary mechanics and limits in depth; what matters here is that this single capability is often the deciding factor in the master-detail-vs-lookup conversation, more than the conceptual "ownership" question.

## The cost of that tightness

Master-detail isn't free. Once you've attached a roll-up summary field to a master-detail relationship, Salesforce blocks converting that relationship to a lookup — the decision becomes effectively permanent for that object. Cascade delete is also a sharper tool than it looks: a single master record deletion can silently remove a large, deeply nested tree of detail records across several master-detail generations, with no native "are you sure" step beyond Salesforce's standard delete confirmation and recycle bin window. And because detail records can't have independent sharing, master-detail is the wrong choice whenever the business genuinely needs detail records visible or ownable independently of their parent — for example, a Case that needs its own queue-based assignment shouldn't be forced into a master-detail relationship with Account just because "every Case belongs to an Account" sounds structurally tidy.

## A decision framework

Ask these questions, roughly in this order:

1. **Can the child record meaningfully exist without the parent?** If yes, lean lookup. If the child is genuinely meaningless on its own (a line item without an order), lean master-detail.
2. **Does the child need its own ownership, queues, or sharing rules independent of the parent?** If yes, that's incompatible with master-detail — lookup is required, or you need a different model entirely.
3. **Does the business need an automatic roll-up (count, sum, min, max) from child to parent?** If yes and the relationship can tolerate master-detail's other constraints, this is often the deciding factor toward master-detail.
4. **Is this relationship stable, or will the "parent" plausibly need to change over the record's lifetime?** Master-detail's default no-reparenting behavior fits relationships that are set once and don't move; frequent reparenting needs are a signal toward lookup, or toward deliberately enabling the reparenting override.

## Key terms

| Term | Meaning |
|---|---|
| Cascade delete | Deleting a master-detail parent record automatically deletes its detail (child) records |
| Ownership inheritance | A master-detail detail record has no independent Owner field; it takes its master's owner and sharing |
| Reparenting | Changing which master record a detail record is linked to; restricted by default on master-detail relationships |
| Roll-up summary field | A field on a master-detail relationship's master object that aggregates (COUNT, SUM, MIN, MAX) values from its detail records |

## Lab

A logistics company is modeling Shipments and Shipment_Line_Items__c (each line item represents one package within a shipment). The operations team wants: (1) a running count and total weight of line items visible on the Shipment record at all times, (2) line items that are never reassigned to a different shipment once created, and (3) line items that should never be visible or editable by anyone who can't already see the parent Shipment. Using the decision framework above, determine whether this should be master-detail or lookup, and justify your answer against all three stated requirements, not just one of them.

## Check yourself

Can you list the four specific things a master-detail relationship controls that a lookup relationship does not? Can you explain why a business requirement for an automatic roll-up summary often becomes the deciding factor in a master-detail-vs-lookup decision, even when the relationship otherwise feels conceptually "loose"?
