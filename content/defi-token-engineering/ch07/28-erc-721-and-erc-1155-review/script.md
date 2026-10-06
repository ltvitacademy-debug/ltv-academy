# Script — ERC-721 & ERC-1155 Review

## Segment 1 (title)

Two standards, two different jobs. ERC-721 for genuinely one-of-a-kind tokens, ERC-1155 for many token types in a single contract. Let's look at both as OpenZeppelin's own current, real contract examples.

## Segment 2 (code: real ERC-721 example)

This is OpenZeppelin's own GameItem example, verified against their current documentation. Each tokenId is unique -- awardItem mints one, sets its metadata URI, and returns its ID. ownerOf, balanceOf, transferFrom, and approve are the core functions every ERC-721 exposes.

## Segment 3 (code: real ERC-1155 example)

OpenZeppelin's GameItems example manages five different token types in one contract -- gold as a large fungible quantity, Thor's Hammer as a quantity of exactly one, sitting side by side. balanceOf now takes an address and a token ID, not just an address.

## Segment 4 (code: where batching saves gas)

safeBatchTransferFrom sends multiple token types in a single transaction -- one fee instead of five separate ERC-721-style transfers if a game needed to hand a player five different items at once.

## Segment 5 (steps: choosing between them)

ERC-721 for one-of-a-kind art, deeds, and most PFP projects. ERC-1155 for many token types managed efficiently together -- game items, ticket tiers, multi-edition art -- anywhere you'll frequently mint or transfer several types at once.

## Segment 6 (outro)

Two standards, verified against OpenZeppelin's own current docs, not guessed from memory. Next up: NFTs as financial and utility primitives -- what an NFT can represent beyond a picture.
