# Script — Create, Update and Delete Records

## Segment 1 (title)

Get Records reads. These three elements write: Create Records, Update Records, and Delete Records. Same basic shape every time — find or build a record, then act on it — but each one finds its target differently.

## Segment 2 (screenshot: create)

Create Records builds something brand new. Here it's a follow-up task — Object set to Task, field values set manually, one at a time, from whatever sources the flow has available. There's also a second option for setting values: feeding in a record variable that already holds everything you need, useful once you've assembled that data elsewhere in the flow.

## Segment 3 (screenshot: update)

Update Records has to find an existing record first, and it gives you four ways to do that. But look closely at this one — it's on a before-save flow, and only the first option, using the record that triggered the flow, actually applies. The panel says why: before save, there's no saved record yet to look up elsewhere, only the one already in memory. Switch the trigger to after-save, and the other three methods open up.

## Segment 4 (screenshot: delete)

Delete Records works the same way as the other two — specify conditions, pick the object, filter precisely. But of the three, this is the one that deserves the most caution. Test it thoroughly in a sandbox, and reserve it for records that genuinely should never have existed, not as a routine cleanup step.

## Segment 5 (steps: shared shape)

Create always builds something new. Update finds an existing record and changes it. Delete finds one and removes it — permanently. Same underlying pattern, three very different levels of risk.

## Segment 6 (outro)

Next up: Assignments — the element that actually sets the values Update Records later commits to the database.
