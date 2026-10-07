# Script — Combining Human & AI Feedback

## Segment 1 (title)

Lesson 52, closing Chapter 8. Last lesson treated RLHF and RLAIF as a choice. In practice, most production pipelines combine both. This lesson covers the concrete ways teams do that.

## Segment 2 (code)

The simplest approach trains one reward model on a single dataset blending human-labeled and AI-labeled comparisons. Nothing about reward model training changes — it doesn't know or care which source a given chosen-and-rejected pair came from, as long as both are formatted the same way. This gets the AI judge's scale without depending on it exclusively.

## Segment 3 (code)

A second, more targeted use of human labels: keep a held-out set specifically to check the AI judge's agreement rate with humans on the same comparisons. That's the same independent-correlation check from Chapter 6's reward model evaluation, just applied to the judge itself before trusting its labels at scale.

## Segment 4 (steps)

A third pattern routes by difficulty — routine, high-volume comparisons go to the AI judge, while cases where the judge reports low confidence, or where two judges disagree, get routed to human annotators instead. That spends the scarce resource, human attention, exactly where it has the most value.

## Segment 5 (outro)

Mixed datasets, judge validation, and difficulty-based routing all use one feedback source to catch the other's blind spots. That closes Chapter 8. Chapter 9 begins next lesson with RL for Reasoning, where the reward signal shifts again — to verifiable correctness on math and code, not learned preference at all.
