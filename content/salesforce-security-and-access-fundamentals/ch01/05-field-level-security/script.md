# Script — Field-Level Security

## Segment 1 (title)

Object permissions say whether a user can touch an object at all. Field-level security goes one level narrower — whether they can see or edit one specific field on it, independent of everything else they can do.

## Segment 2 (screenshot: Field Permissions table)

FLS is set per field, per profile or permission set, with two independent checkboxes — Read Access and Edit Access. A user with full Edit on Account can still be fully blocked from one sensitive field, like a Social Security Number or an internal risk score, without touching their object-level permissions at all. Notice the greyed-out rows too — Owner, Created By, Last Modified By — system fields FLS structurally can't restrict.

## Segment 3 (screenshot: Set FLS from field)

FLS can also be set starting from the field itself, in Object Manager — Set Field-Level Security shows every permission set and profile touching this object, each with its own Read and Edit checkboxes for just this field. That's the fastest way to lock one newly-created field everywhere at once, instead of hunting through each permission set individually.

## Segment 4 (code: the one rule)

There's one rule FLS enforces for you: Edit Access always implies Read Access, and unchecking Read Access clears Edit Access with it. You can never edit a field you can't see — the UI won't let that combination persist.

## Segment 5 (outro)

Object CRUD plus field-level security together define everything a user can do. Up next: how profiles and permission sets actually combine into one effective set of access.
