# Script — Verifying Contracts on Block Explorers

## Segment 1 (title)

A deployed contract is just bytecode on-chain — unreadable, a black box to anyone deciding whether to trust it. Verification publishes the source, the exact compiler settings, and the constructor arguments, matched byte-for-byte against what's actually deployed.

## Segment 2 (code: forge verify-contract)

forge verify-contract does this programmatically, right after the deploy script. constructor-args has to be the ABI-encoded version of exactly what the constructor received — cast abi-encode produces that, since even a correct-looking but misformatted argument fails the match.

## Segment 3 (screenshot: verify and publish form)

Etherscan's own Verify and Publish form walks through contract details, then source and settings — this is what manual verification actually looks like, step by step.

## Segment 4 (screenshot: advanced configuration)

This is where a correct contract most often fails verification — Optimization, Runs, and EVM Version all have to match the actual deployed values exactly, not reasonable-looking defaults.

## Segment 5 (screenshot + outro)

A successful verification exposes the compiled output — ABI, bytecode, compiler settings, all now readable. Lesson 15 looks at contracts designed to change after deployment — proxy patterns and upgradeability.
