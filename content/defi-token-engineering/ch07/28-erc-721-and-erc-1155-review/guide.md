# Lesson 28 — ERC-721 & ERC-1155 Review

**Chapter 7 · NFTs Beyond Collectibles · Lesson 28 of 30**

## What you'll learn

- The real, current OpenZeppelin ERC-721 and ERC-1155 contract interfaces
- The core function signatures each standard actually exposes
- When ERC-1155's batching saves real gas over ERC-721
- How to choose between the two standards for a new project

## ERC-721 — one contract, unique tokens

ERC-721 is the standard for **non-fungible, one-of-a-kind tokens** — each
`tokenId` is distinct, with its own owner and (optionally) its own
metadata URI. This is OpenZeppelin's own current usage example from its
v5.x documentation, verified directly against their published docs:

```solidity
import {ERC721URIStorage, ERC721} from
    "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameItem is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("GameItem", "ITM") {}

    function awardItem(address player, string memory tokenURI)
        public returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(player, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}
```

Core ERC-721 functions every implementation exposes: `ownerOf(uint256
tokenId)`, `balanceOf(address owner)`, `transferFrom(...)` /
`safeTransferFrom(...)`, `approve(...)`, and `setApprovalForAll(...)`.

## ERC-1155 — one contract, many token types

ERC-1155 is the **multi-token standard**: a single contract can manage
many token types at once, each identified by its own `id`, and each type
can be either fungible (quantities, like in-game gold) or effectively
non-fungible (a quantity of exactly 1). This is OpenZeppelin's own current
usage example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract GameItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10 ** 18, "");
        _mint(msg.sender, SILVER, 10 ** 27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 10 ** 9, "");
        _mint(msg.sender, SHIELD, 10 ** 9, "");
    }
}
```

Core ERC-1155 functions: `balanceOf(address, uint256)`,
`balanceOfBatch(address[], uint256[])`, `safeTransferFrom(address,
address, uint256, uint256, bytes)`, `safeBatchTransferFrom(address,
address, uint256[], uint256[], bytes)`, and `setApprovalForAll(address,
bool)`.

## Where batching actually saves gas

The `THORS_HAMMER` constant above (quantity 1) sitting in the same
contract as `GOLD` (quantity 10^18) is the point: ERC-1155 doesn't force a
choice between "fungible token contract" and "NFT contract." And
`safeBatchTransferFrom` sends multiple token types in a single
transaction — one transaction fee instead of five separate ERC-721-style
transfers, if a game needed to hand a player gold, a sword, a shield, and
two other items at once.

## Choosing between them

- **ERC-721** — each token is genuinely one-of-a-kind, with its own
  metadata, provenance, and (often) royalty terms. Simple collectibles,
  1-of-1 art, deeds, and most generative PFP projects.
- **ERC-1155** — you need many token types (fungible, semi-fungible, or
  unique) managed efficiently in one contract, and you'll frequently
  transfer or mint multiple types together. Game items, event ticket
  tiers, and multi-edition art all fit this pattern well.

## Key terms

| Term | Meaning |
|---|---|
| `tokenId` | The unique identifier for a specific token (ERC-721) or token type (ERC-1155) |
| `safeTransferFrom` | Transfer that checks the receiver can actually handle the token standard |
| Batch operations | ERC-1155 functions moving multiple token types in a single transaction |

## Check yourself

Before Lesson 29, make sure you can explain the real difference between
`balanceOf` on ERC-721 (per-address token count) and on ERC-1155
(per-address, per-token-id balance), and when batching would actually
save meaningful gas.
