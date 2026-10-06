# Script — Sending Transactions Programmatically

## Segment 1 (title)

Every read call only needed a connection to a node. A real transaction needs something that can sign — a private key. Etherscan's own UI makes that split explicit: Write Contract functions need a connected wallet, exactly like your backend needs a key before it can submit anything.

## Segment 2 (screenshot: Write Contract tab)

approve, transferFrom — state-changing functions, sitting right next to a Connect Wallet button. That's the sending side of the exact same contract you read from in Lesson 3.

## Segment 3 (code: ethers.js)

In ethers.js, a Wallet built from a private key and a provider can sign. wallet.sendTransaction moves ETH; a Contract connected to that wallet instead of a provider lets you call state-changing functions like transfer.

## Segment 4 (code: viem)

Viem's walletClient works the same way, built from an account instead of a plain provider. For contract writes, it simulates first to catch a revert before you spend any gas, then sends the request that simulation returns.

## Segment 5 (screenshot: tx gas/nonce/input data)

Sending doesn't mean it succeeded — waiting for the receipt is what tells you the real outcome. Gas used, the nonce it consumed, the EIP-1559 fee fields, and the decoded function call are all right there once it's mined.

## Segment 6 (screenshot: gas tracker)

Picking a sane gas price before you send is as simple as checking a live gas tracker instead of guessing.

## Segment 7 (outro)

Next up: nonces and gas estimation, in depth.
