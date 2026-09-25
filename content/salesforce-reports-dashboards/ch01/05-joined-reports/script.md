# Script — Joined Reports

## Segment 1 (title)

The joined report is the most unusual of the four formats. Instead of one result, it puts several report blocks side by side, so you can compare things a single report type can't hold.

## Segment 2 (screenshot: three case blocks)

Here's a real joined report. All three blocks use the Cases report type, but each has its own filter: closed cases, new cases, and working or escalated cases. They share a Priority grouping down the left, so each priority lines up across all three blocks, with a subtotal for each.

## Segment 3 (screenshot: accounts and cases)

Joined reports can also combine different report types. This one places an Accounts block, filtered to hot accounts, next to a Cases block of cases in progress. The shared Account Name is what lines them up, so you can see each hot account and its open cases on one screen.

## Segment 4 (code: separate queries)

In SQL terms, don't picture one big JOIN. Each block is its own query with its own WHERE clause, and the shared grouping field lines the results up. It's closer to running separate queries and placing the results next to each other.

## Segment 5 (steps: guardrails)

Know the guardrails. A joined report typically allows up to five blocks, each with its own filters. Blocks need common fields to line up. And joined reports are restricted elsewhere: in most orgs they can't be used as a normal dashboard source, and formulas work differently. Reach for them when the comparison is the point.

## Segment 6 (outro)

That completes the four formats. Now let's make them precise with filters. Next up: standard filters.
