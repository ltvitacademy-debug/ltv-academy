# Script — Handling Chain Reorgs

## Segment 1 (title)

When two blocks get produced at nearly the same time, the network briefly has two competing chains. One wins, the other's blocks get discarded — that's a reorg. Any event that was only in the discarded blocks never happened, as far as the winning chain is concerned.

## Segment 2 (code: what a reorg looks like)

Your listener may have already fired on an event in one of those discarded blocks. On mainnet today reorgs are rare and usually just one block deep — but rare isn't never.

## Segment 3 (code: wait for confirmations)

Most backends don't try to detect a reorg directly — they just treat anything as final only after it's several blocks deep, the same confirmations option from sending a transaction. Higher is safer, slower. One confirmation for a UI showing pending-to-done; five to twelve before anything irreversible.

## Segment 4 (code: detecting a reorg directly)

For a listener specifically, the direct approach tracks the block hash at each height you've processed. If the hash at a height you've already seen changes, that's a reorg — re-fetch events for that range instead of trusting what already fired.

## Segment 5 (outro)

Confirmed is a probability, not a guarantee — build for that instead of assuming it away. Next up: putting Chapter 2 together into one real event listener service.
