# Lesson 10 — Running Slither & Mythril in CI

**Chapter 2 · CI/CD for Smart Contracts · Lesson 10 of 29**

## What you'll learn

- What Slither (static analysis) and Mythril (symbolic execution) each actually do, and how they differ
- Real output from both tools, so you recognize what a finding looks like
- The real `crytic/slither-action` GitHub Actions integration, including `fail-on` severity gating
- Why these tools are a floor, not a substitute for the human-reviewed audit Chapter 3 assumes happens before mainnet

## Slither: fast, static, every PR

**Slither** (by Trantor/Crytic) analyzes Solidity source without executing it — it builds a control-flow graph and pattern-matches against a large library of known vulnerability classes. It's fast enough to run on every single PR:

```bash
$ slither .
```

```
INFO:Detectors:
Reentrancy in Vault.withdraw(uint256) (src/Vault.sol#42-49):
    External calls:
    - (success) = msg.sender.call{value: amount}() (src/Vault.sol#45)
    State variables written after the call(s):
    - balances[msg.sender] -= amount (src/Vault.sol#47)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
```

This is a textbook reentrancy finding: a state write (`balances[msg.sender] -= amount`) happening *after* an external call, instead of before it — the exact ordering bug behind the original DAO hack.

## Mythril: slower, symbolic, deeper

**Mythril** uses symbolic execution — it explores actual execution paths through the bytecode with symbolic (unconstrained) inputs, looking for a path that reaches an unsafe state. It's slower than Slither but catches issues that pure pattern-matching misses:

```bash
$ myth analyze src/Vault.sol
```

```
==== Reentrancy ====
SWC ID: 107
Severity: Medium
Contract: Vault
Function name: withdraw(uint256)
PC address: 731
Estimated Gas Usage: 2731 - 37904
A reentrancy vulnerability was detected.
```

Each finding cites an **SWC ID** — the Smart Contract Weakness Classification, a standardized registry of vulnerability categories, so a finding is cross-referenceable across tools and audits, not just tool-specific jargon.

## Wiring Slither into GitHub Actions

`crytic/slither-action` is the official integration:

```yaml
- name: Run Slither
  uses: crytic/slither-action@v0.4.2
  with:
    target: .
    fail-on: high
```

`fail-on` sets the minimum severity that fails the build — `fail-on: high` lets low/medium informational findings through without blocking a merge, while still gating on anything serious. For SARIF output wired into GitHub's own Code Scanning tab (so findings show up as annotations directly on the PR diff), `fail-on: none` is required on the Slither step itself, with the actual gating handled by a separate step that uploads the SARIF.

## These tools are a floor, not an audit

Both tools catch *known* vulnerability patterns. Neither understands your contract's actual business logic — a logic bug that's "secure" by every pattern Slither and Mythril check for, but still economically exploitable, passes both tools clean. That's exactly why Chapter 3's pre-launch discipline (Lesson 26) still assumes a human-reviewed audit before meaningful value touches a mainnet contract — these CI tools are the floor every PR has to clear, not the ceiling.

## Key terms

| Term | Meaning |
|---|---|
| Slither | Fast static analyzer — pattern-matches known vulnerability classes without executing code |
| Mythril | Symbolic execution engine — explores actual paths through bytecode for unsafe states |
| SWC ID | Smart Contract Weakness Classification — standardized vulnerability category ID |
| `fail-on` | The severity threshold that fails a Slither Action's CI step |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why can a contract pass both Slither and Mythril clean and still have an exploitable bug?
