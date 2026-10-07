# Script — The Full RLHF Pipeline

## Segment 1 (title)

Lesson 41, opening Chapter 7. Chapter 6 built a reward model from human preferences. Chapter 4 built PPO. This lesson assembles both into the pipeline that actually produced models like InstructGPT.

## Segment 2 (steps)

RLHF names a three-stage pipeline, not one algorithm. First, supervised fine-tuning on human demonstrations gives you a policy that already follows instructions. Second, that policy's outputs get compared by human annotators, and those comparisons train a reward model, exactly as in Chapter 6. Third, PPO fine-tunes that same SFT policy against the reward model's scores.

## Segment 3 (code)

Nothing about PPO or the reward model changes inside this pipeline — they work exactly as in earlier chapters. What's new is that PPO's reward function is now a call to the trained reward model on generated text, and the policy starts from the SFT checkpoint, not the raw pretrained model, with a frozen copy of that same checkpoint kept around as a reference.

## Segment 4 (steps)

The order is fixed because each stage needs the previous stage's exact output. The reward model is trained on comparisons between responses sampled from the SFT model, so its judgments are calibrated to that distribution — swap in a weaker policy and the reward model learns the wrong thing. And starting PPO from the SFT checkpoint means it isn't wasting RL steps relearning basic instruction-following on a noisy reward signal.

## Segment 5 (outro)

Three fixed stages, each one's output feeding the next. Next lesson goes deeper into exactly how the checkpoints and datasets wire together in practice.
