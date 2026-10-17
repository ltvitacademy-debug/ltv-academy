# Self-Review Security Checklist

> From Lesson 6 ("Testing & Security Review"), generalized for reuse
> across any of the three capstone projects. Pair with Lesson 21's
> five-step reading method (purpose → state reads/writes → external
> calls → arithmetic → access control) when a line item needs real
> investigation, not just a checkbox.
>
> A documented self-review is a real, honest deliverable — even
> without a paid external audit. "Not applicable, because X" is a
> complete and acceptable answer for any line below; leaving a line
> blank is not.

| # | Check | Applies? (Y/N) | Your finding |
|---|---|---|---|
| 1 | **Reentrancy** — does every function that makes an external call update its own state *before* that call (checks-effects-interactions), or use a reentrancy guard? | | |
| 2 | **Overflow/underflow** — is any arithmetic wrapped in an `unchecked` block? If so, is it actually safe, and is there a comment explaining why? | | |
| 3 | **First-interaction / division-by-zero edge cases** — does any function divide by a value that could legitimately be zero on a contract's very first use (e.g. a pool's first deposit, a DAO's first vote)? | | |
| 4 | **Access control** — for every state-changing function, who can call it right now, and who *should* be able to? Is "anyone can call this" a stated, deliberate decision, or an oversight? | | |
| 5 | **Slippage / front-running** — can a transaction be sandwiched or front-run for a worse outcome than the caller expected? Is there a `minAmountOut`-style guard, or is the risk explicitly documented as unresolved? | | |
| 6 | **Rounding** — does any integer division round down in a way that could trap small amounts over many operations? Worth a one-line note even if not a blocker. | | |
| 7 | **External call failure handling** — does any function treat a failed external call (a `require(ok, ...)` after a `.call`) as fatal to the whole transaction, when the recipient is an untrusted third party who could deliberately make that call fail? Consider a pull-payment pattern instead. | | |
| 8 | **Centralization / admin risk** — does any single key (deployer, owner) retain standing power that should have been renounced or handed to a timelock/multisig once setup finished? | | |

## How to use this

1. Copy this table into your project's README.
2. For each row, write Y or N in the "Applies?" column — not every
   check applies to every project.
3. For every row marked Y, write your actual finding: what you
   checked, what you found, and what you did about it (fixed it, or
   documented it as a known, accepted limitation).
4. Link the specific test(s) that prove your finding, where one
   exists.
