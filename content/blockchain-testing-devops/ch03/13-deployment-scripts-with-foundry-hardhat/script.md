# Script — Deployment Scripts With Foundry/Hardhat

## Segment 1 (title)

A deploy script in Foundry is itself a Solidity contract — reviewable, testable, versioned — instead of a sequence of cast send commands someone ran once that nobody can reproduce exactly.

## Segment 2 (code: dry-run to broadcast)

Running the script with no flags simulates it — no transaction sent, which is how you catch a broken constructor argument before it costs real gas. Adding broadcast and rpc-url actually sends it to the target network.

## Segment 3 (code: keys)

A raw private-key flag puts a plaintext key into shell history. Foundry's recommended alternative is a keystore account — encrypted on disk, only prompting for a password at broadcast time.

## Segment 4 (code: named endpoints and the chain gotcha)

foundry.toml's rpc_endpoints table turns a long URL into a short alias. One real gotcha: chain only sets block.chainid inside the simulation — it doesn't select the destination network. rpc-url is what actually controls that.

## Segment 5 (outro)

The script simulates, broadcasts, and can even verify in the same command. Lesson 14 goes deep on that verification step — what it actually publishes, and why.
