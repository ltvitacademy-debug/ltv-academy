# Script — Working With ethers.js/viem Types

## Segment 1 (title)

Two libraries dominate TypeScript blockchain work: ethers.js and viem. They type the same concepts very differently.

## Segment 2 (code: ethers v6 Provider)

ethers version 6 is class-based. A JsonRpcProvider gives you read access; calling getBalance returns a real bigint, not the old BigNumber class from version 5 — that's a genuine breaking change worth knowing if you're reading an older tutorial. formatEther turns that bigint into a human-readable string like four-point-oh-eight ETH.

## Segment 3 (code: ethers v6 Contract and Signer)

A Contract wraps an address and an ABI so you call it like a regular object — contract dot balanceOf, returning a bigint. To actually send a transaction you need a Signer, which in ethers is a Wallet built from a private key. Sending returns a TransactionResponse; waiting for it to mine returns a TransactionReceipt — two distinct types, because a broadcast transaction and a mined one carry different guaranteed fields.

## Segment 4 (code: viem's functional clients)

viem takes a functional approach — no "new", just factory functions. createPublicClient returns a typed PublicClient for reads; readContract takes the address, ABI, and function name directly as arguments rather than method-call syntax. viem can even infer the return type of readContract straight from the ABI array itself, with zero manual typing. Writing needs a WalletClient instead, built from an account rather than a Signer object.

## Segment 5 (steps: the real difference)

Both libraries agree bigint is the right type for on-chain amounts — that debate is over. Where they differ is shape: ethers gives you Provider, Signer, and Contract instances you build with "new"; viem gives you plain typed client objects from factory functions, with explicit function calls instead of method-call syntax. Neither is more typed than the other — two different API philosophies, same underlying problem.

## Segment 6 (outro)

Next lesson: using these types to make a real contract interaction fully type-safe, end to end.
