# Script — AI-Assisted Human Oversight

## Segment 1 (title)

Debate, recursive reward modeling, and weak-to-strong generalization aren't three competing answers to the scalable oversight problem — they're three instances of a broader strategy. This closing lesson names that strategy directly and takes stock of where the chapter leaves things.

## Segment 2 (steps)

AI-assisted human oversight is the general strategy of using AI systems as tools that extend what a human evaluator can reliably judge, rather than replacing the human or leaving them unaided. Debate extends judgment by having two systems expose each other's flaws. Recursive reward modeling extends it by handing the human assistants for specific sub-tasks. Weak-to-strong generalization studies how much a strong system's own knowledge can substitute for supervision quality the human can't fully provide. All three answer the same question: how do you keep a human meaningfully in the loop on a task that's outgrown what they can check alone?

## Segment 3 (steps)

A critique model makes this literal: a separate model trained to point out flaws or questionable claims in another model's output, shown to a human alongside the original answer. OpenAI's work on self-critiquing models found this measurably helped human evaluators catch more flaws than reading the answer alone. And the sandwiching method tests whether this kind of assistance is real: give non-expert humans AI assistance on a task where genuine experts exist, and see whether the non-experts' judgments actually close a meaningful fraction of the gap to those experts.

## Segment 4 (steps)

None of this means scalable oversight is solved. Debate still has an unresolved obfuscated-argument concern. Recursive reward modeling depends on assistant reliability that itself needs checking. Weak-to-strong generalization shows partial recovery in an admittedly imperfect analogy. What this chapter does establish is real movement — from naming the scalability ceiling to actively building and testing techniques meant to extend past it.

## Segment 5 (outro)

Everything so far has judged models by watching their outputs from the outside. The next chapter changes the vantage point entirely, opening up the mechanism that produces those outputs in the first place.
