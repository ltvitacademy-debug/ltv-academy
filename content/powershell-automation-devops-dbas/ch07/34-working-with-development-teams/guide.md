# Working With Development Teams

Lesson 33 named the shift from gatekeeper to enabler. This lesson gets concrete about what that
looks like day to day: where in a development team's workflow a DBA actually shows up, and why
understanding how the application queries the database matters as much as understanding the
schema itself.

## What you'll learn

- Why reviewing a finished migration script is the latest, least useful point for a DBA to get
  involved
- What it looks like for a DBA to be embedded in or consulted during sprint planning
- Why knowing the application's real query patterns matters as much as knowing the schema
- What this relationship looks like once it's working

## The last-minute review problem

The traditional handoff point is late: a developer finishes a feature, writes a migration
script, and sends it to the DBA for review right before deployment. By that point the schema
decisions are already baked into weeks of application code — if the DBA spots a real problem
(a column type that won't scale, a missing index the new feature will hammer, a design that
locks a hot table), fixing it means reopening finished work under deadline pressure. The review
happens, but it happens too late to meaningfully change the outcome; at best it catches
show-stoppers, and it rarely improves the design.

## Getting into sprint planning

Moving the DBA's involvement earlier — into sprint planning or design discussions, before code
gets written — changes what kind of feedback is even possible. Instead of "this migration has a
problem," it becomes "before you build this, here's how that table is already indexed, here's
what happens to that query at ten times today's row count, here's a column type that will save
you a painful migration later." None of this requires the DBA to attend every meeting forever;
even a standing fifteen-minute slot for schema-touching stories, or a Slack channel the dev team
pings before writing a migration, moves the conversation from "review what's already built" to
"design it right the first time."

## Query patterns over schema

A DBA who only looks at `CREATE TABLE` statements sees half the picture. The other half is how
the application actually queries that schema: which columns get filtered on in the hot path,
whether a report runs an expensive aggregation on every page load or once a day in a batch job,
whether a "simple" lookup is actually an N+1 pattern firing hundreds of small queries instead of
one. A schema that looks perfectly normalized on paper can still be miserable in production if
the application's access pattern fights it — and a DBA who understands the real query pattern
can catch that before it ships, not after a customer notices the page is slow.

## What this looks like day to day

In practice this is rarely a formal process — it's a DBA who shows up to the right conversations,
asks "how will this get queried" before a table gets designed, and has enough context on the
application to give a useful answer instead of a generic one. It's a smaller time investment than
the alternative: fixing a bad design in production, under an incident, months later.

## Key terms

| Term | Meaning |
|---|---|
| Sprint planning | The team meeting where upcoming work gets scoped, before code is written |
| Query pattern | How an application actually reads and writes data — filters, frequency, access shape |
| N+1 pattern | An application firing many small queries where one well-designed query would do |

## Check yourself

A developer's migration script for a new `orders` table looks technically correct — proper
types, a primary key, foreign keys in place. Why might a DBA who was consulted during sprint
planning have caught a problem this migration review, done alone, would miss?
