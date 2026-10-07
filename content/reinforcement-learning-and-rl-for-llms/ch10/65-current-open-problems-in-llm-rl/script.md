# Script — Current Open Problems in LLM RL

## Segment 1 (title)

Lesson 65, closing Chapter 10 and this course's technical content. You've gone from the Bellman equation all the way to RLVR-trained reasoning and multi-turn tool-using agents. This lesson doesn't teach a new technique — it steps back and surveys the problems that showed up in nearly every chapter, in different clothes, and are still genuinely unsolved.

## Segment 2 (steps)

Reward hacking at scale is the single thread running through nearly everything. Toy environment exploits in Chapter 5, reward model overoptimization in Chapter 6, RLHF-specific failure modes in Chapter 7, verifier loopholes and unfaithful reasoning in Chapter 9, shaping and subgoal exploitation in agent tasks. Every mitigation this course covered narrows the gap between what a signal measures and what you actually wanted — none of them closes it.

## Segment 3 (steps)

Scalable oversight is a sharper version of the same problem. As models get better at tasks a human can't easily check — a long patch, a long agent trajectory — the human feedback that RLHF and RLAIF rest on gets harder to trust as ground truth. A preference label on work nobody actually verified is noise dressed up as signal. Debate between models, decomposing hard questions into checkable pieces, weaker models helping supervise stronger ones — all active directions, none a settled answer yet.

## Segment 4 (steps)

Sample efficiency and generalization round it out. Every algorithm in this course, from REINFORCE through PPO to GRPO, needs a large number of rollouts, and at LLM scale each rollout is a full forward pass through a billion-plus-parameter model. Skills learned under RL on one task distribution also transfer only partially to adjacent ones, the way lesson 56 found for math and code.

## Segment 5 (outro)

None of these three has a tidy fix, and a course that claimed otherwise would be teaching something false. What you have now is the full vocabulary to recognize each one and apply the mitigations that genuinely help. That closes Chapter 10. The capstone is next: applying this toolkit end-to-end on a project of your own.
