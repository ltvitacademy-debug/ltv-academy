# Custom Objects and Relationships

**Chapter 1 · Application Fundamentals · Lesson 5 of 24**

## What you'll learn

- The two-click path to creating any custom object
- What a finished custom object looks like in production
- Lookup vs. master-detail, decided by a clear rule rather than a guess
- Building Warranty_Claim__c's relationship to Asset, step by step

## Creating the object

![Object Manager's Create menu, with Custom Object highlighted.](/courses/salesforce-platform-app-builder/ch01/05-custom-objects-and-relationships/create-custom-object-menu.png)

Every custom object starts the same way: **Object Manager → Create →
Custom Object**. From there you set the Label, Plural Label, and API
Name — the same three fields regardless of what the object is for.

## What a custom object looks like once it's real

![An 'Energy Audit' custom object record, showing its custom icon, custom fields, and a lookup to a standard Account.](/courses/salesforce-platform-app-builder/ch01/05-custom-objects-and-relationships/custom-object-record-example.png)

This Energy Audit record shows the two principles from Lesson 3
working together on one page: a **custom object** with its own icon
and custom fields (Annual Energy Usage, Type of Installation), sitting
right next to a **lookup to a standard Account** — reuse and
customization, not one instead of the other.

## Lookup vs. master-detail: a clear rule, not a guess

| | Lookup | Master-detail |
|---|---|---|
| If the parent is deleted | Child survives | Child is deleted too |
| Sharing | Independent of the parent | Inherited from the parent |
| Roll-up summary fields | Not possible | Possible on the parent |

**The rule:** choose master-detail only when the child record
genuinely cannot exist without its parent. A Warranty Claim makes no
sense without the Asset it's filed against — master-detail. A Contact
can outlive the Opportunity it was once related to — lookup.

## Building the relationship

1. Create `Warranty_Claim__c` (Label, Plural Label, API Name)
2. Add a new field, type **Master-Detail Relationship**
3. Set **Related To** as `Asset`
4. Save — a **Warranty Claims** related list now appears automatically on every Asset record

No extra configuration needed for that related list to show up — it's
automatic the moment the master-detail field is saved.

## Key terms

| Term | Meaning |
|---|---|
| Object Manager | The Setup tool for creating and managing objects and fields |
| Lookup relationship | A loose parent-child link; the child survives if the parent is deleted |
| Master-detail relationship | A tight parent-child link; the child is deleted with the parent and inherits its sharing |
| Related list | The automatic list of child records shown on a parent record's page |

## Check yourself

A Contact can exist without ever being related to an Opportunity. An
Opportunity Line Item cannot exist without its Opportunity. Which
relationship type does each pairing call for, and why?
