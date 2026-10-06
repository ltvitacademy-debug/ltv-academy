# Script — Frontend & Wallet Integration

## Segment 1 (title)

This lesson wires the frontend to the contract from Lesson 9 and the indexer from Lesson 10,
using real, current ethers v6 syntax, verified against ethers' and viem's own docs rather than
recalled from memory.

## Segment 2 (steps: connect, approve, list, buy)

Four moves carry the whole UI. Connect a wallet. Approve the marketplace to move a specific NFT.
List it at a price. And buy -- sending exactly the listed price along with the transaction.

## Segment 3 (code: connecting the wallet)

BrowserProvider wraps whatever wallet the browser injects as window.ethereum. getSigner returns
the object that can actually sign and send -- nothing marketplace-specific yet, this is the same
pattern any dapp uses to connect.

## Segment 4 (code: listing)

Listing is two transactions, and order matters. First, approve the marketplace on the NFT contract
itself and wait for it to confirm. Only then does listItem succeed -- the contract checks for that
approval before recording anything.

## Segment 5 (code: buying)

Buying sends the price as value on the transaction, pulled straight from whatever the indexer
returned for that listing -- never hand-typed, since even a one-wei mismatch reverts the
contract's exact-price check.

## Segment 6 (code: reading listings)

The listings grid itself never loops over the contract. It fetches from whichever indexer Lesson
10 built -- fast, and already structured as "active listings sorted by price" instead of raw
events.

## Segment 7 (outro)

With contract, indexer, and frontend all working together, the project runs end to end. Next:
writing it up and getting ready to talk about it in an interview.
