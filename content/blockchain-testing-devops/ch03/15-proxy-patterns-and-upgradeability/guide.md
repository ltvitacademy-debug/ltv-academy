# Lesson 15 — Proxy Patterns & Upgradeability

**Chapter 3 · Deployment Strategy · Lesson 15 of 29**

## What you'll learn

- How `delegatecall` lets a proxy contract run someone else's logic while keeping its own storage
- The real difference between Transparent, UUPS, and Beacon proxy patterns
- The actual `_authorizeUpgrade` pattern OpenZeppelin's UUPS implementation requires
- Why Lesson 7's "immutability" framing has one real exception — and the new risks that exception introduces

## The exception to immutability

Lesson 7 established that deployed bytecode is permanent. Proxy patterns are the deliberate, designed-in exception: a **proxy** contract holds the storage and the address users interact with, while a separate **implementation** contract holds the logic. The proxy uses `delegatecall` to run the implementation's code *in the proxy's own storage context* — so "upgrading" means pointing the proxy at a new implementation address, without the proxy's address or its storage ever changing.

```
User  -->  Proxy (storage lives here, address never changes)
             |  delegatecall
             v
         Implementation V1  -->  (upgrade)  -->  Implementation V2
```

## Three patterns, one mechanism

All three major patterns use `delegatecall` underneath — they differ in **who's allowed to trigger an upgrade and how that authorization is checked**:

- **Transparent Proxy** — the proxy itself checks whether the caller is the admin; admin calls go to proxy-management logic, everyone else's calls get delegated to the implementation. Simple to reason about, costs a bit more gas per call for that check.
- **UUPS (Universal Upgradeable Proxy Standard, ERC-1822)** — the upgrade logic lives in the *implementation* itself, not the proxy, via an `_authorizeUpgrade` function the implementation must override. Cheaper proxy calls (no admin check in the thin proxy), but every implementation must remember to protect `_authorizeUpgrade`.
- **Beacon Proxy** — many proxies point at one shared beacon, which points at the current implementation. Upgrading the beacon upgrades *every* proxy pointing at it simultaneously — the right shape for a factory that's deployed hundreds of nearly-identical proxies.

## UUPS, the current OpenZeppelin default

```solidity
contract VaultV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    function initialize(address owner) public initializer {
        __Ownable_init(owner);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}
```

Two things that trip up a first implementation: **no constructor** — upgradeable contracts use an `initialize()` function with the `initializer` modifier instead, since a constructor's state changes never apply to the proxy's storage. And `_authorizeUpgrade` must be protected (here, `onlyOwner`) — leave it unprotected and *anyone* can point your proxy at arbitrary malicious logic.

## The new risk this introduces

A proxy reintroduces exactly the kind of risk immutability was protecting against: whoever controls the upgrade function can change the contract's entire logic, including logic that drains funds, at any time. That's precisely why Lesson 16's multisig-controlled deployments matter even more for upgradeable contracts than for immutable ones — `_authorizeUpgrade`'s `onlyOwner` should almost never be a single EOA for anything holding real value.

## Key terms

| Term | Meaning |
|---|---|
| `delegatecall` | Runs another contract's code in the caller's own storage context |
| Proxy / Implementation | The fixed-address storage holder / the swappable logic contract |
| `_authorizeUpgrade` | UUPS's override point for who's allowed to trigger an upgrade |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why does an unprotected `_authorizeUpgrade` function make a UUPS proxy more dangerous than an immutable contract with a bug?
