# Script — Security Troubleshooting and Access Reviews

## Segment 1 (title)

Last lesson covered testing a design before it ships. This one covers the other half: what to do when a real user hits a real problem after the fact.

## Segment 2 (steps: the layered order)

Salesforce evaluates access in a specific order, so troubleshoot in that order instead of jumping to the most recently changed thing: object permissions, then field-level security, then org-wide default, then role hierarchy, then sharing, then restriction rules. Can't see the record at all is almost always the middle layers. Can see the record but not one field is almost always field-level security — the two are independent, and confusing them wastes time checking the wrong layer.

## Segment 3 (steps: tools before guessing)

Before manually re-deriving someone's access, check it directly. The sharing detail view on a record lists exactly which rule or relationship grants access. A user's access summary in Setup lists every permission set and profile permission contributing to their access in one place. An object's Object Access view lists everything that grants access to it. And Login As confirms a hypothesis directly, once you have one.

## Segment 4 (code: a walkthrough)

A Tier 1 agent can't open a case just escalated to them. Object permissions check out. OWD already gives read access. Role hierarchy doesn't apply here. The actual cause, at the sharing layer: the case-team role template only grants Read, not Edit, to Tier 2 members. The fix is changing that template — not manually re-sharing the one case.

## Segment 5 (steps: access reviews)

Troubleshooting only catches what a user reports. A periodic access review is proactive: checking for users who kept access after changing roles, permission sets granted for a project that ended, anyone with View All or Modify All who shouldn't still have it, and permission sets that stack into more access than either was meant to grant alone.

## Segment 6 (outro)

A layered troubleshooting order, the built-in tools to check it directly, and a periodic review to catch what tickets never surface. Next lesson looks at the mistakes that create these problems in the first place.
