# Script — How Profiles and Permission Sets Combine

## Segment 1 (title)

You've met profiles, permission sets, and field-level security separately. This lesson puts them together — exactly how Salesforce combines them into one real, effective set of access.

## Segment 2 (code: the union rule)

Effective access is the union of the profile, every permission set assigned directly, and every permission set inside every assigned group. There's no most-restrictive-wins and no last-one-applied-wins — any one grant from any one source is enough, and nothing subtracts. That's the detail that trips people up: neither a profile nor a permission set has a deny setting. The only way access doesn't exist is if nothing assigned to the user ever granted it.

## Segment 3 (screenshot: Object Access matrix)

Guessing the union by hand gets error-prone past a handful of sources. Object Manager's Object Access tab does the combining for you — switch between Permission Sets, Permission Set Groups, and Profiles to see exactly which source grants what, side by side, instead of guessing.

## Segment 4 (screenshot: ungrouped diagram)

Picture two users with permission sets assigned individually, no group involved — one holds sets A and B, the other holds B and C. Each gets the union of whatever they're specifically wired to, nothing shared beyond that.

## Segment 5 (screenshot: grouped diagram)

Group those same three sets into one Permission Set Group, and a new user assigned the group gets the union of all three in a single click — identical math, just packaged for reuse instead of wired one permission set at a time.

## Segment 6 (outro)

That's the whole object and field-level layer: CRUD, profiles, permission sets, field-level security, and how they combine. Chapter 2 starts next — which records a user can actually see, beginning with organization-wide defaults.
