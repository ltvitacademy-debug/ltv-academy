# Script — A/B Testing Prompts

## Segment 1 (title)

Two prompts both seem reasonable. A/B testing is how you find out which one actually performs better, with a number, instead of a guess.

## Segment 2 (code: one variable changed)

Here's a real comparison. Prompt A, the control: "answer customer questions about their order." Prompt B, the challenger: "confirm the order ID first, escalate refunds to a human." B changes exactly one thing A didn't have — a verification step and an escalation rule. Nothing else moved between the two.

## Segment 3 (steps: a real checklist)

A real A/B test follows a checklist. Change one variable at a time — several changes at once and a result tells you nothing about which one actually mattered. Run both versions against the same eval set, or a fair traffic split, so neither one gets an easier set of cases. Pick the metric you're comparing on before you look at results — pass rate, cost, latency — not after, when it's tempting to pick whichever metric makes your favorite version win. And only ship the winner once the sample is big enough that the gap isn't just noise.

## Segment 4 (code: the result)

Run against the same 42 eval cases, prompt A passed seventy-four percent, prompt B ninety-three percent. B wins, and the recorded reason is specific: fewer policy violations, not a vague sense that B "reads better."

## Segment 5 (outro)

A/B testing only works if the comparison is fair. Change two things between A and B, test them on different case sets, or pick your metric after seeing the numbers, and the result stops meaning anything. Next: regression testing — making sure B's win doesn't quietly break a case A used to pass.
