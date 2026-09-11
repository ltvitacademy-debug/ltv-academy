# Script — OLTP vs. OLAP, Revisited

## Segment 1 (title)

Welcome to Data Modeling & Data Warehousing. Before we design anything, let's get precise about a concept T-SQL Development only previewed: what a data warehouse actually optimizes for that a transactional database doesn't.

## Segment 2 (steps: two systems, two jobs)

An OLTP system — the database behind an order-entry app or a CRM — is optimized for fast, safe writes of small individual transactions, and it's normalized specifically to make that work. An OLAP system, the kind of warehouse this course teaches you to build, is optimized for the opposite: reading large amounts of historical data, aggregated across many dimensions at once. Those are genuinely different jobs, and they call for genuinely different schema designs.

## Segment 3 (steps: why not just report off OLTP)

So why not just point your reports at the OLTP database directly? It works for a while. Normalized schemas mean a simple aggregate question can require joining eight or ten tables. Heavy analytical queries compete with the production transactions the application actually needs to stay fast. And an OLTP table usually only holds the current value of something — it's not built to answer "what was true historically," which is exactly the problem Slowly Changing Dimensions solve later in this course.

## Segment 4 (outro)

T-SQL Development told you these concepts exist. This course is where you actually design one — starting next lesson with what dimensional modeling really means.
