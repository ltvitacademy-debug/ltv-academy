# Script — Many-to-Many Relationships and Junction Objects

## Segment 1 (title)

Lesson 16 ended with Favorite holding both a Lookup and a Master-Detail at once — one object, two parents. That wasn't an accident. It's the exact pattern Salesforce uses to model many-to-many.

## Segment 2 (screenshot: junction object with legend)

A single Master-Detail field only ever points to one parent. That's fine for one-to-many, but it breaks when two objects each need to relate to many records of the other — a Session can have many Speakers, and a Speaker can speak at many Sessions. The fix is a junction object built with two Master-Detail relationships, one to each side. Session Speaker here carries a Master-Detail to Session and a separate Master-Detail to Speaker.

## Segment 3 (screenshot: Favorite and Offer)

Lesson 16's Favorite object fits the same pattern once Offer joins it. Both link Contact to Property — Favorite tracks who likes which property, Offer tracks who's bid on it. A Contact can have many of each; a Property can collect many of each back.

## Segment 4 (screenshot: Object Manager detail)

A junction object is still a normal object in Object Manager — its generated Master-Detail field even carries the parent's name in its type. And because it's a real Master-Detail, deleting the parent deletes every junction record pointing at it, same as any other Master-Detail child.

## Segment 5 (screenshot: related list)

To an end user, none of this plumbing shows. A junction-object related list looks exactly like any other related list — a record with a list of related things, full stop.

## Segment 6 (outro)

Next up: two more relationship variants — Hierarchical, which only exists on the User object, and External Lookup, which reaches outside Salesforce entirely.
