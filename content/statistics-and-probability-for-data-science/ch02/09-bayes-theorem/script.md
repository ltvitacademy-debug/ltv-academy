# Script — Bayes' Theorem

## Segment 1 (title)

A fraud detector flags a transaction. It catches ninety-five percent of real fraud and falsely flags only two percent of legitimate transactions. So a flag must mean about ninety-five percent fraud, right? The real answer, with these numbers, is about nineteen percent. Bayes' theorem explains why.

## Segment 2 (steps: parts)

Bayes' theorem turns "how likely is this evidence if the hypothesis is true" into "how likely is the hypothesis, given the evidence." The prior is your belief before the evidence, here the base rate of fraud: half a percent. The likelihood is the chance of a flag if it's fraud: ninety-five percent. The evidence is the overall chance of a flag. And the posterior is the updated answer we want.

## Segment 3 (code: formula)

Overall flag probability is sensitivity times the base rate, plus false-positive rate times the legitimate share. That's two point four six five percent of all transactions. The posterior is the fraud-and-flagged part divided by that total: point one nine two seven.

## Segment 4 (code: natural frequencies)

Counts are easier. Take a hundred thousand transactions. Five hundred are fraud, and the detector flags four hundred seventy-five. Ninety-nine thousand five hundred are legitimate, and it wrongly flags one thousand nine hundred ninety. So of twenty-four hundred sixty-five flags, only four seventy-five are real. Ignoring the base rate is the base rate fallacy.

## Segment 5 (code: simulation)

We can also simulate the world and count. Among two million simulated transactions, the fraction of flagged ones that were truly fraud came out at point one nine two one, close to the exact answer. The gap is just simulation noise.

## Segment 6 (steps: lessons)

Three lessons. Rare events produce mostly false alarms, even from a good detector. The prior changes everything: at a five percent base rate, the same detector is right about seventy-one percent of the time. And updating chains: yesterday's posterior becomes today's prior, assuming the evidence is independent.

## Segment 7 (outro)

In lesson 10, we move from events to numbers: random variables and expected value.
