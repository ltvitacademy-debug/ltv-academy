# Entanglement vs. Classical Correlation

The most common objection to everything in lessons 16 and 17 is a reasonable one: "Isn't this just like two coins that were secretly prepared to match? That's not spooky, that's just correlation." This lesson takes that objection seriously, shows exactly where it works, and shows exactly where it stops working.

## What you'll learn

- What "shared classical randomness" (a local hidden variable) actually means as a model
- Why a hidden-variable model can perfectly explain correlation measured in one fixed basis
- Why this is the honest, hardest version of the skeptical question — not a strawman
- Why measuring in multiple different bases is where the classical explanation breaks down
- Why this distinction matters for computing and cryptography, not just physics philosophy

## The classical explanation, taken seriously

Here's the skeptic's model, stated precisely: imagine two coins prepared in advance by some process that writes the same hidden instruction onto both of them — a "secret script" each coin carries with it wherever it goes. Whenever you flip either coin and check it against that fixed script, you'll find the two coins agree (or disagree, depending on the script) in a correlated way, even though the coins are now far apart and never communicate at the moment you check them. This is called a **local hidden variable** model: "local" because nothing needs to travel between the two coins at measurement time, and "hidden variable" because the correlation is explained by information that was fixed in advance and simply carried along with each particle.

This is not a silly idea — it's exactly the kind of model Einstein, Podolsky, and Rosen proposed in 1935 (you'll meet their argument by name in lesson 19), and it's a completely legitimate classical mechanism. If all you ever do is check both coins against the *same* fixed question — "heads or tails?" — a hidden-variable script reproduces the correlation perfectly. There is nothing in a single, fixed-basis measurement of a Bell pair that forces you to invoke anything beyond ordinary shared classical randomness.

## Where the single-basis version of the Bell-pair experiment sits

Recall from lesson 17 that measuring |Φ+⟩ in the computational basis gives P(00)=P(11)=0.5 and P(01)=P(10)=0 — qubit 1 is a fair coin, qubit 2 is a fair coin, and they always agree. On its own, that specific pattern is exactly what a local hidden-variable script would produce too: write "0" on both coins' scripts half the time, "1" on both scripts the other half of the time, and checking either coin against the computational-basis question gives you precisely this statistic. If the computational basis were the *only* way anyone ever measured a Bell pair, there would be no way to distinguish "genuinely entangled quantum state" from "two coins carrying a shared secret script" — both models predict identical numbers.

## Where the classical story runs out of road

The reason entanglement is not reducible to a shared script is that quantum mechanics lets you measure qubits in *different* bases — not just the computational basis, but rotated measurement angles (the kind of basis choice you studied in chapter 3). A local hidden-variable script has to commit, in advance, to an answer for *every* basis someone might later choose to measure in, because the whole point of the model is that the script is fixed before the coins separate and nothing is computed on the fly. It turns out that no fixed script — no matter how cleverly designed — can reproduce the correlations quantum mechanics actually predicts once you compare measurements taken at multiple different angles on an entangled pair. The quantum correlations are measurably *stronger* than any classical shared-randomness scheme can produce, once more than one measurement setting is in play.

This is the precise sense in which entanglement is "more than correlation": not that the single-basis numbers look spookier (they don't — a classical script matches them exactly), but that the *pattern across multiple bases* is a signature no local hidden-variable model can replicate, however it's constructed. Lesson 19 gives you the exact numeric inequality — the CHSH inequality — that quantifies this gap and the real experiment that confirmed quantum mechanics wins it.

## Why this matters beyond philosophy

If entanglement were just shared classical randomness, it would be computationally uninteresting — anything you could do with it, you could do just as well with two pre-agreed random scripts, no quantum hardware required. The fact that multi-basis measurement correlations provably exceed what any classical scheme can produce is what makes entanglement a genuine *new* resource rather than a repackaged old one. This is also, concretely, the foundation of device-independent quantum key distribution (previewed again in lesson 19): a cryptographic protocol can use the *violation* of the classical bound itself as proof that an eavesdropper hasn't substituted a classical fake for a real entangled pair.

## Key terms

| Term | Meaning |
|---|---|
| Local hidden variable | A classical model where correlation is explained by shared information fixed in advance and carried by each particle, with no communication needed at measurement time |
| Shared classical randomness | The mechanism (a "secret script") by which a local hidden-variable model produces correlated outcomes |
| Single-basis measurement | Measuring both members of a pair using the same, fixed measurement setting every time |
| Multi-basis measurement | Measuring using more than one distinct angle or setting, across repeated trials |
| Classical bound | The strongest correlation any local hidden-variable model can produce once multiple measurement settings are compared (quantified precisely in lesson 19) |

## Check yourself

A colleague says, "You showed me the single-basis numbers for |Φ+⟩ match what a classical shared-randomness script would predict, so there's no real evidence entanglement is anything special." Explain precisely what additional experiment they would need to run, and what pattern of results would prove them wrong.
