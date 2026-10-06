# Lesson 11 — Frontend & Wallet Integration

**Chapter 3 · Project 2 — An NFT Marketplace · Lesson 11 of 22**

> Syntax verified live against `docs.ethers.org` (v6) and `viem.sh` before writing this lesson,
> not recalled from memory. The main examples use ethers v6; viem would read almost identically,
> swapping `Contract` instances for `readContract`/`writeContract` calls, as covered in the
> ethers-vs-viem comparison earlier in this track.

## What you'll learn

- How to connect an injected wallet (MetaMask or similar) with ethers v6's `BrowserProvider`
- How the list flow becomes two contract calls: `approve`, then `listItem`
- How the buy flow sends exact ETH with the transaction via `{ value: ... }`
- Why the frontend reads listings from the indexer (Lesson 10), not the chain directly

## Connecting the wallet

Ethers v6's `BrowserProvider` wraps whatever EIP-1193 provider the browser injects
(`window.ethereum`). `getSigner()` returns a `JsonRpcSigner` -- the object that can actually sign
and send transactions on the connected account's behalf:

```jsx
import { useState } from "react";
import { BrowserProvider } from "ethers";

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  async function connect() {
    const provider = new BrowserProvider(window.ethereum);
    const newSigner = await provider.getSigner();
    setSigner(newSigner);
    setAddress(await newSigner.getAddress());
  }

  return { address, signer, connect };
}
```

Nothing here is marketplace-specific yet -- this is the same wallet-connect pattern any dapp uses.
The marketplace-specific work starts once `signer` exists.

## Listing an NFT: two transactions, in order

Listing requires the approval from Lesson 9 *before* the marketplace will accept the listing, so
the frontend has to send two transactions and wait for the first to confirm before sending the
second:

```jsx
import { Contract, parseEther } from "ethers";

async function listNft(signer, nftAddress, marketplaceAddress, tokenId, priceEth) {
  const nft = new Contract(nftAddress, erc721Abi, signer);
  const approveTx = await nft.approve(marketplaceAddress, tokenId);
  await approveTx.wait();

  const marketplace = new Contract(marketplaceAddress, marketplaceAbi, signer);
  const listTx = await marketplace.listItem(nftAddress, tokenId, parseEther(priceEth));
  await listTx.wait();
}
```

`parseEther` converts a human price like `"0.5"` into the `wei` `uint256` the contract expects --
the same conversion `formatEther` reverses when displaying a price back to the user.

## Buying an NFT: sending exact value

`buyItem` is `payable`, so the frontend passes the price as `value` in the transaction options.
This has to match the listing's price exactly, since the contract's `require(msg.value ==
listing.price, ...)` rejects anything else:

```jsx
async function buyNft(signer, nftAddress, marketplaceAddress, tokenId, priceWei) {
  const marketplace = new Contract(marketplaceAddress, marketplaceAbi, signer);
  const tx = await marketplace.buyItem(nftAddress, tokenId, { value: priceWei });
  const receipt = await tx.wait();
  return receipt;
}
```

Pass `priceWei` straight from whatever the indexer returned for that listing's `price` field --
never let the user retype a price by hand, since even a one-wei mismatch reverts the transaction.

## Reading listings: query the indexer, not the chain

The marketplace page itself never calls `listings[nft][tokenId]` in a loop. It queries whichever
indexer Lesson 10 built:

```jsx
async function fetchActiveListings(subgraphUrl, query) {
  const res = await fetch(subgraphUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();
  return data.listings;
}
```

This keeps the UI fast and avoids re-deriving "all active listings" from raw events on every page
load. The contract stays the source of truth for whether a given listing is *actually* still valid
-- `buyItem` re-checks that on-chain regardless of what the index says -- but the index is what
makes the UI possible in the first place.

## Lab

Build the three pieces above into a working page: a connect button, a "list this NFT" form that
sends the two transactions in order, and a listings grid fed by your Lesson 10 index, with a buy
button on each card. Handle the unhappy path too -- what does the UI show if `buyItem` reverts
because someone else bought it first?

## Check yourself

You're ready for Lesson 12 when your demo can connect a wallet, list a test NFT, and buy it back
from a second account, end to end, against your own testnet deployment.
