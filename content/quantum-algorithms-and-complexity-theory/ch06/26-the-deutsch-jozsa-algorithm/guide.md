# The Deutsch-Jozsa Algorithm

Deutsch-Jozsa was the first algorithm to prove, with a clean circuit you can trace by hand, that a quantum computer can solve a problem using strictly fewer oracle queries than any classical computer possibly could. The problem it solves is deliberately artificial — but the separation it proves is completely real, and it set the template every algorithm in this chapter follows.

## What you'll learn

- The constant-vs-balanced promise problem Deutsch-Jozsa solves, and what "oracle access only" means
- How to trace the exact 1-qubit circuit for all four possible 1-bit functions, using real computed amplitudes
- Why measuring the input qubit as |0⟩ or |1⟩ deterministically reveals constant vs. balanced with a single query
- How the circuit generalizes from 1 input qubit to n input qubits
- Why this result, though historically foundational, is a narrower kind of advantage than Grover's or Shor's

## The problem: constant or balanced, decide with oracle queries

You're given black-box (oracle) access to a function f : {0,1}ⁿ → {0,1}, with a promise attached: f is guaranteed to be either **constant** (f outputs the same value, 0 or 1, on every input) or **balanced** (f outputs 0 on exactly half of all inputs and 1 on the other half). No other possibility exists — the promise rules out every function that's neither. Your job is to decide which case you're in, using as few calls to the oracle as possible. You never get to look inside the oracle's implementation; you can only query it on inputs of your choosing and read the outputs.

## The circuit for n = 1, traced exactly

The smallest version of this problem has one input qubit |x⟩ and one ancilla qubit |y⟩, prepared in the state |0⟩|1⟩. The circuit applies a Hadamard to both qubits, then the oracle U_f : |x,y⟩ → |x, y⊕f(x)⟩, then a Hadamard to the input qubit only, then measures the input qubit. There are exactly four possible 1-bit functions f, and a full statevector simulation of this circuit on each one gives the following final states (written in the |x,y⟩ basis, input qubit first):

- **f = constant-0** (f(0)=0, f(1)=0): final state = 0.7071|00⟩ − 0.7071|01⟩ + 0|10⟩ + 0|11⟩. P(input measures 0) = 1.0000, P(input measures 1) = 0.0000.
- **f = constant-1** (f(0)=1, f(1)=1): final state = −0.7071|00⟩ + 0.7071|01⟩ + 0|10⟩ + 0|11⟩. P(input=0) = 1.0000, P(input=1) = 0.0000.
- **f = balanced-identity** (f(0)=0, f(1)=1): final state = 0|00⟩ + 0|01⟩ + 0.7071|10⟩ − 0.7071|11⟩. P(input=0) = 0.0000, P(input=1) = 1.0000.
- **f = balanced-NOT** (f(0)=1, f(1)=0): final state = 0|00⟩ + 0|01⟩ − 0.7071|10⟩ + 0.7071|11⟩. P(input=0) = 0.0000, P(input=1) = 1.0000.

Notice the pattern directly in the amplitudes: for both constant functions, every term with input bit = 1 (the |10⟩ and |11⟩ terms) has exactly zero amplitude — all the weight sits on input = 0 terms. For both balanced functions, it's the reverse: every term with input bit = 0 has exactly zero amplitude. That's not approximate cancellation, it's exact destructive interference built from the ±0.7071 (±1/√2) amplitudes the Hadamards produce.

## Reading the result: one query, a deterministic answer

Because the input qubit's two outcomes have probability exactly 1.0 and exactly 0.0 in every case above, a single measurement settles the question with certainty, not just high likelihood: measuring the input qubit as |0⟩ means f is constant; measuring it as |1⟩ means f is balanced. Either way, this required exactly one call to the oracle U_f — the Hadamards before and after don't touch the oracle, so the query count is one, full stop.

## Generalizing to n input qubits

The same shape scales up directly. For a general promise function f : {0,1}ⁿ → {0,1}, prepare n input qubits in |0⟩ and one ancilla in |1⟩, apply Hadamards to all n+1 qubits, apply the oracle U_f : |x,y⟩ → |x, y⊕f(x)⟩, apply Hadamards to the n input qubits only, then measure all n input qubits. The n = 1 case above is this circuit with n = 1. The interference argument generalizes exactly: if f is constant, every input qubit measures 0 with certainty (the all-zeros outcome); if f is balanced, the all-zeros outcome has probability exactly zero, so measuring anything other than all-zeros certifies balanced. One oracle call, one measurement, a certain answer — regardless of how large n is.

## The classical vs. quantum query gap

Classically, the worst case is much worse than "query twice." If you've queried f on half the domain and seen all zeros, f could still turn out to be constant-0 or it could turn out to be balanced with every 1-output hiding in the unqueried half — you have no way to rule either out. Only after querying **one more than half** the domain are you guaranteed an answer: either you've already seen both a 0 and a 1 (balanced, confirmed), or you haven't, and the pigeonhole principle then forces constant. That's 2ⁿ⁻¹ + 1 queries in the worst case, for an n-bit input. The quantum algorithm above needs exactly 1 query, for any n. This is a strict, provable separation in **query complexity** — how many oracle calls are needed — not a statement about raw computation time on a Turing machine.

## Why this matters, and why it's limited

Deutsch-Jozsa deserves its place as the historically first clean demonstration that quantum query access beats classical query access, with a gap that gets worse (exponentially, in n) the larger the problem gets. That's genuinely important — it proved the concept of quantum advantage is real before anyone had Grover's or Shor's algorithm to point to. But be honest about the limits: the constant-vs-balanced promise is an artificial setup built specifically to produce this separation, not a function type that shows up in a real computational problem anyone needs solved. Unlike Grover's algorithm (a real quadratic speedup on actual unstructured search) or Shor's algorithm (a real exponential speedup on actual integer factoring, with direct cryptographic consequences), Deutsch-Jozsa's speedup doesn't transfer to a problem you'd otherwise care about solving. Its value is pedagogical and historical, not practical.

## Key terms

| Term | Meaning |
|---|---|
| Promise problem | A problem where the input is guaranteed in advance to satisfy one of a small set of possibilities, ruling out every other case |
| Oracle (black box) | A subroutine you may query on chosen inputs and read outputs from, without seeing its internal implementation |
| Constant function | A function that returns the same output value on every input in its domain |
| Balanced function | A function that returns 0 on exactly half its domain and 1 on the other half |
| Query complexity | A complexity measure counting oracle calls specifically, as distinct from total computation time |

## Check yourself

Suppose you run the n = 1 circuit above and measure the input qubit as |1⟩. Using the four final states listed in this lesson, which specific function(s) could f be, and what exactly have you learned about f after this single query?
