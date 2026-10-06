# Global Value Sets

**Chapter 3 · Objects and Layouts · Lesson 22 of 36**

An ordinary picklist's values belong to exactly one field on exactly one object. That's fine
until the same list of values genuinely needs to exist in more than one place — and two
separately maintained copies of the same list is exactly the kind of thing that quietly drifts
out of sync. **Global value sets** solve that by defining the list once.

## What you'll learn

- The problem global value sets solve, concretely
- Where to create and manage a global value set
- How to base a new picklist field on one
- How to promote an existing picklist to a global value set after the fact

## The problem: the same values, more than once

Picture a "Region" picklist that needs to exist on both Lead and Contact — North America, South
America, Europe, Asia, Australia, Africa, Antarctica. Build it as two separate, ordinary custom
picklists and you now have two independently editable lists that happen to currently match. Add
a value to one and forget the other, and the two objects silently disagree about what a valid
region even is.

![Two Object Manager field pages side by side — Lead and Contact — each showing a "Values" related list with identical region values (North America, South America, Europe, Asia, Australia, Africa) boxed in matching colors, with "Antarctica" boxed in red on only one of the two.](/courses/salesforce-administration/ch03/22-global-value-sets/duplicate-picklist-values-problem.png)
*Two lists that look the same today, maintained separately — exactly the setup that drifts out of sync later.*

## Creating a global value set

From Setup, enter **Picklist Value Sets** in the Quick Find box, which opens the **Picklist
Value Sets** list — every global value set defined in the org, with a **New** button to start
one. The edit form is the same shape as any ordinary picklist: a Label, a Name, and a multi-line
Values box, one value per line, with options to sort alphabetically and set the first value as
default.

![A "Global Value Set" edit form: Label "Sub-Industry," Name "Sub_Industry," and a Values textarea listing Retail - Clothing, Retail - Accessories, Retail - Toys & Games, Retail - Household Goods, Retail - Sporting Goods, one per line.](/courses/salesforce-administration/ch03/22-global-value-sets/global-value-set-edit.png)
*Defined once, here — not once per object that needs it.*

## Using it on a field

When creating a new picklist field on any object, the field wizard offers a choice: **Enter
values, with each value separated by a new line** (an ordinary, object-specific picklist) or
**Use a global picklist value set**, which points the field at a value set defined once and
shared.

![A "New Custom Field" wizard on Lead, Step 2, with the "Use global picklist value set" radio button selected and a picklist showing "Sub-Industry," plus "Restrict picklist to the values defined in the value set" checked.](/courses/salesforce-administration/ch03/22-global-value-sets/new-custom-field-global-picklist.png)
*Every object that points a field at the same global value set now shares exactly one source of truth.*

## Promoting an existing picklist

If you only realize later that a field should have been built this way, Salesforce doesn't make
you start over: open the existing picklist field, click **Edit**, then **Promote to Global Value
Set**, give it a label, and confirm. The field's current values become a new global value set
that other fields can now point at too.

## Key terms

| Term | Meaning |
|---|---|
| Global value set | A list of picklist values defined once and shared across multiple fields/objects |
| Picklist Value Sets | The Setup page listing and managing every global value set in the org |
| Restrict picklist to the values defined in the value set | The option keeping a field's values locked to exactly the global set |
| Promote to Global Value Set | The action converting an existing field-specific picklist into a shared global value set |

## Check yourself

A "Region" value is added to a global value set used by both Lead and Contact. Does the admin
need to separately add that value to each object's picklist field?
