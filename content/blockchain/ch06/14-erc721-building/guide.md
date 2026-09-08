# Lesson 14 — Building an ERC-721 Contract: State, Events & Minting

**Chapter 6 · Token Standards · Lesson 14 of 14**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding a real ERC-721 contract from scratch in Remix.

## What you'll learn

- The real state every ERC-721 contract needs — and how it differs from ERC-20
- How to write `balanceOf` and `ownerOf`, the two core read functions
- How a real `mint` function actually creates and assigns a new NFT
- Why the zero address shows up constantly as a real validity check

## The real state, side by side with ERC-20

![The actual, complete state and events for a from-scratch ERC-721 contract: three real mappings, plus the Transfer and Approval events.](/courses/blockchain/ch06/14-erc721-building/shot_erc721_state_events.png)
*Real state that looks a lot like ERC-20 at first glance — with one crucial difference: everything is keyed by a unique tokenId, not by amount.*

```solidity
string public name;
string public symbol;
uint256 public totalSupply;

// Mapping from tokenId to owner
mapping(uint256 => address) private _owners;
// Mapping owner address to token count
mapping(address => uint256) private _balances;
// Mapping from tokenId to approved address
mapping(uint256 => address) private _tokenApprovals;

event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
```

The real, key difference from ERC-20: instead of one mapping tracking
*amounts*, ERC-721 needs a mapping tracking **which specific token ID
belongs to which owner** — `_owners`. Each token is tracked
individually, not as an interchangeable quantity.

## balanceOf and ownerOf: the two real read functions

```solidity
function balanceOf(address owner) public view returns (uint256) {
    require(owner != address(0), "Invalid address");
    return _balances[owner];
}

function ownerOf(uint256 tokenId) public view returns (address) {
    address owner = _owners[tokenId];
    require(owner != address(0), "Token doesn't exist");
    return owner;
}
```

Both functions use the same real check — comparing against
`address(0)` — but for two genuinely different real reasons:
`balanceOf` rejects an invalid address outright, while `ownerOf` uses
it to detect that **a given token simply doesn't exist yet.**

## mint: creating a real, brand-new NFT

![The complete, real `mint` function from class — validating the recipient and token ID, then actually assigning ownership.](/courses/blockchain/ch06/14-erc721-building/shot_erc721_mint_function.png)
*Three real checks and three real state updates — this is genuinely how a brand-new NFT comes into existence.*

```solidity
function mint(address to, uint256 tokenId) public {
    require(to != address(0), "Cannot mint to zero address");
    require(_owners[tokenId] == address(0), "Token already exists");

    _owners[tokenId] = to;
    _balances[to] += 1;
    totalSupply += 1;

    emit Transfer(address(0), to, tokenId);
}
```

Two real, necessary checks come first: you can't mint to the zero
address, and you can't mint a `tokenId` that's already taken — NFTs are
unique, so **duplicate token IDs are a real, hard rule**, not just a
style preference. Only after both checks pass does the function
actually assign ownership, increment that owner's balance, and grow
the real total supply by exactly one.

## Key terms

| Term | Meaning |
|---|---|
| _owners[tokenId] | The real mapping tracking exactly who owns which specific NFT |
| balanceOf vs. ownerOf | How many tokens an address holds, vs. who holds one specific token |
| Duplicate tokenId | A hard, real rule violation — every NFT's ID must be unique |

## Check yourself

You've finished Chapter 6 when you can explain, in your own words, why
ERC-721 needs a mapping from `tokenId` to owner, while ERC-20 only ever
needed a mapping from address to a plain balance amount.
