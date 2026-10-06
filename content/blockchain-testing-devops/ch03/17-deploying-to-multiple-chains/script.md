# Script — Deploying to Multiple Chains

## Segment 1 (title)

A contract deployed with plain CREATE gets an address derived from the deployer and its transaction nonce. The moment nonces diverge across chains — and they will — the same contract lands at different addresses on each one.

## Segment 2 (code: CREATE2)

CREATE2 derives an address from the deployer, a salt, and the contract's init code — not the nonce. Same deployer, same salt, same bytecode on two different chains produces the same address on both, even as entirely separate transactions.

## Segment 3 (code: matrix job)

GitHub Actions' strategy matrix runs the same job once per entry in a list — exactly the shape a multi-chain deploy needs. Each chain runs as its own isolated job in parallel, against its own named RPC endpoint.

## Segment 4 (per-chain multisig)

Multisig discipline doesn't collapse into one approval for every chain. A Safe is deployed per chain, and each chain's deployment needs its own confirmations from that chain's Safe — five chains means running the propose-and-confirm flow five separate times.

## Segment 5 (outro)

That closes Chapter 3 — testnets, deploy scripts, verification, proxies, multisig control, and now multi-chain, all as one coherent deployment discipline, not six separate habits.
