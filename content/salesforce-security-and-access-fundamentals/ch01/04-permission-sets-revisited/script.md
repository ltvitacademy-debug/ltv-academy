# Script — Permission Sets Revisited

## Segment 1 (title)

Permission sets came up briefly in the overview. This lesson covers them properly — the additive-only rule that makes them safe, and permission set groups, the way real orgs manage them at scale.

## Segment 2 (steps: additive only)

A permission set grants permissions on top of whatever the profile already provides. A user can have zero, one, or many assigned, and they only ever add — never take away something the profile grants. That asymmetry is what makes them safe to hand out liberally: stacking one more can only expand access, never shrink it unexpectedly. It's exactly the right tool for exceptions — a handful of users needing one extra piece without a whole new profile.

## Segment 3 (screenshot: Permission Set Groups list)

As the number of small permission sets grows, assigning five or six to every new hire gets tedious. A Permission Set Group bundles several into one object, assigned in a single click — a job persona built from reusable pieces. Watch the Status column: Outdated means Salesforce hasn't finished recalculating the group's combined permissions since the last change.

## Segment 4 (screenshot: group diagram)

The shape is simple — assign the group once, and the user inherits every permission set inside it automatically. There's exactly one exception to additive-only: muting, which suppresses a single permission from one member set inside the group, without touching that permission set anywhere else it's used.

## Segment 5 (outro)

Permission sets and groups are the flexible, stackable side of object access. Up next: Field-Level Security — the layer that goes narrower than CRUD, down to individual fields.
