# Lesson 6 — Events: How Contracts Talk to the Outside World

**Chapter 6 · Token Standards · Lesson 6 of 7**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, live-coding in the actual Remix IDE.

## What you'll learn

- What an event actually is, and why it's cheaper than a state variable
- How to declare an event and fire it with `emit`
- What the `indexed` keyword actually does for searching logs
- Why front-end apps depend on events to show real-time updates

## A real train-station analogy

> "Imagine you're at a train station. When a train arrives, the
> intercom says, 'Train 347 has arrived on track 5.' That's exactly
> what an event does. It's a public announcement that other systems or
> people can react to."

**Events** log data on the blockchain, help front-end apps listen for
changes, are cheap to store compared to state variables, and are
**read-only** — a contract can never read its own past events back.

## Declaring and firing a real event

![The actual `Transfer` event being typed live in class — three real parameters: who sent it, who received it, and how much.](/courses/blockchain/ch06/06-events/shot_transfer_event_declaration.png)
*Declaring an event: the `event` keyword, a capitalized name, and its parameters.*

```solidity
event Transfer(address from, address to, uint256 amount);
```

To actually fire it, you use the **`emit`** keyword:

```solidity
emit Transfer(msg.sender, to, amount);
```

**`emit`** is the real mechanism that fires the event and logs it
permanently to the blockchain.

## A complete real example: a deposit event

![The complete real `Event` contract from class: a `deposit()` function that updates a balances mapping, then emits a real `Deposit` event.](/courses/blockchain/ch06/06-events/shot_deposit_event_contract.png)
*A full, working example — updating state, then announcing that it happened.*

```solidity
event Deposit(address indexed sender, uint amount);
mapping(address => uint) public balances;
address owner;

constructor() {
    owner = msg.sender;
}

function deposit() public payable {
    balances[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);
}
```

Now anyone watching this contract — a front end, a block explorer, or
another contract — can see exactly that a deposit happened, and who was
involved, without needing to constantly re-check the contract's state.

## indexed: making logs actually searchable

You can tag up to **three parameters** in an event with `indexed`. This
allows for real, fast searching and filtering in logs — for example,
filtering for every transfer *from* one specific address. Non-indexed
parameters can't be filtered this way.

## Why front ends actually care about events

Real web apps listen for events to display activity in real time,
instead of constantly polling the contract's state. The instructor's
own real example (not Solidity, just illustrative JavaScript):

```js
// contract.on("Deposit", (user, amount) => {
//   console.log(user + " ether deposited " + amount);
// });
```

This lets a DApp's interface update instantly the moment something
real happens on-chain.

## Key terms

| Term | Meaning |
|---|---|
| event | Declares a real, loggable announcement a contract can make |
| emit | Fires an event and permanently logs it to the blockchain |
| indexed | Marks a parameter as searchable/filterable in event logs (max 3) |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own
words, why a front-end app would rather listen for a `Deposit` event
than repeatedly check the contract's `balances` mapping directly.
