# Script — Modeling Token Supply & Demand

## Segment 1 (title)

Borrowed from monetary economics, the equation of exchange gives a rough mental model for how a token's required value relates to its usage -- and why velocity, not just usage, drives that number.

## Segment 2 (code: the velocity problem, worked)

Same fifty million dollars a year in transaction volume: at a velocity of 2, the token needs twenty-five million in market value to support it. At a velocity of 20, it only needs two and a half million. Same usage, radically different implied token value, purely from how long tokens are held before being sold.

## Segment 3 (code: the inflows/outflows model)

Every period, circulating supply changes based on what's added -- emissions, vesting unlocks, treasury disbursements -- and what's removed -- burns, new staking lockups. Net those out and you get the real change to liquid circulating supply for the period.

## Segment 4 (steps: building the model)

List every inflow as a function of time, list every outflow, net it per period, then stress-test against demand assumptions -- what usage growth would actually be needed to absorb that net new liquid supply.

## Segment 5 (outro)

Velocity, inflows, and outflows turn tokenomics from a single formula into a system you can actually model. That closes out tokenomics design -- next up, Chapter 6: DAOs and governance, starting with how an on-chain proposal actually moves from idea to execution.
