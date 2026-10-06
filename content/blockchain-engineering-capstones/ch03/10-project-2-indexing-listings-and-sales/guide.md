# Lesson 10 — Indexing Listings & Sales

**Chapter 3 · Project 2 — An NFT Marketplace · Lesson 10 of 22**

## What you'll learn

- Why `SimpleNFTMarketplace` from Lesson 9 needs an indexer at all
- How to model `Listing` and `Sale` as subgraph entities in `schema.graphql`
- How to write AssemblyScript mapping handlers that turn events into those entities
- The custom-listener alternative, and when it beats a managed subgraph

## The problem this lesson solves

`SimpleNFTMarketplace` has no `getAllActiveListings()` function, and it never will -- storing and
iterating an open-ended list on-chain gets expensive fast, which is exactly why marketplace
contracts don't do it. What the contract *does* have is three events: `Listed`, `Sale`,
`Cancelled`. This is the same indexing problem covered in the Blockchain APIs & Backend course,
now applied to a specific contract: turn those events into something a frontend can actually query.

## Option A: a subgraph

A subgraph has three pieces. The **manifest** (`subgraph.yaml`) tells The Graph which contract and
events to watch:

```yaml
dataSources:
  - kind: ethereum
    name: SimpleNFTMarketplace
    network: sepolia
    source:
      address: "0xMarketplaceAddress"
      abi: SimpleNFTMarketplace
      startBlock: 5123000
    mapping:
      eventHandlers:
        - event: Listed(indexed address,indexed uint256,indexed address,uint256)
          handler: handleListed
```

The **schema** (`schema.graphql`) defines what gets stored and what a query can ask for:

```graphql
type Listing @entity {
  id: ID!                 # nftContract-tokenId
  nftContract: Bytes!
  tokenId: BigInt!
  seller: Bytes!
  price: BigInt!
  active: Boolean!
}

type Sale @entity {
  id: ID!                 # txHash-logIndex
  nftContract: Bytes!
  tokenId: BigInt!
  buyer: Bytes!
  price: BigInt!
  blockTimestamp: BigInt!
}
```

The **mapping** (`src/mapping.ts`, written in AssemblyScript) is the handler that actually runs
every time a matched event is seen:

```ts
export function handleListed(event: Listed): void {
  let id = event.params.nft.toHex() + "-" + event.params.tokenId.toString();
  let listing = new Listing(id);
  listing.nftContract = event.params.nft;
  listing.tokenId = event.params.tokenId;
  listing.seller = event.params.seller;
  listing.price = event.params.price;
  listing.active = true;
  listing.save();
}
```

`handleSale` does the matching work on the other side: flip the existing `Listing` to inactive, and
write a new `Sale` entity from the same event.

```ts
export function handleSale(event: Sale): void {
  let id = event.params.nft.toHex() + "-" + event.params.tokenId.toString();
  let listing = Listing.load(id);
  if (listing != null) {
    listing.active = false;
    listing.save();
  }
  let sale = new Sale(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  sale.nftContract = event.params.nft;
  sale.tokenId = event.params.tokenId;
  sale.buyer = event.params.buyer;
  sale.price = event.params.price;
  sale.blockTimestamp = event.block.timestamp;
  sale.save();
}
```

Once deployed, the frontend (Lesson 11) queries this with GraphQL instead of scanning the chain:

```graphql
{
  listings(where: { active: true }, orderBy: price, orderDirection: asc) {
    id
    nftContract
    tokenId
    seller
    price
  }
}
```

## Option B: a custom event listener

A subgraph is the right call when you want a hosted, queryable, GraphQL-native index with no
servers to run. Sometimes you'd rather own the infrastructure -- maybe you need custom joins
against off-chain data, different latency guarantees, or you're not ready to deploy to The Graph's
network yet. A custom listener does the same conceptual job with `ethers.js` and your own database:

```ts
import { Contract, JsonRpcProvider } from "ethers";

const marketplace = new Contract(address, abi, provider);

marketplace.on("Listed", async (nft, tokenId, seller, price) => {
  await db.listings.upsert({ nft, tokenId: tokenId.toString(), seller,
    price: price.toString(), active: true });
});

marketplace.on("Sale", async (nft, tokenId, buyer, price) => {
  await db.listings.update({ nft, tokenId: tokenId.toString() }, { active: false });
  await db.sales.insert({ nft, tokenId: tokenId.toString(), buyer, price: price.toString() });
});
```

The tradeoff is real: now you're responsible for running this process continuously, handling
reorgs and missed events on reconnect, and hosting the database yourself. For this capstone,
either approach is a legitimate choice -- pick the subgraph if you want practice with The Graph's
tooling, the custom listener if you'd rather show off backend/database skills instead.

## Lab

Build one of the two. If you choose the subgraph: deploy `SimpleNFTMarketplace` to a testnet, point
a subgraph at it, and confirm a test listing shows up in a GraphQL query within a few blocks. If you
choose the custom listener: run it against the same testnet deployment and confirm your database
reflects a listing and a sale correctly, including the `active` flag flipping to false.

## Check yourself

You're ready for Lesson 11 when you can explain, in one sentence, why the frontend should query the
indexer for "all active listings" rather than asking the marketplace contract directly.
