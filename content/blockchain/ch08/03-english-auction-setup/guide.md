# Lesson 3 — Building an English Auction for NFTs

**Chapter 8 · Full-Stack DApp Development · Lesson 3 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What an English auction actually is, using a real eBay analogy
- The complete real state an NFT auction contract needs to track
- How a seller's NFT actually gets locked into the contract when the auction starts
- Why `start()` checks both `started` and the caller's identity before doing anything

## What an English auction actually is

> "An English auction is the type of auction you've probably seen in
> movies or on TV. The seller sets a starting price. Bidders take turns
> placing higher and higher bids... the auction continues until a time
> limit is reached, and the highest bidder wins."

The real, relatable comparison: **"You can think of an eBay listing as
an English auction."** Every bid must exceed the last, unlike a Dutch
auction, where the price actually decreases over time.

## The real rules, stated before any code

- The seller deploys the contract.
- The auction lasts **7 days**.
- Participants bid by depositing ETH, each bid exceeding the current
  highest.
- Any bidder who's been outbid can withdraw their ETH.
- After the auction: the highest bidder becomes the NFT's new owner,
  and the seller receives the highest bid.

## The complete real state and events

![The real, complete state variables and events for the EnglishAuction contract — everything needed to track one live auction.](/courses/blockchain/ch08/03-english-auction-setup/shot_auction_state_events.png)
*Every real piece of data this auction needs to track, declared together.*

```solidity
contract EnglishAuction {
    event Start(address indexed sender, uint256 amount);
    event Bid(address indexed sender, uint256 amount);
    event Withdraw(address indexed bidder, uint256 amount);
    event End(address winner, uint256 amount);

    IERC721 public nft;
    uint256 public nftId;
    address payable public seller;
    uint256 public endAt;
    bool public started;
    bool public ended;
    address public highestBidder;
    uint256 public highestBid;
    mapping(address => uint256) public bids;
}
```

## The real constructor

```solidity
constructor(address _nft, uint256 _nftId, uint256 _startingBid) {
    nft = IERC721(_nft);
    nftId = _nftId;
    seller = payable(msg.sender);
    highestBid = _startingBid;
}
```

The contract references an **existing, separately deployed NFT
contract** via the real `IERC721` interface — this auction contract
doesn't create the NFT, it just manages the bidding for one that
already exists.

## start(): locking the NFT into the contract

![The real, complete `start` function — checking the caller and the auction's state, then actually transferring the NFT into escrow.](/courses/blockchain/ch08/03-english-auction-setup/shot_start_function.png)
*The moment an auction actually begins: the seller's NFT physically moves into the contract's own custody.*

```solidity
function start() external {
    require(!started, "started");
    require(msg.sender == seller, "not seller");

    nft.transferFrom(msg.sender, address(this), nftId);

    started = true;
    endAt = block.timestamp + 7 days;
}
```

Two real checks come first: the auction can't be started twice, and
only the actual seller can start it. Only then does the contract call
`transferFrom` on the NFT contract, moving the token **out of the
seller's wallet and into this contract's own custody** — a real,
necessary step, since the contract needs to actually hold the NFT to
hand it to the winner later.

## Key terms

| Term | Meaning |
|---|---|
| English auction | Bids increase over time; highest bid at the deadline wins |
| IERC721 | The real interface used to reference an existing, external NFT contract |
| Escrow | The auction contract holding the NFT in its own custody until it ends |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why the contract needs to actually hold the NFT itself, instead
of just recording who the current highest bidder is.
