# Script — Bias & Fairness, Basics

## Segment 1 (title)

It's tempting to think of bias as something a model has, like a bug. In practice it enters at several different points — training data, labeling, deployment context — and fixing one doesn't fix the others.

## Segment 2 (steps: where bias enters)

Training data bias: the data over- or under-represents certain groups. Labeling bias: human labelers' own assumptions shape what counts as a good example. Deployment context bias: a model that tests evenly can still produce unequal outcomes in a narrower real context.

## Segment 3 (code: paired-prompt test)

Before reaching for a formal fairness metric, the simplest useful test is a direct comparison: hold a prompt's substance constant, vary only a demographic signal, and compare the outputs side by side — tone, word choice, any assumption added that wasn't in the original.

## Segment 4 (steps: model behavior vs outcome)

Two different questions get conflated. Does the model treat similar inputs similarly? And does the outcome of using it land evenly across groups? A model can pass the first and still fail the second.

## Segment 5 (outro)

Even traditional ML fairness splits into competing technical definitions that can't all be satisfied at once. The point isn't finding "the" metric — it's being explicit about which one a system is held to. Next up: privacy — what happens when a prompt itself carries someone's personal data.
