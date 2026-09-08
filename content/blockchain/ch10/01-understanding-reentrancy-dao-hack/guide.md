# Lesson 1 — Understanding Reentrancy: The DAO Hack

**Chapter 10 · Security Auditing · Lesson 1 of 3**

> Real classroom footage from the LTV Academy Blockchain Development course, taught by instructor Harris Lavine, referencing the real Chainlink blog on-screen.

## What you'll learn

- What a reentrancy attack actually is, with a real, concrete ATM analogy
- Why fallback functions are the real mechanism that makes reentrancy possible
- The real, historical story of the 2016 DAO hack — the most consequential exploit in Ethereum's history
- Why "code is law" became a real, contested question in the Ethereum community

## The real, plain-language definition

> "Reentrancy is a type of smart contract vulnerability where a
> malicious contract repeatedly calls back into a vulnerable contract
> before the first function call finishes, causing the vulnerable
> contract to behave in unintended ways, like sending money multiple
> times."

## A real, concrete analogy

![The real Chainlink blog article referenced in class: "Reentrancy Attacks and The DAO Hack."](/courses/blockchain/ch10/01-understanding-reentrancy-dao-hack/shot_chainlink_article_title.png)
*The real article this lesson's explanation is grounded in.*

> "You're at an ATM. You press withdraw 100. But before the ATM
> finishes updating your balance, you quickly press the button again
> over and over. Because the machine hasn't finished subtracting the
> money from your account, it keeps giving you $100 again and again.
> That's reentrancy."

**Reentrancy happens when a contract makes an external call before
updating its own state** — and attackers exploit exactly that gap.

## Why fallback functions make this possible

A **fallback function** is a real, special construct in Solidity:
unnamed, externally triggered, and — critically — it can contain
**arbitrary logic**. When a contract sends ETH to another contract with
no matching function call, the receiving contract's fallback function
fires automatically. **This is the real mechanism a reentrancy attack
hijacks** — malicious code placed inside a fallback function.

## The real DAO hack, in brief

![The real, actual illustration from the Chainlink article, showing exactly how the hacker's contract looped between the fallback function and the DAO's withdraw function.](/courses/blockchain/ch10/01-understanding-reentrancy-dao-hack/shot_dao_hack_diagram.png)
*The real attack pattern: withdraw → fallback → withdraw again → fallback again, looping before any balance is ever updated.*

In 2016, **The DAO** — a decentralized investment fund that had raised
**150 million dollars' worth of ETH** — was drained by a real attacker
using exactly this exploit. Because the DAO's contract sent ETH to a
caller **before** updating that caller's recorded balance, the attacker's
own malicious fallback function could call `withdraw` again and again,
each time still passing the balance check, since the real balance had
never actually been decremented.

## A real, lasting ideological rift

The response split the Ethereum community into two real camps:

- **"Code is law"** — the code did exactly what it was written to do;
  intervening, even to undo theft, violates the core promise of
  blockchain immutability.
- **Intervention is justified** — real people's real savings were
  being drained, and preventing that outweighs strict immutability.

The community ultimately voted for a **hard fork** to reverse the
theft — a decision so contested that it produced **two separate real
blockchains that still exist today: Ethereum and Ethereum Classic.**

## Key terms

| Term | Meaning |
|---|---|
| Reentrancy | Exploiting the gap between an external call and a contract's own state update |
| Fallback function | The special function triggered when ETH arrives with no matching function call |
| The DAO hack | The 2016 exploit that drained $150M and led to Ethereum's hard fork |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your
own words, why the DAO's real vulnerability was a poorly ordered
smart contract, not a flaw in Ethereum itself.
