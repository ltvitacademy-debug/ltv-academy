# Script — Probability Basics

## Segment 1 (title)

Chapter 1 described data we already have. Chapter 2 flips the direction. Probability describes what data we should expect from a process governed by chance, and it's the language behind sampling, hypothesis tests, and much of machine learning.

## Segment 2 (steps: vocabulary)

Four words to know. An experiment is a process with an uncertain result, like rolling two dice. The sample space is every possible outcome: thirty-six for two dice. An event is a set of outcomes we care about, like a sum of seven. And probability is a number from zero to one. With equally likely outcomes, it's favorable divided by total.

## Segment 3 (code: counting)

Python can count for us. We list every ordered pair of two dice with itertools, thirty-six of them, then keep the ones that sum to seven. Six match, so the probability is six thirty-sixths, about point one six seven.

## Segment 4 (code: complement)

The complement rule says the probability of not A is one minus the probability of A. It's a shortcut for at-least-one questions. The chance of at least one six in two rolls is eleven of thirty-six, point three oh five six, or one minus five-sixths squared. For or questions, add the probabilities and subtract the overlap.

## Segment 5 (code: simulation)

What does point one six seven actually mean? The law of large numbers says the fraction of times an event occurs settles near its probability as you repeat the experiment. Ten rolls gave point two. A hundred gave point one seven. Ten thousand gave point one six five one, and a million gave point one six six five.

## Segment 6 (steps: rules)

Four rules to keep. Probabilities live between zero and one. The complement is one minus P of A. For or, add and subtract the overlap. And all outcomes total exactly one. One caution: the law of large numbers is about long-run fractions, not a promise that a short streak must balance out.

## Segment 7 (outro)

In lesson 8, we ask how probabilities change once we know something has already happened: conditional probability and independence.
