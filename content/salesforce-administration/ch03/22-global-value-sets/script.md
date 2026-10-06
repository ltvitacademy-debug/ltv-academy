# Script — Global Value Sets

## Segment 1 (title)

An ordinary picklist's values belong to exactly one field on exactly one object. Fine, until the same list genuinely needs to exist in more than one place — and two separately maintained copies of the same list is exactly the kind of thing that quietly drifts out of sync. Global value sets solve that by defining the list once.

## Segment 2 (screenshot: duplicate picklist values problem)

Picture a Region picklist needed on both Lead and Contact. Build it as two separate, ordinary picklists, and you now have two independently editable lists that happen to currently match. Add a value to one and forget the other, and the two objects silently disagree about what a valid region even is.

## Segment 3 (screenshot: global value set edit)

From Setup, Picklist Value Sets opens the list of every global value set in the org, with New to start one. The edit form is the same shape as any ordinary picklist — Label, Name, a Values box — just defined in exactly one place instead of once per object.

## Segment 4 (screenshot: new custom field global picklist)

Creating a picklist field on any object now offers a choice: enter values specific to this field, or use a global picklist value set. Point it at the shared set, and every object that does the same now has exactly one source of truth.

## Segment 5 (steps: promoting an existing picklist)

Realize later a field should have been built this way? Salesforce doesn't make you start over — open the picklist, Edit, Promote to Global Value Set, give it a label. The field's current values become a new global value set other fields can point at too.

## Segment 6 (outro)

Next up: Field History Tracking, for when you need to know not just what a field's value is, but what it used to be.
