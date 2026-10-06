# Script — Restriction Rules and Scoping Rules Overview

## Segment 1 (title)

Every tool so far grants access on top of a restrictive baseline. This lesson covers two tools that work the opposite direction — restriction rules and scoping rules — and the specific gap they close.

## Segment 2 (code: the gap)

Say a sharing rule grants a support team read/write on all accounts, but a handful contain sensitive data most of the team shouldn't see. Sharing rules only add access — they can't carve out an exception. That's the gap restriction rules close: they narrow what a user already has, filtering it down to records matching criteria, even past what OWD, hierarchy, or sharing would grant.

## Segment 3 (steps: restriction rule limits, honestly)

Restriction rules work on custom objects and a specific list of standard ones — contracts, tasks, events, and a few more, with limits per edition. They cannot grant access beyond what a user already has, and View All or Modify All bypasses them entirely. Confirm the current supported-object list before relying on one for a standard object not covered here, since Salesforce has expanded it release over release.

## Segment 4 (code: scoping rules, a different problem)

Scoping rules solve something adjacent: a rep with legitimate access to thousands of accounts doesn't want them all cluttering default list views and the mobile app. A scoping rule sets the default scope — "my accounts in my territory" — without removing any underlying access. The rep can still search for and open an account outside that scope.

## Segment 5 (steps: how they compare)

So: OWD is the floor, role hierarchy and sharing rules grant on top of it, restriction rules remove access a user would otherwise have, and scoping rules just change the default view while access stays the same. Restriction rules and sharing rules commonly coexist — sharing grants broad access, restriction rules carve out the sliver that should stay hidden.

## Segment 6 (outro)

Two narrowing tools, two different jobs — restriction rules for real access, scoping rules for the default view. Next lesson covers how to actually test security decisions like these, using Login As and Run As.
