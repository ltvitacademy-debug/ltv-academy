# Capstone: Write-Up & Next Steps

This is lesson 70, the final lesson of Reinforcement Learning & RL for LLMs. Lesson 69 gave you an honest pass-rate comparison and a check for degenerate outputs. This lesson covers how to write that result up properly, and then closes out the course by surveying where to go next — because finishing this capstone doesn't mean there's nothing left to learn, it means you're ready to go learn it on your own.

## What you'll learn

- The four sections a credible capstone write-up needs, and what belongs in each
- Why reporting limitations honestly is a strength, not a weakness, in a write-up
- Research directions worth exploring next, building directly on this course's final chapters
- How the whole arc of this course — foundations through RLHF, RLAIF, reasoning, and agents — fits together in hindsight

## Writing it up

A credible write-up has four sections, in this order. **Methodology**: the task, the base model, the exact reward function (include the code — a reviewer should be able to spot a reward-hacking loophole from reading it, the same way you were asked to in lesson 67), and the PPO hyperparameters used. **Metrics**: the pass-rate comparison from lesson 69, reported with the held-out set size (a 15-point improvement on 20 examples means something very different from the same gap on 1,000). **Qualitative examples**: two or three actual before/after generations, including at least one the policy got right and one it still gets wrong — this is what lets a reader judge whether the improvement is real reasoning or a shortcut. **Limitations**: be specific — model size, training budget, how narrow the task distribution was, anything that would change if you scaled up. A write-up that only reports the win number is far less convincing than one that's honest about where it would break.

## Where to go next

This capstone used RLVR with PPO — the most direct verifiable-reward setup. From here, worth exploring: **DPO on the same task** (Chapter 7) to compare against PPO on identical data; **RLAIF-style self-critique** (Chapter 8) layered on top of a verifiable reward instead of replacing it; **multi-step/agentic RL** (Chapter 10) if your task can be reframed as a multi-turn tool-use problem instead of single-shot generation; and the open problems Chapter 10 closed on — credit assignment over long horizons, sim-to-real gaps — which remain genuinely unsolved and worth reading current papers on.

## How the course fits together

Chapters 1–3 gave you the RL vocabulary — MDPs, value functions, Q-learning, policy gradients — that every later chapter assumed. Chapter 4's PPO became the workhorse algorithm for everything after it. Chapter 5's environment design and Chapter 6's reward modeling fed directly into Chapter 7's RLHF pipeline. Chapter 8 showed feedback doesn't have to come from humans. Chapter 9 showed it doesn't always need a learned model at all — which is exactly what this capstone built. Chapter 10 pushed the whole picture into multi-step, agentic territory. None of that was separable; this capstone only worked because every earlier chapter was load-bearing.

## Key terms

- **Capstone write-up** — methodology, metrics, qualitative examples, and limitations, in that order
- **Qualitative examples** — actual generations included alongside aggregate metrics, for honest judgment
- **RLVR** — the verifiable-reward approach this capstone implemented end to end
- **Open problems** — credit assignment and sim-to-real gaps in agentic RL, still unresolved as of this course

## Recap

You picked a verifiable-reward task, built and stress-tested a reward function, ran real PPO training with TRL while watching the right metrics, evaluated honestly against a baseline, and now know how to write that up credibly. That's the whole arc of this course, applied end to end: from the Bellman equation to a working RLVR pipeline. Where you take it next — DPO comparisons, RLAIF layering, agentic reframing, or straight into the research literature on open problems — is genuinely up to you now. Well done finishing all 70 lessons.
