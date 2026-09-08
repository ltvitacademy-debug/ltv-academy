# Lesson 2 — The Multi-Signature Wallet: Setting Up Shared Control

**Chapter 8 · Full-Stack DApp Development · Lesson 2 of 2**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What a multi-signature wallet actually is, and why real DAOs and teams use them
- How to design the full state and structure a real multisig needs, before writing a single function
- Every real event, struct, and modifier this contract requires
- Why the events and modifiers built here are the exact same tools from earlier chapters, just combined at a larger scale

## What a multi-sig wallet actually is

> "A multi-signature wallet is a contract where multiple owners must
> approve a transaction before it can be executed. This is a common
> tool used in DAOs, treasuries, or team-managed funds to reduce the
> risk of a single bad actor draining funds."

Its real purpose: **enhanced security** (no single person controls all
funds), **transparency** (every approval and execution is recorded
on-chain), and **shared control** (a team manages ETH collectively).

## The real plan, before any code

- A **list of owners**, set once at deployment.
- A **required number of approvals** that must be met before any
  transaction executes.
- Owners can **submit**, **approve**, **revoke** their approval, or
  **execute** a transaction once enough approvals exist.

## Every real event this contract needs

![The complete, real set of five events for the MultiSigWallet contract — Deposit, SubmitTransaction, ConfirmTransaction, RevokeConfirmation, and ExecuteTransaction.](/courses/blockchain/ch08/02-multisig-wallet-setup/shot_multisig_events.png)
*Every real action a multisig wallet takes gets its own event — nothing happens silently.*

```solidity
event Deposit(address indexed sender, uint256 amount, uint256 balance);
event SubmitTransaction(address indexed owner, uint256 indexed txIndex, address indexed to, uint256 value, bytes data);
event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);
```

As a real recap: the `indexed` keyword on each of these lets you later
search the blockchain for exactly where a given owner or transaction
was logged.

## The real state and structure

![The completed real setup: the nested `isConfirmed` mapping, the `transactions` array, the `onlyOwner` modifier, and the constructor validating the required confirmation count.](/courses/blockchain/ch08/02-multisig-wallet-setup/shot_multisig_struct_modifiers.png)
*Everything this contract needs to actually track ownership, transactions, and approvals.*

```solidity
address[] public owners;
mapping(address => bool) public isOwner;
uint256 public numConfirmationsRequired;

struct Transaction {
    address to;
    uint256 value;
    bytes data;
    bool executed;
    uint256 numConfirmations;
}

// mapping from tx index => owner => bool
mapping(uint256 => mapping(address => bool)) public isConfirmed;

Transaction[] public transactions;
```

## Real, necessary modifiers

```solidity
modifier onlyOwner() {
    require(isOwner[msg.sender], "not owner");
    _;
}

modifier txExists(uint256 _txIndex) {
    require(_txIndex < transactions.length, "transaction does not exist");
    _;
}

modifier notExecuted(uint256 _txIndex) {
    require(!transactions[_txIndex].executed, "transaction already executed");
    _;
}

modifier notConfirmed(uint256 _txIndex) {
    require(!isConfirmed[_txIndex][msg.sender], "transaction already confirmed");
    _;
}
```

Every one of these modifiers is a real, necessary guard rail — before
this contract ever lets someone approve or execute a transaction, it
has to confirm the caller is actually an owner, the transaction
actually exists, it hasn't already run, and this specific owner hasn't
already approved it.

## Why this chapter builds on everything before it

Nothing here is a genuinely new concept — it's **the same real tools
from earlier chapters, combined at a larger scale**: events (Chapter
6), structs and nested mappings (Chapter 6), and modifiers (Chapter 6)
all come together into one real, production-shaped contract.

## Key terms

| Term | Meaning |
|---|---|
| Multi-signature wallet | A contract requiring multiple owner approvals before executing a transaction |
| mapping(uint256 => mapping(address => bool)) | Tracks, per transaction, exactly which owners have already approved it |
| txExists / notExecuted / notConfirmed | Real guard-rail modifiers preventing invalid or duplicate actions |

## Check yourself

You've finished Chapter 8 when you can explain, in your own words, why
a real team or DAO would prefer a multi-signature wallet over a wallet
controlled by a single private key.
