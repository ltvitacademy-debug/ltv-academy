# Script — Concentrated Liquidity Concepts

## Segment 1 (title)

Every pool in the last four lessons spread an LP's capital across the entire price curve, from zero to infinity — even though an asset pair usually trades in a narrow band. Concentrated liquidity lets an LP deposit only where the price actually is.

## Segment 2 (code: full-range vs. concentrated)

Full-range liquidity spreads capital across the whole curve, so most of it sits at prices that will realistically never be reached. A concentrated position puts the same dollar amount only inside a chosen range, so all of it sits where the price actually trades.

## Segment 3 (code: the capital-efficiency math)

A full-range LP might have only one or two percent of their capital actively earning fees near the current price at any moment. A concentrated LP depositing the same total dollar amount into a tight range around that price can provide the same fee-earning depth using roughly ten to twenty times less capital.

## Segment 4 (steps: the real trade-off)

That efficiency comes with a new risk full-range LPs never faced. If price moves outside your chosen range, your position converts entirely into whichever asset is now cheaper, and you stop earning fees until price re-enters. Concentrated liquidity management is an active, ongoing decision, not deposit-and-forget.

## Segment 5 (outro)

More fee income when price behaves, zero fee income when it doesn't — concentrated liquidity trades simplicity for capital efficiency. Next up: Chapter 3 moves to lending and borrowing, starting with how overcollateralization actually works.
