# Script — Marketplace Contract Design

## Segment 1 (title)

This lesson writes the real contract behind Project 2's listing and buying logic -- a simplified
teaching example, not audited, and not meant for real funds. Interfaces are verified live against
OpenZeppelin's current docs, not recalled from memory.

## Segment 2 (steps: three functions)

Three functions carry the contract: listItem, which lists a token the seller still holds; buyItem,
which pays the royalty and the seller and transfers the NFT in one transaction; and cancelListing,
which lets a seller pull a listing any time.

## Segment 3 (code: state and events)

State is a single mapping from NFT contract and token ID to a Listing struct holding the seller
and price. Three events -- Listed, Sale, Cancelled -- are everything the indexing layer in the
next lesson will need.

## Segment 4 (code: listItem)

listItem checks the caller actually owns the token, then checks the marketplace has an approval --
either a blanket setApprovalForAll or a getApproved on this specific token. Only then does it
record the listing. The NFT itself never moves.

## Segment 5 (code: buyItem)

buyItem is where the risk lives. It deletes the listing before making any external call --
checks-effects-interactions -- so a reentrant call sees an already-deleted listing and reverts.
Then it looks up any royalty, transfers the NFT, and pays out.

## Segment 6 (code: royalty lookup)

The royalty lookup calls supportsInterface on the NFT contract itself, checking for ERC-2981. If
the collection implements it, royaltyInfo returns who gets paid and how much; if not, the
marketplace just skips straight to paying the seller in full.

## Segment 7 (outro)

Next: the indexing layer, which turns Listed, Sale, and Cancelled into something a frontend can
actually query -- since none of those events, on their own, answer "what's for sale right now."
