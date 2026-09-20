# Script — Object Relationships

## Segment 1 (title)

Almost no useful question an analyst answers lives inside a single object. This chapter is about how Salesforce objects connect to each other — because that's exactly what SOQL joins operate on in the next course.

## Segment 2 (code: a foreign key, with opinions)

Underneath the UI, a relationship field is the same idea as a SQL foreign key: a field on one object storing the ID of a related record on another. An Opportunity's AccountId points at an Account. But in Salesforce, the type of relationship you pick changes real behavior — what happens on delete, how security is inherited, whether roll-ups are even possible.

## Segment 3 (steps: three shapes)

There are three shapes you'll meet. Lookup relationships are loose and optional. Master-Detail relationships are tight and required, with cascade delete and inherited security. And for many-to-many, Salesforce has no native field type — you build a junction object with two Master-Detail relationships instead.

## Segment 4 (outro)

The next lesson digs into the precise, non-negotiable distinction between Lookup and Master-Detail — because that distinction governs delete behavior and security every single time you meet it in a real org.
