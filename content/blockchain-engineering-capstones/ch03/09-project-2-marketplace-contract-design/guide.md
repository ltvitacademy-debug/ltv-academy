# Lesson 9 — Marketplace Contract Design

**Chapter 3 · Project 2 — An NFT Marketplace · Lesson 9 of 22**

> **Teaching example, not production code.** The contract below is simplified for this capstone
> and has not been audited. It's meant to be read, understood, and extended -- not deployed with
> real funds. Current interfaces verified live against OpenZeppelin Contracts 5.x docs
> (`docs.openzeppelin.com`) before writing this lesson, not recalled from memory.

## What you'll learn

- The approval pattern this marketplace uses instead of escrow, and why
- How to write `listItem`, `buyItem`, and `cancelListing` against OpenZeppelin's `IERC721`
- How to pay out a royalty on sale using the real ERC-2981 standard (`IERC2981`, `royaltyInfo`)
- Why `buyItem` deletes the listing and transfers the NFT *before* sending any ETH out

## Approval, not escrow

Two patterns let a marketplace contract move an NFT on a seller's behalf:

- **Escrow** — the NFT is transferred *into* the marketplace contract the moment it's listed.
- **Approval** — the seller keeps the NFT, but calls `approve` (or `setApprovalForAll`) on the NFT
  contract, authorizing the marketplace to transfer it later.

This capstone uses **approval**, matching how OpenSea's Seaport and most modern marketplaces
work: the seller keeps using and even transferring the NFT elsewhere up until the moment it sells
(at which point the approval, not the marketplace's custody, is what makes the sale possible). The
tradeoff: `buyItem` has to re-check that the seller still owns the token and the approval is still
valid, since nothing stopped the seller from moving it elsewhere in the meantime.

## The full contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title SimpleNFTMarketplace
/// @notice TEACHING EXAMPLE ONLY. Simplified for a classroom capstone --
/// not audited, not production-ready. Do not deploy with real funds.
contract SimpleNFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price; // wei
    }

    // nftContract => tokenId => active listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, uint256 price);
    event Sale(address indexed nft, uint256 indexed tokenId, address indexed buyer, uint256 price);
    event Cancelled(address indexed nft, uint256 indexed tokenId);

    function listItem(address nft, uint256 tokenId, uint256 price) external {
        require(price > 0, "price must be > 0");
        require(IERC721(nft).ownerOf(tokenId) == msg.sender, "not owner");
        require(
            IERC721(nft).isApprovedForAll(msg.sender, address(this)) ||
                IERC721(nft).getApproved(tokenId) == address(this),
            "marketplace not approved"
        );
        listings[nft][tokenId] = Listing(msg.sender, price);
        emit Listed(nft, tokenId, msg.sender, price);
    }

    function cancelListing(address nft, uint256 tokenId) external {
        require(listings[nft][tokenId].seller == msg.sender, "not seller");
        delete listings[nft][tokenId];
        emit Cancelled(nft, tokenId);
    }

    function buyItem(address nft, uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[nft][tokenId];
        require(listing.price > 0, "not listed");
        require(msg.value == listing.price, "wrong price");

        delete listings[nft][tokenId]; // effects before interactions

        (address royaltyReceiver, uint256 royaltyAmount) = _royaltyFor(nft, tokenId, listing.price);

        IERC721(nft).safeTransferFrom(listing.seller, msg.sender, tokenId);

        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            _pay(royaltyReceiver, royaltyAmount);
        }
        _pay(listing.seller, listing.price - royaltyAmount);

        emit Sale(nft, tokenId, msg.sender, listing.price);
    }

    function _royaltyFor(address nft, uint256 tokenId, uint256 price)
        private
        view
        returns (address receiver, uint256 amount)
    {
        if (!IERC2981(nft).supportsInterface(type(IERC2981).interfaceId)) {
            return (address(0), 0);
        }
        return IERC2981(nft).royaltyInfo(tokenId, price);
    }

    function _pay(address to, uint256 amount) private {
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "payment transfer failed");
    }
}
```

## Walking through the risky function: `buyItem`

1. **Load and validate the listing.** `msg.value` must match the listed price exactly -- no
   overpay-and-refund logic here, to keep the example focused.
2. **Delete the listing before doing anything else.** This is checks-effects-interactions: state
   changes before any external call, so a reentrant call into `buyItem` during the NFT transfer or
   the ETH payments sees an already-deleted listing and reverts on `require(listing.price > 0)`.
   `nonReentrant` is a second, belt-and-suspenders layer on top of that ordering.
3. **Look up the royalty, if any.** `IERC2981(nft).supportsInterface(...)` checks whether the NFT
   collection itself implements the royalty standard -- plenty of ERC-721 collections don't, and
   this contract has to work with both.
4. **Transfer the NFT**, then **pay the royalty receiver**, then **pay the seller the remainder.**
   Payments use a low-level `call`, not `transfer`, because `transfer`'s fixed 2300 gas stipend can
   break payments to contract wallets (including some royalty-splitter contracts) -- `call` plus an
   explicit success check is the current recommended pattern.

## Where real ERC-2981 royalties come from

`royaltyInfo(tokenId, salePrice)` returns a receiver address and an amount, computed by the NFT
collection's own contract (commonly via OpenZeppelin's `ERC2981` base, using `_setDefaultRoyalty` or
`_setTokenRoyalty` with a fee expressed in basis points out of 10,000). This marketplace doesn't
set royalties -- it only respects whatever the collection already defined, which is the whole point
of a standard: any ERC-2981 marketplace can read any ERC-2981 collection's royalty terms.

## Lab

1. Deploy a minimal `ERC721` + `ERC2981` test collection (OpenZeppelin's base contracts, a few
   lines of glue code) to a local Hardhat network.
2. Deploy `SimpleNFTMarketplace`. Mint a token, approve the marketplace, list it, and buy it from a
   second test account. Confirm the royalty receiver and seller balances both moved correctly.
3. Write one test that lists, then tries to buy with the wrong `msg.value`, and confirm it reverts.

## Check yourself

You're ready for Lesson 10 when you can explain why `buyItem` deletes the listing *before* making
any external call, and what would go wrong if that ordering were reversed.
