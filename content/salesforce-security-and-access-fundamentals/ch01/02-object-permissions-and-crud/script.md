# Script — Object Permissions and CRUD

## Segment 1 (title)

CRUD is the base layer of object-level access in Salesforce, checked before anything about a specific record comes into play. This lesson breaks down exactly what those four letters control.

## Segment 2 (code: the four permissions)

Create, Read, Edit, Delete — each one independent. A user can have Read and Edit on Opportunity without Create or Delete, which is exactly the setup for reps who update deals but shouldn't add duplicates or remove history. Above those four sit View All and Modify All — administrative overrides that bypass record-level sharing entirely rather than working within it. Granting Modify All is effectively edit access to the whole table.

## Segment 3 (screenshot: Object Access matrix)

Object permissions live on profiles and permission sets, never on a role. Object Manager's Object Access tab is the real source of truth — Create, Read, Edit, Delete, View All, and Modify All as separate columns, checked independently per profile or permission set group.

## Segment 4 (screenshot: User Profiles list)

One more wrinkle: since Winter '21, CRUD on standard objects for standard profiles is locked down — only custom profiles let an admin edit those attributes directly. That's why real CRUD configuration today happens mostly through custom profiles and permission sets, not the standard ones Salesforce ships.

## Segment 5 (outro)

CRUD answers what a user can do with an object at all. Up next: Profiles, revisited — the mandatory baseline every one of these settings lives on.
