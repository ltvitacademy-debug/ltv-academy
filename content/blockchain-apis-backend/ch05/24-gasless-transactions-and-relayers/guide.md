# Lesson 24 — Gasless Transactions & Relayers

**Chapter 5 · Wallets & Sessions on the Backend · Lesson 24 of 24**

## What you'll learn

- Why requiring ETH for gas is a real onboarding barrier, and what "gasless" actually means
- The meta-transaction pattern: sign intent, let someone else pay and submit
- The real `ERC-2771` trusted-forwarder shape, and why `msg.sender` alone can't be trusted inside it
- What a relayer is responsible for, and the real cost and trust tradeoffs it introduces

## The problem: gas is a terrible first impression

Every transaction this course has sent needed ETH (or the native gas
token) in the sending wallet. That's a real barrier for a brand-new
user: someone who just signed in with Ethereum in Lesson 21 may not hold
any ETH at all, and asking them to go acquire some before they can take
a single action is exactly the kind of friction that kills onboarding.
"Gasless" doesn't mean the gas disappears — blockspace is never free —
it means the *user* doesn't need to hold the token to pay for it
themselves. Someone else, or some other mechanism, covers it.

## The meta-transaction pattern

The core idea: a user signs a message describing *what they want to
happen*, not a transaction itself, and hands that signed message to a
relayer, who wraps it into a real transaction, pays the gas, and submits
it on-chain.

```
1. User signs an intent off-chain
   (e.g. "call transfer(to, amount) on this contract")
2. User sends the signed intent to a relayer (your backend, or a
   service like OpenZeppelin Defender or Biconomy)
3. Relayer wraps it in a real transaction, pays gas, submits it
4. The target contract verifies the user's signature matches the
   intent before acting — not the relayer's identity
```

This should look familiar: it's the same signing-without-a-transaction
pattern as Lesson 21's SIWE message, applied to an action instead of a
login.

## The real contract-side shape: ERC-2771

The standard pattern for a contract to safely accept meta-transactions is
`ERC-2771`'s trusted-forwarder model. The core problem it solves:
inside a relayed call, `msg.sender` is the **relayer's** address, not the
user's — so a contract can't just check `msg.sender` the normal way
without accidentally authorizing the relayer instead of the user.

```solidity
import {ERC2771Context} from
  "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract MyApp is ERC2771Context {
  constructor(address trustedForwarder)
    ERC2771Context(trustedForwarder) {}

  function doSomething() public {
    address user = _msgSender(); // the REAL user, not the relayer
    // ...safe to use `user` for authorization here
  }
}
```

`ERC2771Context` overrides `_msgSender()` so that, when the call arrives
through the trusted forwarder, it extracts and returns the original
user's address (appended to the calldata by the forwarder after
verifying the user's signature) instead of the relayer's. Every function
that needs to know who the real caller is uses `_msgSender()`, never raw
`msg.sender`, once a contract adopts this pattern.

## What a relayer is actually responsible for, and what it costs

A relayer isn't magic — it's a real backend service, usually built on
the same wallet-and-transaction-sending patterns from Chapter 1,
responsible for verifying the user's signature before forwarding
anything, paying real gas out of its own funded wallet, and deciding
which requests it's willing to sponsor at all, since an open relayer
accepting any signed intent from anyone is a direct drain on its own
funds. That last point is the actual tradeoff: gasless UX for the user
means somebody — the app, a sponsor, a protocol treasury — is paying
real money for gas, and that cost has to be budgeted and rate-limited
like any other operating expense, not treated as free.

## Key terms

| Term | Meaning |
|---|---|
| Meta-transaction | A signed intent a relayer wraps into a real, gas-paying transaction |
| Relayer | The backend service that pays gas and submits the wrapped transaction |
| `ERC-2771` | The trusted-forwarder standard letting a contract safely recover the real user's address |
| `_msgSender()` | The ERC-2771-aware replacement for raw `msg.sender` inside a relayed call |

## Check yourself

You've completed this course when you can explain: why can't a contract
just use `msg.sender` directly to authorize a relayed action — what
specifically would go wrong if it did?

## What's next

This course covered the off-chain half of a dApp: talking to the chain,
listening for events, indexing data, pulling in oracle data, and now
wallets and sessions on the backend. The next course in the Blockchain
Engineer path, **DeFi & Token Engineering**, builds on all of it —
taking these same backend patterns into the specific mechanics of
tokens, liquidity, and decentralized finance protocols.
