# Script — Vaults & Auto-Compounding

## Segment 1 (title)

A yield vault takes the manual claim-sell-restake loop and runs it automatically on a schedule. It doesn't invent new yield -- it captures the compounding gap a manual, infrequent claimer leaves on the table.

## Segment 2 (code: manual vs automated compounding)

The same 20 percent APR farm, compounded monthly by hand versus harvested daily by a vault, differs by only about nineteen dollars a year on ten thousand dollars -- before fees. The gap from frequency alone is real, but modest.

## Segment 3 (code: pricePerShare)

Instead of crediting new tokens every harvest, most vaults mint a share token and let the exchange rate between shares and underlying assets rise as the strategy compounds. Price per share equals total assets divided by total shares -- your withdrawal value is just your shares times that rising price.

## Segment 4 (steps: fees sit between the strategy and you)

Vaults typically charge a small management fee on assets regardless of performance, plus a performance fee -- commonly 10 to 20 percent -- taken only from actual profit, both deducted before price per share updates in your favor.

## Segment 5 (outro)

Auto-compounding captures a real but modest gap, delivered through a rising share price instead of new tokens, with fees layered on top. Next up: reward emission schedules -- the rules that decide how much new supply funds all of this in the first place.
