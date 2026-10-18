# Measurement & the Born Rule

You can't read amplitudes out of a quantum computer directly — you only ever get classical bits back, one probabilistic sample at a time. The rule that connects the two is called the Born rule, and it is the single most computationally consequential equation in this entire course.

## What you'll learn

- The exact statement of the Born rule: P(0) = |a|², P(1) = |b|² for |ψ⟩ = a|0⟩ + b|1⟩
- How to apply it to a worked numeric example: 0.6|0⟩ + 0.8|1⟩
- How to apply it to |+⟩ = (|0⟩+|1⟩)/√2, and why it gives an even 50/50 split
- Why squaring the amplitude (not using it directly) is what makes probabilities work out
- Why "reading out" a quantum computer only ever gives one sampled bitstring, never the full amplitude vector

## Stating the Born rule precisely

For a single qubit in state |ψ⟩ = a|0⟩ + b|1⟩, the **Born rule** says: the probability of measuring outcome 0 is P(0) = |a|², and the probability of measuring outcome 1 is P(1) = |b|². Notice what's being squared — it's the *amplitude*, not the raw coefficient's sign or phase, which is why amplitudes are allowed to be negative or complex while probabilities always come out non-negative and real. This is the bridge between the quantum description of a qubit (its amplitudes) and the classical description you actually get to see (a single bit, 0 or 1).

Normalization — the rule from chapter 2 that |a|² + |b|² = 1 — is exactly what guarantees P(0) + P(1) = 1, i.e., that the measurement produces *some* valid outcome with total probability 1. The Born rule and normalization are two sides of the same coin: normalization makes sure the probabilities are legitimate, and the Born rule is the specific formula for computing them from the state.

## Worked example 1: 0.6|0⟩ + 0.8|1⟩

Take the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩. Apply the Born rule directly: P(0) = |0.6|² = 0.36, and P(1) = |0.8|² = 0.64. Check normalization first, as a sanity check you should always run: 0.36 + 0.64 = 1.00 — it checks out, so this is a legitimately normalized state and these are legitimate probabilities. Measuring this qubit will give you 0 about 36% of the time and 1 about 64% of the time, over many repeated identical preparations — not because the qubit was "secretly" leaning toward 1, but because that's exactly what squaring its amplitudes produces.

## Worked example 2: |+⟩ and the even split

Now take |+⟩ = (|0⟩+|1⟩)/√2, which you've seen since chapter 2's normalization work and again in the previous lesson's interference discussion. Both amplitudes are 1/√2. Apply the Born rule: P(0) = |1/√2|² = 1/2 = 0.5, and P(1) = |1/√2|² = 1/2 = 0.5. The two outcomes are exactly equally likely. This is worth sitting with: |+⟩ and |−⟩ = (|0⟩−|1⟩)/√2 give the *identical* 50/50 computational-basis measurement statistics, even though they are clearly different quantum states (you saw in the last lesson that H treats them completely differently — H|+⟩=|0⟩ but H|−⟩=|1⟩). Measurement statistics alone, taken in one basis, do not always tell you the full story of a state; the amplitudes carry more information than any single measurement can extract.

## Reading out a quantum computer: one sample, not the full vector

This is where the Born rule becomes an engineering fact, not just a physics fact. A real quantum circuit evolves a register of qubits through a sequence of gates, building up a rich vector of amplitudes across all the possible bitstrings. But when the circuit ends and you measure, hardware does not hand you that amplitude vector — it hands you exactly one classical bitstring, sampled according to the Born rule's probabilities. Want to know the amplitude of some particular outcome? You can't just ask; you have to run the entire circuit many times and build up a probability histogram from repeated samples, and even then you only recover probabilities (magnitudes squared), not the original phases.

## Why this shapes how quantum algorithms are designed

Because you only get probabilistic, one-shot classical samples out, every quantum algorithm has to be designed around one central goal: make the probability of measuring the *correct* answer as close to 1 (and everything else as close to 0) as the circuit allows. That's precisely the job interference does, as you saw in the previous lesson — gates are chosen specifically so that wrong-answer amplitudes cancel and the right-answer amplitude grows, so that when the Born rule finally converts amplitudes to probabilities at measurement time, the answer you want is overwhelmingly the one you're likely to sample. Get the circuit design wrong, and you'll sample the right answer only rarely, no matter how elegant the intermediate math was.

## Key terms

| Term | Meaning |
|---|---|
| Born rule | For |ψ⟩=a\|0⟩+b\|1⟩: P(0)=\|a\|², P(1)=\|b\|² — the formula converting amplitudes into measurement probabilities |
| Amplitude | The complex coefficient (a or b) in front of a basis state; squared magnitude gives a probability |
| Normalization | The requirement \|a\|²+\|b\|²=1, which guarantees the Born-rule probabilities sum to exactly 1 |
| Readout / measurement sampling | Running a quantum circuit and getting back one classical bitstring, probabilistically sampled via the Born rule — never the full amplitude vector |
| Measurement statistics | The probability distribution over outcomes produced by repeated measurement; can be identical for genuinely different states (e.g., |+⟩ and |−⟩ in the computational basis) |

## Check yourself

A qubit is prepared in the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩ and run through a quantum circuit 1,000 times, each time freshly re-prepared identically before measurement. Roughly how many of those 1,000 runs would you expect to come back reading 1, and why can't you shortcut this by just measuring the qubit once and trusting that single result to tell you the full state?
