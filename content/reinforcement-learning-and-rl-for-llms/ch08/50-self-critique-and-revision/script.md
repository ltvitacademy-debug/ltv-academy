# Script — Self-Critique & Revision

## Segment 1 (title)

Lesson 50. Last lesson named Constitutional AI's phase one as critique and revision without the mechanics. This lesson opens that up.

## Segment 2 (code)

It's a three-step prompt chain, and the same model performs all three steps. First it generates an initial response. Then it's asked to critique that response against one specific constitutional principle. Then it's asked to rewrite the response to address its own critique. Generation, critique, and revision are just different prompts to the same underlying model.

## Segment 3 (steps)

Each critique step checks against one principle at a time, not the whole constitution at once — that keeps it focused and lets different examples exercise different principles across the dataset. The chain can repeat for a few rounds, each one fixing narrower issues than the last, but returns diminish quickly, and later rounds risk producing a revision that's just evasive rather than genuinely better.

## Segment 4 (steps)

What comes out the other end are prompt-and-revised-response pairs, the exact same shape as ordinary SFT data from earlier in the course — except no human wrote any of it. The model produced its own correction, entirely from written principles.

## Segment 5 (outro)

Generate, critique against one principle, revise, repeat a few times — all one model, producing SFT-shaped data without a human writer. Next lesson asks when this approach, or RLAIF more broadly, actually beats human-labeled RLHF.
