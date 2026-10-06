# Roll-Up Summary Fields and Junction Objects

**Chapter 3 · Business Logic · Lesson 16 of 24**

A roll-up summary field aggregates values from child records onto the master — a count, sum, minimum, or maximum, maintained automatically and stored on the parent. Unlike a formula field, its value *is* saved to the database, which is exactly what makes it possible in the first place: it requires a **master-detail relationship**, the one relationship type strict enough for Salesforce to guarantee the aggregate stays correct.

## What you'll learn

- Why roll-up summary fields require master-detail, not lookup, relationships
- The four aggregate types and how to filter which children count
- What a junction object is and why it's the standard many-to-many pattern
- The real limitation: roll-ups only reach one level, and the common workarounds

## Building a roll-up summary field

From the **master** object, create a new field of type **Roll-Up Summary**, choose the child (detail) object and relationship, then pick:

- **COUNT** — number of child records
- **SUM** — total of a numeric field on the children
- **MIN** / **MAX** — smallest or largest value of a numeric, currency, or date field on the children

Optionally add filter criteria, so only matching child records count — for example, summing only child `Line_Item__c` records where `Status__c != "Cancelled"`. The result recalculates automatically whenever a child record is created, updated, or deleted (or reparented).

## Why it must be master-detail

A lookup relationship is loose by design: the child can exist with the parent field blank, and deleting the parent doesn't force the child to go. A roll-up summary needs a relationship where the child is guaranteed to belong to exactly one parent and can't be orphaned — that's what master-detail enforces, along with cascading delete and inherited sharing. Lookup relationships can't host a native roll-up summary field at all (Flow or the AppExchange's Declarative Lookup Rollup Summary tool can substitute, covered in the next chapter's Flow work).

## Junction objects: the many-to-many pattern

A master-detail relationship is inherently one-to-many: one Account has many Contacts. Many real requirements are many-to-many — many students enroll in many courses, many contacts play many roles on many opportunities. The standard declarative pattern is a **junction object**: a custom object with *two* master-detail relationships, one to each side of the many-to-many.

Example: `Enrollment__c` has a master-detail to `Student__c` and a second master-detail to `Course__c`. Each enrollment row represents one student in one course. Because `Enrollment__c` is the detail of two separate master-detail relationships, you can put a roll-up summary on `Course__c` that counts `Enrollment__c` records — "how many students are enrolled in this course" — and a separate roll-up on `Student__c` counting the same junction object from its own relationship — "how many courses is this student taking." Salesforce ships one junction object out of the box for exactly this reason: `OpportunityContactRole`, linking Opportunities and Contacts many-to-many.

## The one-level limit

A roll-up summary field only reaches its **direct** children — one level down. It cannot roll up a grandchild's values straight to a grandparent (Course can't directly roll up a field that lives on something two hops below `Enrollment__c`). The declarative workarounds are: a second roll-up summary one level up the chain (roll up to the middle object, then roll up *that* roll-up to the top), a formula field combined with a roll-up where the math allows it, or — once Chapter 3's Flow lesson is covered — a Flow that loops through records and performs the aggregation imperatively. For genuinely complex multi-level aggregation, many orgs install the Declarative Lookup Rollup Summary (DLRS) AppExchange package, which uses Apex and triggers under the hood to roll up across lookup relationships and deeper hierarchies that native roll-ups can't reach.

## SQL mapping

```sql
SELECT CourseId, COUNT(*) AS EnrollmentCount
FROM Enrollment
WHERE Status != 'Cancelled'
GROUP BY CourseId
```

A roll-up summary is this `GROUP BY` aggregate, pre-computed and stored on the parent row instead of calculated at query time.

## Recap

Roll-up summary fields aggregate COUNT/SUM/MIN/MAX from direct children, and they require a master-detail relationship because only that relationship guarantees the integrity the aggregate depends on. Junction objects — two master-detail relationships on one custom object — are the standard way to model many-to-many and still get native roll-ups on both sides. The native limit is one level; deeper aggregation needs a second roll-up, Flow, or a tool like DLRS.

## Check yourself

A `Project__c` object needs to know how many `Task__c` records are overdue. `Task__c` is detail in a master-detail to `Project__c`. Describe the roll-up summary field you'd create, including its type and filter criteria.
