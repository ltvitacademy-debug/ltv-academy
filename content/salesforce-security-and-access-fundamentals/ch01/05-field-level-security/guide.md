# Lesson 5 — Field-Level Security

**Chapter 1 · The Security Model · Lesson 5 of 24**

## What you'll learn

- Why FLS exists even when a user has full object-level Edit access
- Read Access and Edit Access as independent checkboxes, per field, per profile or permission set
- The system fields FLS can't touch, and why
- Where to configure it: from the field itself, or from a profile/permission set

## The layer below the object

Object permissions (Lesson 2) say whether a user can touch the Account
object at all. **Field-Level Security (FLS)** goes one level narrower:
whether that same user can see or edit one *specific field* on that
object. A user with full Edit access on Account can still be completely
blocked from a single sensitive field — Social Security Number, a
compensation figure, an internal risk score — without touching their
object-level permissions at all.

FLS is set **per field, per profile or permission set**, with two
independent checkboxes:

- **Read Access** — can the user see the field's value at all
- **Edit Access** — can the user change it (requires Read Access first)

## What it looks like in practice

The real Field Permissions table shows exactly this: a list of fields down
the side, Read Access and Edit Access as two separate checkbox columns.
Some rows — Created By, Last Modified By, Owner — show **greyed-out,
locked checkboxes**: system fields that FLS structurally can't restrict,
because Salesforce needs to always report who created or owns a record.
Sensitive custom fields like Social Security Number can be left fully
unchecked, invisible to that profile or permission set entirely.

![A Field Permissions table — Read Access and Edit Access as independent columns per field; note Email and Social Security Number left unchecked, and Owner/Created By/Last Modified By greyed out as un-restrictable system fields.](/courses/salesforce-security-and-access-fundamentals/ch01/05-field-level-security/field-permissions-table.jpg)

## Setting it from the field side

FLS can also be set starting from the field itself rather than from a
profile: open the field in Object Manager, and **Set Field-Level
Security** shows every permission set and profile that grants object
permissions on that object, each with its own Read/Edit checkboxes for
this one field — useful when you need to lock a single newly-created field
across every permission set at once, instead of hunting through each one
individually.

![Set Field-Level Security for the Job Category field — one row per permission set, Read Access and Edit Access as separate checkboxes, reachable directly from the field in Object Manager.](/courses/salesforce-security-and-access-fundamentals/ch01/05-field-level-security/set-fls-job-category.jpg)

## Edit requires Read

Edit Access with Read Access unchecked isn't a valid combination FLS
allows to persist — you can't let a user change a value they can't see.
Checking Edit Access automatically implies Read Access; unchecking Read
Access clears Edit Access with it. This is enforced by the FLS UI itself,
not something an admin has to remember to maintain by hand.

## Key terms

| Term | Meaning |
|---|---|
| Field-Level Security (FLS) | Per-field Read/Edit access, set per profile or permission set |
| Read Access | Can see the field's value |
| Edit Access | Can change the value; requires Read Access |

## Check yourself

A field shows Edit Access checked and Read Access unchecked after a bulk
metadata deployment. What should you expect Salesforce to have actually
done with that combination, and why?
