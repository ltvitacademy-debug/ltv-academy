# Script — Capstone: Write-Up & Next Steps

## Segment 1 (title)

Lesson 70, the final lesson of the course. Last lesson gave you an honest pass-rate comparison and a check for degenerate outputs. This lesson covers writing that result up properly, and then closes out the course by surveying where to go next.

## Segment 2 (steps)

A credible write-up has four parts, in order: methodology, including the exact reward function code so a reviewer could spot a reward-hacking loophole themselves; the pass-rate metrics, reported alongside your held-out set size; two or three real qualitative examples, a win and a miss, not just the aggregate number; and limitations, stated specifically — model size, training budget, how narrow the task was. A write-up that's honest about where it would break is more convincing than one that only reports the win.

## Segment 3 (steps)

This capstone built RLVR with PPO, the most direct verifiable-reward setup. From here: try DPO on the same task to compare against PPO on identical data, layer RLAIF-style self-critique on top of a verifiable reward instead of replacing it, or reframe the task as multi-step and agentic and run straight into the open problems the course closed its last chapter on.

## Segment 4 (outro)

You picked a verifiable-reward task, built and stress-tested a reward function, ran real PPO training while watching the right metrics, evaluated honestly against a baseline, and wrote it up. That's the whole arc of this course, end to end, from the Bellman equation to a working RLVR pipeline. Where you take it next is genuinely up to you now. Well done finishing all seventy lessons.
