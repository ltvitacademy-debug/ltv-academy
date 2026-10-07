# Where This Research Could Go Next

This is the final lesson of the LTV AI Research Lab. You've scoped three research questions, run three projects, written up an interpretability finding, assembled a portfolio, and practiced presenting it. None of that work is actually finished in the way a course assignment is finished — a real research result is a starting point for the next question, not a closed door. This lesson looks forward: where each project could go next, and how this lab connects to the bigger picture of AI alignment work.

## What you'll learn

- Concrete next steps for scaling SQL Pete beyond this lab's scope
- Where the interpretability work from Chapter 5 is strongest and weakest, and how to extend it
- How this lab's RLHF pipeline previews real alignment work, including the AI Safety & Alignment course
- How to read your own three-project portfolio as evidence of a transferable skill set, not just three finished notebooks

## Scaling SQL Pete

SQL Pete was deliberately built small: a 1.5-billion-parameter base model, two schemas, and a programmatic execution-correctness reward standing in for a human rater. Each of those is a real next step. A larger base model would likely close some of the remaining execution-accuracy gap, at a real compute cost. More schemas would test whether the SFT-plus-RLHF recipe generalizes past Northwind and AdventureWorks2012. And replacing the programmatic reward with actual human preference data would close the gap between this lab's RLAIF-style simplification and real RLHF, at the cost of needing real raters.

## Extending the interpretability work

Chapter 5 found one circuit candidate: a mid-to-late-layer attention head that appears to move a country name from the question into the SQL string literal. One finding on one entity type is a data point, not a theory. The obvious extensions: test whether the same circuit handles other entity types, like product names or dates, in the same `WHERE` clause position; check whether the circuit holds up if SQL Pete were trained at a larger scale; and look for a similar circuit behind the model's refusal to generate anything beyond a `SELECT` statement, which is a safety-relevant behavior worth understanding on its own.

## Connecting to AI alignment work

This lab's RLHF pipeline is a real, working, deliberately simplified preview of the same ideas covered in the AI Safety & Alignment course: a programmatic reward can be gamed or wrong in ways a human rater might catch, and the interpretability tools from Chapter 5 are the same category of tool researchers use to check whether a much larger model's stated reasoning matches what it's actually doing internally. The gap between "a reward function that's easy to write" and "a reward function that actually reflects what you want" is the same gap this lab's Project 2 reward model and Project 3 execution-correctness reward were both standing in to approximate.

## What you actually built

Across three projects, you built a custom RL environment from scratch, trained a reward model on pairwise human preferences, ran an RLHF pipeline on a real open-weight language model, and produced an interpretability finding written up in a falsifiable claim-evidence-confidence format. That combination — not any single project — is the transferable skill this lab was built to teach.

## Key terms

- **RLAIF** — reinforcement learning from AI feedback; a programmatic or model-generated reward standing in for a human rater, as Project 3 used
- **Circuit** — a small, identifiable piece of a model's computation responsible for a specific behavior
- **Reward gaming** — when a policy finds a way to score well on a reward signal without actually doing what the reward was meant to measure

## Recap

Every result in this lab is a starting point, not a finished answer: SQL Pete can scale up, the interpretability finding can be tested on new entity types and new scales, and the whole RLHF pipeline previews the harder version of the same problem the AI Safety & Alignment course covers next. The three projects, taken together, are the proof that you can scope a question, build the system, and report the result honestly — in SQL, in reward modeling, and in RLHF alike. That's the whole lab. Good work.
