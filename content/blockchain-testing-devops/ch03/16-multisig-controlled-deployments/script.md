# Script — Multisig-Controlled Deployments

## Segment 1 (title)

A single key controlling a contract's owner functions or upgrade authorization is one leaked key, one phished signer, away from total loss of control. Safe is the standard way teams avoid that — M of N signatures required before anything executes.

## Segment 2 (screenshot: transaction queue)

This is a real Safe account's queue — a 4 of 7 threshold badge, and each pending transaction showing exactly how many confirmations it still needs. Nothing executes until the threshold is met.

## Segment 3 (screenshot: owner key management)

Growing a Safe's owner set is itself a multisig-gated action. Each signer manages their own key independently — a Safe never holds or has access to any individual owner's private key.

## Segment 4 (screenshot: create account)

A Safe account itself starts from a simple creation flow — choosing owners and a threshold at setup. From there, a deploy or upgrade transaction gets proposed to the Safe and confirmed by enough owners before it executes.

## Segment 5 (outro)

No single key, no single point of failure. Lesson 17 takes this same deployment discipline and extends it across multiple chains at once.
