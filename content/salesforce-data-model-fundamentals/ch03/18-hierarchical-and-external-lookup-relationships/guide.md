# Hierarchical and External Lookup Relationships

**Chapter 3 · Relationships and Schema · Lesson 18 of 23**

Lessons 16 and 17 covered the two relationship types that connect records living inside the same
Salesforce org — Lookup, Master-Detail, and the junction-object pattern built from them. This lesson
covers two narrower, more specialized variants: one that only exists on a single standard object, and
one that reaches past the edge of your org entirely.

## What you'll learn

- What makes a Hierarchical Relationship different from an ordinary self-lookup
- What an External Object is, and why it needs its own relationship type
- How an External Lookup Relationship's related list looks the same as any other — and why that matters

## Hierarchical: a relationship only the User object gets

A **Hierarchical Relationship** is a special-case Lookup that is only available on the **User**
object. It lets a User record reference another User record — most commonly to build a management
chain, where each user's "Manager" field points to another user. Salesforce restricts it to User
specifically to prevent runaway self-referencing loops on arbitrary objects, while still giving
orgs a built-in way to model "who reports to whom."

Plenty of other objects use an ordinary self-referencing **Lookup** to model their own version of a
hierarchy, without needing the dedicated Hierarchical type. Campaign is a good example — its Parent
Campaign field is a regular Lookup(Campaign), letting campaigns nest under other campaigns.

![Schema Builder showing Campaign's Parent Campaign field, a self-referencing Lookup(Campaign) that models parent/child campaigns the same way the User-only Hierarchical type models management chains.](/courses/salesforce-data-model-fundamentals/ch03/18-hierarchical-and-external-lookup-relationships/campaign-parent-campaign.png)

The distinction matters for the exam and for real org design: if a requirement says "model a
management chain on Users," that's Hierarchical. If it says "let any other object reference its own
kind," that's an ordinary self-lookup — Hierarchical isn't available outside User.

## External Lookup: reaching outside the org

An **External Object** represents data that physically lives outside Salesforce — in another
database or system, accessed live through a connection like Salesforce Connect — rather than being
copied into Salesforce's own storage. To relate an External Object to a standard or custom object (or
to another External Object), Salesforce offers a dedicated field type: **External Lookup
Relationship**, listed right alongside the familiar Lookup Relationship on the New Custom Field
wizard's Step 1.

![Step 1 of the New Custom Field wizard, with External Lookup Relationship listed in the relationship family alongside Lookup Relationship.](/courses/salesforce-data-model-fundamentals/ch03/18-hierarchical-and-external-lookup-relationships/field-type-wizard-external-lookup.png)

Unlike a standard Lookup, which matches on a Salesforce record ID, an External Lookup matches against
an **External ID** field — a value that identifies the record in the outside system. Once that
relationship field exists, the two sides behave in the UI almost exactly like a normal Lookup.

## What it looks like once it's working

An Order record's related list of OrderDetails — each one an External Object record pulled live from
an outside system — renders the same way a standard related list would, down to columns for the
External ID and the Display URL that links back to the source system's own record.

![An Order record's related list of OrderDetails, an External Object, showing each row's External ID and Display URL pulled live from an outside system.](/courses/salesforce-data-model-fundamentals/ch03/18-hierarchical-and-external-lookup-relationships/external-object-order-detail.png)

That visual sameness is deliberate — users shouldn't need to know or care whether data is stored in
Salesforce or fetched live from elsewhere; the relationship field and its related list are designed
to make the two feel identical.

## Key terms

| Term | Meaning |
|---|---|
| Hierarchical Relationship | A special Lookup available only on the User object, typically used for a manager chain |
| External Object | An object whose records live outside Salesforce and are accessed live, not stored locally |
| External Lookup Relationship | A field type connecting a standard/custom object (or another External Object) to an External Object, matched by External ID instead of record ID |

## Check yourself

A requirement asks you to let any custom object reference "its own parent of the same type," not
specifically Users. Which relationship type do you reach for, and why can't Hierarchical do the job
here?
