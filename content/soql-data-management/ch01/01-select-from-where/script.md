# Script — SELECT, FROM & WHERE

## Segment 1 (title)

This course is the T-SQL-to-Salesforce bridge. It assumes the SQL you already know and teaches how those same ideas work, and where they differ, in SOQL — Salesforce's own query language.

## Segment 2 (code: the shape is genuinely familiar)

SELECT Name, Amount, StageName FROM Opportunity WHERE StageName equals Closed Won. If you can read T-SQL, you can read that. Fields instead of columns, objects instead of tables, records instead of rows — the terminology changes, the logic doesn't.

## Segment 3 (code: no SELECT star)

SOQL has no SELECT star. Every field has to be named explicitly — a deliberate constraint tied to how Salesforce bills API usage and enforces query governor limits. Get in the habit of always including Id, the record's real unique identifier.

## Segment 4 (outro)

WHERE works exactly like T-SQL, but the real skill is knowing your org's actual field values — which is exactly why the data model chapter in the last course mattered. Next up: ORDER BY and LIMIT.
