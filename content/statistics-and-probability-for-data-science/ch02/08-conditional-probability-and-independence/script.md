# Script — Conditional Probability & Independence

## Segment 1 (title)

Probabilities depend on what you already know. The chance a random customer churns is one number. The chance a free-plan customer churns may be very different. Conditional probability is the tool for updating a probability given information, and every classifier you'll meet later is estimating one.

## Segment 2 (steps: concepts)

The conditional probability of A given B is the probability of A and B together, divided by the probability of B. In words: restrict attention to the cases where B happened, then ask what fraction also had A. Rearranged, that gives the multiplication rule. And two events are independent when knowing one tells you nothing about the other.

## Segment 3 (code: table)

Here's an illustrative table of a thousand customers, half free and half paid. Two hundred churned overall, so the churn probability is point two. But look inside each plan.

## Segment 4 (code: conditional)

Among free customers, one hundred fifty of five hundred churned, so churn given free is point three. Among paid customers it's point one. Knowing the plan changed the probability. In pandas, conditioning is just filtering and taking a mean, the same groupby you already use.

## Segment 5 (code: independence)

Now independence. Two dice should be independent. We simulate a million rolls and check: the first die is six with probability about point one six six five, the second die is four or more about half the time, and both happen at point zero eight three one. Multiply the two, and you get point zero eight three three. A match, the signature of independence.

## Segment 6 (steps: traps)

Watch out for three traps. Reversing the condition: churn given free is point three, but free given churn is point seven five. Confusing independent with mutually exclusive: events that can't both happen are dependent. And assuming independence just because it's convenient. Without replacement, two aces from a deck is four fifty-seconds times three fifty-firsts, about point zero zero four five.

## Segment 7 (outro)

In lesson 9, Bayes' theorem shows how to flip a conditional probability around.
