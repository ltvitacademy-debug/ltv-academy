# Script — Where This Research Could Go Next

## Segment 1 (title)

This is the final lesson of the LTV AI Research Lab. You've scoped three research questions, run three projects, written up an interpretability finding, assembled a portfolio, and practiced presenting it. None of that is finished the way a course assignment is finished — a real result is a starting point for the next question, not a closed door.

## Segment 2 (steps)

SQL Pete was deliberately built small: a 1.5 billion parameter base model, two schemas, and a programmatic execution-correctness reward standing in for a human rater. Each of those is a real next step. A larger base model would likely close some of the remaining accuracy gap, at a real compute cost. More schemas would test whether the recipe generalizes past Northwind and AdventureWorks2012. And real human preference data would close the gap between this lab's simplification and actual RLHF.

## Segment 3 (steps)

Chapter 5 found one circuit candidate: a mid-to-late-layer attention head that appears to move a country name into the SQL string literal. One finding on one entity type is a data point, not a theory. The obvious next steps: test whether the same circuit handles other entity types, like product names or dates; check whether it holds up at larger scale; and look for a similar circuit behind the model's refusal to generate anything beyond a SELECT statement.

## Segment 4 (steps)

This lab's RLHF pipeline is a real, working, deliberately simplified preview of the same ideas in the AI Safety and Alignment course. A programmatic reward can be gamed or wrong in ways a human rater might catch, and the interpretability tools from Chapter 5 are the same category of tool researchers use to check whether a much larger model's reasoning matches what it's actually doing internally.

## Segment 5 (steps)

Across three projects, you built a custom RL environment from scratch, trained a reward model on real pairwise preferences, ran an RLHF pipeline on a real open-weight language model, and produced an interpretability finding written up in a falsifiable claim, evidence, confidence format. That combination, not any single project, is the transferable skill this lab was built to teach.

## Segment 6 (outro)

Every result in this lab is a starting point: SQL Pete can scale up, the interpretability finding can be tested further, and the whole pipeline previews the harder version of the same problem waiting in AI Safety and Alignment. You scoped a question, built the system, and reported the result honestly, three times over. That's the whole lab. Good work.
