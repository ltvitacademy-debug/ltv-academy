# Lesson 6 — Access Control Failures: The Parity Multisig Freeze

**Chapter 10 · Security Auditing · Lesson 6 of 6**

This lesson is a written case study — not a recording of a class
session. The previous two lessons were about a contract trusting the
wrong *price*. This one is about a contract trusting the wrong
*caller* — and it closes the chapter because it's the most structurally
different bug of the three: nothing was drained at all. Hundreds of
wallets were simply, permanently, locked.

## What you'll learn

- What an access control failure is, in the specific sense of "a
  function that should only ever be callable by one party, callable by
  anyone"
- The real mechanics of the November 2017 Parity multisig wallet
  freeze — a bug that didn't steal a single wei, and froze roughly
  half a billion dollars anyway
- Why shared library contracts, used the way Parity used them, turn
  one missing access check into a mass-casualty bug instead of a
  single-wallet bug
- How to write a Foundry test that specifically checks ownership and
  initialization functions can't be claimed by an unexpected caller

## What an access control failure is

Most of this chapter has been about contracts computing the wrong
*value* — paying out more than they should, or valuing collateral
incorrectly. An access control failure is different and, in some ways,
more basic: it's a function that performs a sensitive action — claiming
ownership, withdrawing funds, upgrading logic, destroying a contract —
with **no check on who is allowed to call it.**

```solidity
// Vulnerable: anyone can call this and become the owner.
// There's no check that msg.sender is expected to be unset,
// no onlyOwner modifier, nothing.
function initWallet(address[] calldata owners, uint256 required) external {
    for (uint i = 0; i < owners.length; i++) {
        isOwner[owners[i]] = true;
    }
    required_signatures = required;
}
```

If a function like this is only ever called once, by the deployer,
during setup, a missing access check can sit unnoticed for a long time
— until someone other than the deployer realizes it's callable and
calls it themselves.

## The Parity multisig freeze, November 6, 2017

Parity's multisig wallet contracts were built around a **shared library
pattern**, for a genuinely reasonable efficiency reason: instead of
every single multisig wallet deploying its own full copy of the wallet
logic (expensive, since you pay gas for every byte of deployed code),
each wallet was a thin proxy that used `delegatecall` to run its logic
against **one shared library contract**, deployed once.

That library contract had an `initWallet` function — meant to be called
exactly once, to set up the library's own owner list, as part of
deploying it. It had no access control on it at all.

On July 20, 2017, a user — publicly known by the handle **devops199** —
called `initWallet` on the shared library contract directly, which
nobody had done before. That call succeeded, and made devops199 the
library contract's owner. Later, on November 6, 2017, devops199 called
the library's `kill` function, which was correctly restricted to the
owner — and devops199 now **was** the owner.

`kill` ran `selfdestruct`, wiping the library contract's code from the
blockchain entirely.

Here's what made this catastrophic rather than merely odd: **every
multisig wallet that `delegatecall`ed into that library for its logic
now pointed at an address with no code at all.** Any function call into
any of those wallets — transfer, withdraw, anything — simply failed.
Parity's own post-mortem reported the damage: **513,774.16 ETH frozen
across 587 wallets**, worth roughly **$150 million** at the time (and
far more at later ETH prices). No attacker drained a single wallet.
Every one of those funds is, as of this lesson, still sitting in those
wallets, permanently inaccessible — there is no private key, no
governance vote, no upgrade path that can move them, because the logic
those wallets depend on no longer exists anywhere on-chain.

## Why this isn't the July 2017 Parity hack

It's worth being precise, because Parity had *two* separate serious
incidents in 2017 and they're easy to conflate. In **July 2017**, a
different, earlier bug in the multisig wallet's own code let an
attacker directly drain about 150,000 ETH from a smaller number of
wallets — a theft. The **November 2017** freeze covered in this lesson
is a completely different bug, in the shared library's initialization
function, and it didn't steal anything — it destroyed the one thing
every dependent wallet needed to function.

## The underlying pattern: a sensitive function with no caller check

```solidity
// The real pattern. "Should only run once, during setup" is not the
// same thing as "is protected from running more than once, or from
// running at all by someone you didn't expect."
function initWallet(address[] calldata owners, uint256 required) external {
    // Missing: a check that this hasn't already been initialized,
    // and/or a check on who is allowed to call it in the first place.
    for (uint i = 0; i < owners.length; i++) {
        isOwner[owners[i]] = true;
    }
    required_signatures = required;
}
```

The fix is one of the most well-established patterns in Solidity: an
explicit **initialization guard**, plus (where the function is meant to
be restricted at all after setup) an explicit **ownership check**.

```solidity
// Safer: a one-time initialization guard, the OpenZeppelin-style
// pattern used throughout production contracts today.
bool private initialized;

modifier onlyOnce() {
    require(!initialized, "Already initialized");
    initialized = true;
    _;
}

function initWallet(address[] calldata owners, uint256 required) external onlyOnce {
    for (uint i = 0; i < owners.length; i++) {
        isOwner[owners[i]] = true;
    }
    required_signatures = required;
}
```

```solidity
// And the kill function itself should never have been callable by
// anyone other than a legitimately-set owner in the first place.
modifier onlyOwner() {
    require(isOwner[msg.sender], "Not an owner");
    _;
}

function kill(address payable recipient) external onlyOwner {
    selfdestruct(recipient);
}
```

The deeper lesson generalizes past `initWallet` specifically: **any
function that performs a sensitive, one-time, or ownership-defining
action needs its own explicit access check — being "only meant to be
called once by the deployer" is a comment, not a security control.**

## Detecting this with Foundry

```solidity
// A negative test: an arbitrary, non-deployer address should never be
// able to call the initializer and claim ownership.
function test_RandomAddressCannotClaimOwnershipViaInitWallet() public {
    address randomUser = address(0xBEEF);

    vm.prank(randomUser);
    vm.expectRevert();
    wallet.initWallet(ownersArray, requiredSignatures);

    assertFalse(wallet.isOwner(randomUser));
}
```

```solidity
// A second negative test: even the legitimate deployer shouldn't be
// able to call it twice — the same gap that let devops199 reclaim an
// "already set up" library as if it had never been initialized.
function test_InitWalletCannotBeCalledTwice() public {
    vm.prank(deployer);
    wallet.initWallet(ownersArray, requiredSignatures);

    vm.prank(deployer);
    vm.expectRevert("Already initialized");
    wallet.initWallet(ownersArray, requiredSignatures);
}
```

```solidity
// An invariant: once a wallet has been initialized, its set of owners
// should never change through any path except the wallet's own,
// explicitly-guarded owner-management functions — never through a
// re-run of the initializer, from any caller, at any point.
function invariant_OwnersOnlyChangeThroughGuardedFunctions() public {
    assertEq(wallet.ownerCount(), expectedOwnerCountAfterOnlyLegitimateCalls);
}
```

## Practical engineering trade-offs

- **Shared library patterns save real gas, and that's not a mistake
  to avoid making again** — the efficiency reasoning behind Parity's
  design was sound. The missing access check was the bug, not the
  architecture itself. Modern proxy patterns (like OpenZeppelin's
  `Initializable`) keep the gas savings while closing exactly this gap.
- **An initialization guard is cheap insurance that's easy to forget
  precisely because it only matters once.** Code review checklists for
  any contract with an `init`-style function should treat "can this run
  twice, or run at all from an unexpected caller" as a mandatory
  question, not an optional one.
- **"No funds were stolen" is not the same as "no damage was done."**
  This bug produced one of the largest permanent losses in Ethereum's
  history without a single successful theft — a reminder that
  availability (can legitimate users still use their own funds) is a
  security property, not just confidentiality or integrity of funds.

## Key terms

| Term | Meaning |
|---|---|
| Access control failure | A sensitive function with no check on who is allowed to call it |
| Delegatecall | A call that runs another contract's code in the calling contract's own storage context — the mechanism Parity's proxy wallets used to share one library's logic |
| Initialization guard | A one-time-use check (typically a boolean flag) preventing a setup function from being called more than once, or by anyone other than the intended deployer |
| Selfdestruct | An opcode that removes a contract's code from the blockchain — used legitimately here, but on a contract that should never have been callable by devops199 in the first place |

## Check yourself

You've finished Chapter 10 when you can explain, in your own words, why
the Parity freeze being "a missing access check" rather than "an
attacker draining funds" actually made it worse in one specific way —
there was no theft to reverse, negotiate, or recover from, only
permanently dead code every dependent wallet still relied on.
