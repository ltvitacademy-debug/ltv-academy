# Script — Proxy Patterns & Upgradeability

## Segment 1 (title)

Deployed bytecode is permanent, except for one deliberate, designed-in exception. A proxy holds the storage and the address users interact with, while a separate implementation contract holds the logic.

## Segment 2 (steps: proxy mechanism)

delegatecall runs the implementation's code inside the proxy's own storage context. Upgrading means pointing the proxy at a new implementation address — the proxy's address and storage never change.

## Segment 3 (code: three patterns)

All three patterns use delegatecall underneath — they differ in who's allowed to trigger an upgrade. Transparent checks the caller in the proxy itself. UUPS puts that check in the implementation. Beacon lets many proxies upgrade together through one shared pointer.

## Segment 4 (code: UUPS syntax)

No constructor — an initialize function with the initializer modifier instead, since a constructor's state changes never apply to the proxy's storage. authorizeUpgrade must be protected — leave it open and anyone can point your proxy at malicious logic.

## Segment 5 (outro)

A proxy reintroduces exactly the risk immutability was protecting against. That's why Lesson 16's multisig-controlled deployments matter even more here — authorizeUpgrade should almost never be a single key.
