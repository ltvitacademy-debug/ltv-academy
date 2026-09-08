# Lesson 4 — Bidding, Withdrawing & Preventing Reentrancy

**Chapter 8 · Full-Stack DApp Development · Lesson 4 of 4**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- How the real `bid` function tracks a running list of outbid bidders
- What a reentrancy attack actually is, and the real, one-line fix that prevents it
- Why the order of operations inside `withdraw` is not a style choice — it's a security requirement
- How `end()` deliberately allows anyone to call it, and why that's actually safer

## bid(): tracking every real outbid amount

```solidity
function bid() external payable {
    require(started, "not started");
    require(block.timestamp < endAt, "ended");
    require(msg.value > highestBid, "value < highest bid");

    if (highestBidder != address(0)) {
        bids[highestBidder] += highestBid;
    }

    highestBid = msg.value;
    highestBidder = msg.sender;

    emit Bid(msg.sender, msg.value);
}
```

![The real, complete bid function — checking timing and amount, then recording the previous highest bidder's refundable balance before overwriting it.](/courses/blockchain/ch08/04-english-auction-bidding-reentrancy/shot_bid_function_complete.png)
*Real logic: before the new highest bid overwrites the old one, the old bidder's refund is safely recorded.*

The real, necessary detail: before overwriting `highestBid` and
`highestBidder`, the contract adds the **previous** highest bid to
`bids[highestBidder]` — a running total of ETH that bidder can later
withdraw. The `if (highestBidder != address(0))` guard exists because,
for the very first bid, there's no previous bidder to refund yet.

## withdraw(): where a real vulnerability lives

![The real, complete withdraw function — resetting `bids[msg.sender]` to zero *before* sending any ETH, the exact fix for a real reentrancy vulnerability.](/courses/blockchain/ch08/04-english-auction-bidding-reentrancy/shot_withdraw_reentrancy_fix.png)
*The single most important line-ordering decision in this whole contract.*

```solidity
function withdraw() external {
    uint256 bal = bids[msg.sender];
    bids[msg.sender] = 0;
    payable(msg.sender).transfer(bal);
    emit Withdraw(msg.sender, bal);
}
```

Here's the real, direct warning from class: *"Before we send ETH out
to message sender, we'll reset the bids mapping... the reason why
we're doing this is to protect from re-entry. If we transfer the ETH
before we reset the balance, then this contract will be vulnerable to
re-entry."*

## What a reentrancy attack actually is

A **reentrancy attack** exploits the gap between sending ETH and
updating your own records. If `withdraw` sent ETH *first* and reset
`bids[msg.sender]` *second*, a malicious contract receiving that ETH
could call `withdraw` again — **before the first call ever finishes**
— and drain funds repeatedly, since the balance hadn't been zeroed out
yet. This is a genuinely real, historically expensive class of
vulnerability in Ethereum contracts.

**The real fix, in one line**: update your own state
(`bids[msg.sender] = 0`) **before** sending any ETH out. This pattern
has a real name — **checks-effects-interactions** — and it's one of
the single most important habits in real Solidity security.

## end(): deliberately callable by anyone

> "The reason why this function can be called by anyone is because if
> we were to restrict this function call to the seller, and the seller
> doesn't call it, then the highest bidder has their ETH stuck in this
> contract."

This is a genuinely thoughtful, real design decision: restricting
`end()` to just the seller would create a real risk — a seller who
simply never calls it would leave everyone's funds permanently locked.

## Key terms

| Term | Meaning |
|---|---|
| Reentrancy attack | Exploiting the gap between sending funds and updating your own state |
| Checks-effects-interactions | Update your own state before making any external call |
| bids[address] | A running, per-address total of refundable ETH from being outbid |

## Check yourself

You've finished Chapter 8 when you can explain, in your own words,
exactly why swapping the two lines inside `withdraw` — sending ETH
before resetting the balance — would make this contract exploitable.
