# Script — Capstone: Running & Monitoring PPO Training

## Segment 1 (title)

Lesson 68, continuing the Capstone. The reward function is ready; this lesson wires it into TRL's PPOTrainer and runs the actual training loop. The mechanics are the same PPO from Chapter 4 — what's new is doing it for real, against a verifiable reward, and knowing what to watch while it runs.

## Segment 2 (code)

PPOTrainer needs the model you're training, a frozen reference copy of the same starting checkpoint, and your dataset. That reference model is what the KL penalty measures distance from — the same role it plays in Chapter 7's full RLHF pipeline, just with a verifiable reward standing in for a reward model's score.

## Segment 3 (code)

Every batch runs the same three steps: generate responses, score each one with last lesson's verifier, then call step. That single call computes the advantages, applies the clipped objective, and folds in the KL penalty against the reference model — all the PPO mechanics from Chapter 4, running for real.

## Segment 4 (steps)

Watch four signals together while it trains. Mean reward should trend up, not just spike once. KL from the reference policy should rise gradually — a sudden jump is the same approx_kl warning sign lesson 27 taught you to catch. And response length drifting sharply is a classic reward-hacking symptom showing up live, not just in theory.

## Segment 5 (outro)

PPOTrainer wraps the model, the frozen reference, and the verifier into one loop — reward, KL, and length together tell you if it's healthy. Next lesson, you'll find out whether this run actually improved the model, against the held-out set from lesson 66.
