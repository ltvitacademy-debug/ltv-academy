# Why Simulators Don't Scale: the Exponential Wall

The index-pairing trick from the last lesson makes simulating a *gate* cheap, but it can't rescue the one thing that's fundamentally expensive: the state vector itself has 2^n entries, and that number explodes far faster than any amount of hardware improvement can keep up with. This is the single most important practical fact separating "simulating quantum computing" from "doing quantum computing."

## What you'll learn

- Exactly how much memory an n-qubit state vector requires, computed for real values of n
- Where that cost crosses from "runs on a laptop" to "needs a supercomputer" to "impossible with any amount of classical matter"
- Why this is a fact about the *representation*, not about any particular simulator's code quality
- How this exponential gap is precisely the resource a real quantum computer sidesteps

## Counting the bytes, for real

Each amplitude in a full-precision simulator is a complex number, typically stored as two 8-byte doubles (one for the real part, one for the imaginary part) — 16 bytes per amplitude. An n-qubit state vector needs 2^n amplitudes, so its memory footprint is 2^n × 16 bytes. I computed this directly in `node` rather than estimating it:

```
n=10  amplitudes=2^10=1,024                 bytes=16,384                      = 16.000 KB
n=20  amplitudes=2^20=1,048,576              bytes=16,777,216                 = 16.000 MB
n=24  amplitudes=2^24=16,777,216             bytes=268,435,456                = 256.000 MB
n=30  amplitudes=2^30=1,073,741,824          bytes=17,179,869,184             = 16.000 GB
n=40  amplitudes=2^40=1,099,511,627,776      bytes=17,592,186,044,416         = 16.000 TB
n=45  amplitudes=2^45=35,184,372,088,832     bytes=562,949,953,421,312        = 512.000 TB
n=50  amplitudes=2^50=1,125,899,906,842,624  bytes=18,014,398,509,481,984     = 16.000 PB
```

## Where the wall actually is

Reading that table as a timeline of hardware tiers: **n=24** (256 MB) comfortably fits in a laptop's RAM. **n=30** (16 GB) is right at the edge of a high-end consumer machine. **n=40** (16 TB) needs a serious compute cluster — this is roughly the ceiling for what the largest classical supercomputers in the world can brute-force simulate today, and even then only for short, carefully chosen circuits. **n=50** (16 PB) is already past what any single facility stores for this purpose, and every additional qubit *doubles* the requirement again — n=60 would be 16 exabytes, n=70 would be 16 zettabytes. Doubling with every qubit means adding "just 10 more qubits" to a simulation multiplies its memory cost by 1,024×, not by 10×.

## Why doubling is the whole problem

This isn't a software inefficiency that a cleverer simulator can fix — it's a direct consequence of what an n-qubit quantum state *is*: a point in a 2^n-dimensional vector space, full stop. The index-pairing technique from the previous lesson makes applying each *gate* efficient, but it cannot shrink the vector itself, because every one of those 2^n amplitudes can, in general, be nonzero and physically meaningful at once. There is no representation of a general n-qubit state that uses fewer than roughly 2^n numbers, for the same reason there's no way to list the outcomes of n independent coin flips in fewer than 2^n rows — the state space genuinely has that many dimensions.

## The real quantum computer doesn't pay this cost

This is exactly the resource gap that makes quantum hardware interesting, and it connects directly back to Chapter 1's warning against the "tries all answers at once" myth. A real quantum computer with n physical qubits does not need to *store* 2^n numbers anywhere — it simply *is* in a superposition across that 2^n-dimensional space, as a direct physical fact about n physical objects, with no memory cost that grows with n beyond the n qubits themselves. A classical simulator has to painstakingly track every one of those 2^n amplitudes in RAM; real hardware gets the exponential state space "for free" as a consequence of quantum mechanics. What hardware does *not* get for free is reading that state out usefully — Chapter 1 already established that measurement only yields n classical bits, and amplifying the right answer's probability before you measure still requires a genuinely clever algorithm. The exponential wall explains *why* anyone bothers building quantum hardware at all: past roughly 40–50 qubits, no amount of classical computing — not a bigger budget, not a faster chip — can even represent the state, let alone evolve it.

## Key terms

| Term | Meaning |
|---|---|
| Exponential wall | The point past which a classical state-vector simulator's memory requirement (2^n × 16 bytes) becomes physically infeasible to provide |
| Full-precision amplitude | A complex number stored as two 8-byte doubles (real + imaginary), 16 bytes total, the standard simulator representation |
| State space dimension | The number of independent amplitudes (2^n) needed to describe a general n-qubit state; a property of quantum mechanics, not of any particular simulator's implementation |
| Resource gap | The contrast between a classical simulator's exponential memory cost and a real quantum computer's fixed, linear (n-qubit) physical cost for representing the same state |

## Check yourself

Using the same 2^n × 16-byte formula, compute (by extending the pattern in the table, doubling twice from the n=50 row) roughly how many bytes a 52-qubit state vector would require, and name which storage unit (GB/TB/PB/EB) that number lands in.
