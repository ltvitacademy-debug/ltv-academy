# Script — Deploying Flexfields and Structures

## Segment 1 (title)

Behind every chart of accounts structure is underlying Oracle technology called a key flexfield. This lesson covers how a designed structure actually gets frozen and deployed so a ledger can use it.

## Segment 2 (steps)

A key flexfield is Oracle's mechanism for building a structure out of independently-defined segments that combine into one composite key. The Accounting Flexfield is the specific key flexfield chart of accounts structures are built on.

## Segment 3 (code)

The sequence: define segments, freeze the structure definition, deploy the structure, create one or more structure instances with actual value sets assigned, then freeze and deploy each instance separately before a ledger can use it.

## Segment 4 (steps)

Oracle Fusion allows some limited changes after deployment, but most structural changes — removing a segment, changing widths, reordering — require redeployment and can seriously affect reporting and historical data.

## Segment 5 (outro)

In a real implementation, freezing and deploying the chart of accounts structure is typically a formally reviewed milestone, precisely because undoing it is so disruptive. Next up, lesson twenty-seven: rapid implementation spreadsheets.
