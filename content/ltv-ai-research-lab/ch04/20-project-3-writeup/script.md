# Script — Project 3 Write-Up

## Segment 1 (title)

Five lessons of work — a base model choice, an SFT run, a reward signal, an RLHF run, and an evaluation — need to become something a stranger can read in five minutes and trust. This lesson is about writing that up: claim, method, result, limitation.

## Segment 2 (steps)

Every project in this lab gets written up the same four-part way. Claim is the one sentence someone skims to decide if this is interesting. Method is how you'd actually reproduce it: model, data, reward, training. Result is the actual numbers, not vibes. And limitation is what the result doesn't prove, and what could break it.

## Segment 3 (code)

The method section should let a reader reconstruct the exact call chain: an SFT run producing a LoRA-adapted checkpoint from roughly 2,000 question and SQL pairs, an execution-correctness reward function with its safety filter, and an RLHF run that initializes its policy from that checkpoint and refines it against that reward.

## Segment 4 (steps)

The limitation section matters most and is the one people skip. The reward is a proxy — RLAIF, not literal human feedback, so a human might judge some outputs differently than the execution check does. The safety rule is a hard constraint, not something the model learned, since destructive statements were filtered out before the reward function ever saw them. And the hallucination finding from Lesson 19 gets reported plainly, whether or not it actually showed up.

## Segment 5 (outro)

This write-up is exactly the unit Chapter 6's portfolio assembly will slot in next to Projects 1 and 2. Keep the claim honest and the limitation section real, not a formality. That closes Project 3 — Chapter 5 picks SQL Pete back up for an interpretability case study, since it's the one project model with a full residual stream to inspect.
