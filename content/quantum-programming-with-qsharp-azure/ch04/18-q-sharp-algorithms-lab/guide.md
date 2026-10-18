# Q# Algorithms Lab

Running the numbers on a variant of Grover's algorithm you haven't seen worked out yet is the real test of whether you understand the mechanism, not just the recipe. This lab extends the single-marked-item case from the previous lesson to two marked items — and the result is deliberately counterintuitive.

## What you'll learn

- How to extend a 2-qubit Grover oracle to mark two items instead of one
- A verified, exact result showing that more marked items does NOT simply mean "easier" or "better amplified"
- Why the number of Grover iterations has to match the actual number of marked items, not just the search space size
- How to reason about this kind of exercise with explicit state-vector math instead of intuition alone

## The exercise: mark two items instead of one

Take the same 2-qubit search space (`N = 4`, indices 0-3) from the previous lesson, but this time mark **two** items — say index 1 (`|01⟩`) and index 3 (`|11⟩`) — instead of one:

```qsharp
operation MarkItems1And3(qs : Qubit[]) : Unit is Adj + Ctl {
    // flip the sign of |01> and |11> -- i.e. every state where qs[1] (the low bit) is One
    Z(qs[1]);
}
```

Because both marked indices (1 and 3) share the same low-order qubit value (`One`), a single `Z` on that qubit is enough to flip both of their signs at once — a reminder that an oracle's gate structure depends on which bit pattern the marked items actually share, not just how many there are.

## Running one Grover iteration, verified

Starting from the uniform superposition `[0.5, 0.5, 0.5, 0.5]`, applying this 2-item oracle gives `[0.5, -0.5, 0.5, -0.5]` (signs flipped on indices 1 and 3). Applying the same diffusion operator `D = 2|s⟩⟨s| - I` from the previous lesson — verified by explicit matrix computation, not assumed — produces:

```
inner product ⟨s|oracle_state⟩ = 0.5(0.5) + 0.5(-0.5) + 0.5(0.5) + 0.5(-0.5) = 0
final state = 2·s·0 - oracle_state = [-0.5, 0.5, -0.5, 0.5]
probabilities = [0.25, 0.25, 0.25, 0.25]
```

The result is exactly uniform — **identical** to the starting distribution, before any oracle or diffusion was applied at all. One iteration produced zero net amplification on either marked item.

## Why this happens

The reason is visible directly in the math: the diffusion step's effect scales with the inner product `⟨s|oracle_state⟩`, and with exactly half of the search space marked, the positive and negative contributions to that inner product cancel exactly to zero. With one marked item out of four (the previous lesson), that inner product was nonzero and one iteration hit the optimal amplification point exactly. With two marked items out of four, the symmetry of "half marked, half unmarked" happens to make one iteration a wash. This is the concrete lesson underneath the general `π/4 × √(N/M)` iteration-count formula (where `M` is the number of marked items): the right number of iterations depends on *how many* items are marked, and guessing wrong — even by assuming "more marked items always means an easier search" — can leave you with literally no improvement over guessing randomly.

## What to take away for real algorithm work

This is exactly the kind of result you'd catch by running your oracle through the resource estimator or a simulator with the correct iteration count computed for your actual `M`, rather than reusing an iteration count tuned for a different problem instance. In a real Q# program, the fix is straightforward — compute the iteration count from `M` (which you may need to estimate or know in advance, a genuine limitation of Grover's algorithm in practice) and loop that many times, not a fixed count borrowed from a different-sized problem.

## Key terms

| Term | Meaning |
|---|---|
| Marked-item count (M) | The number of basis states an oracle flags; determines the correct number of Grover iterations |
| Iteration-count formula | The approximate `π/4 × √(N/M)` optimal iteration count, which depends on both N and M |
| Amplitude cancellation | What happened here: the diffusion step's inner product with the oracle output was exactly zero, producing no net amplification |

## Check yourself

Given the verified result that one iteration with 2 marked items out of 4 produces no amplification at all, what number of iterations (if any) would you expect to actually help in this specific 2-marked-out-of-4 case, and why might this particular ratio of marked-to-total items be an unusually hard case for Grover's algorithm specifically?
