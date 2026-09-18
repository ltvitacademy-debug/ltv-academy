# Script — Compliance Patterns

## Segment 1 (title)

Governance and compliance get used as buzzwords, but a real compliance requirement is almost always one specific question: who accessed this data, when, and were they authorized to at that time — an actual query someone can run and get a real answer to.

## Segment 2 (code: three signals combined)

Audit logs tell you who touched a table and when, but not whether they should have. Lineage tells you what's exposed if a source table is exposed, but not who actually queried it. Access control state tells you what a user was entitled to see, but not whether they actually ran a query. None of the three answers the real question alone.

## Segment 3 (code: worked example)

Take a real auditor's question: did anyone outside the approved group ever see an unmasked SSN in Q3. Answering it means querying the audit log for every relevant SELECT, checking what group each user belonged to at that exact timestamp, and cross-referencing what masking policy was actually active on that column at that same moment — not what's active today.

## Segment 4 (code: frameworks don't invent new mechanics)

GDPR, HIPAA, SOC 2 — each specifies retention periods and response obligations, but none of them invent a new technical mechanism. They all rest on the same backbone: can you actually answer who accessed what, when, and was it authorized, on demand.

## Segment 5 (outro)

Chapter 6 is complete: row and column security at scale, Delta Sharing, secrets, and now a real compliance answer built from all of it. Next up, Chapter 7, the course's final chapter — DP-750 exam prep and the capstone project.
