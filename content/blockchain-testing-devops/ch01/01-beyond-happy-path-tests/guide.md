# Lesson 1 — Beyond Happy-Path Tests

**Chapter 1 · Testing Smart Contracts Rigorously · Lesson 1 of 29**

## What you'll learn

- Why a test suite that only exercises the "it works when called correctly" path gives false confidence
- The five categories of behavior a rigorous Solidity test suite actually has to cover
- How Foundry's `vm.expectRevert` and `vm.prank` cheatcodes let you assert the *failure* paths, not just the success path
- Why most real-world exploits happened on code paths nobody wrote a test for

## The happy path is the easy 10%

A "happy-path" test calls a function with valid input, in the expected order, from an authorized caller, and checks the obvious result:

```solidity
function test_Withdraw() public {
    vault.deposit{value: 1 ether}();
    vault.withdraw(1 ether);
    assertEq(address(vault).balance, 0);
}
```

This test is real and it's not wrong to write — but it only proves the function works once, called correctly, by someone who isn't trying to break it. It says nothing about what happens when the caller isn't the owner, when the amount is zero, when the amount exceeds the balance, or when the function gets called twice in the same transaction.

## What a rigorous suite actually checks

Foundry's `vm.expectRevert` cheatcode asserts that the *next* call reverts, optionally with a specific custom error, require string, or selector. `vm.prank(address)` makes the next call originate from a specific address, which is how you simulate an attacker or an unauthorized caller without actually controlling their key:

```solidity
function test_RevertWhen_WithdrawExceedsBalance() public {
    vault.deposit{value: 1 ether}();
    vm.expectRevert(Vault.InsufficientBalance.selector);
    vault.withdraw(2 ether);
}

function test_RevertWhen_UnauthorizedCaller() public {
    vm.prank(attacker);
    vm.expectRevert("Ownable: caller is not the owner");
    vault.emergencyWithdraw();
}
```

Neither of these tests exercises the happy path at all — they exist entirely to prove the contract *fails correctly* when it should. That's the category of test most teams under-write, and it's the category that actually catches exploitable bugs before mainnet does.

## The five categories

| Category | What it proves |
|---|---|
| Happy path | The function works when called correctly |
| Boundary values | Zero, the exact threshold, `type(uint256).max` don't break accounting |
| Revert conditions | Every `require`/custom error actually fires on bad input |
| Access control | Only the intended caller(s) can reach privileged functions |
| Call ordering | State stays correct across call sequences a single happy-path test never exercises |

Lessons 2 and 3 automate the last two categories at scale — fuzz testing throws thousands of boundary values at a function automatically, and invariant testing throws thousands of call *sequences* at your whole contract.

## Key terms

| Term | Meaning |
|---|---|
| Happy path | The test path where input is valid and the caller is authorized |
| `vm.expectRevert` | Foundry cheatcode asserting the next call reverts |
| `vm.prank` | Foundry cheatcode that makes the next call originate from a chosen address |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why does a test suite that's 100% happy-path tests still miss the bugs that actually get exploited?
