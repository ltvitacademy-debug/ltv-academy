# Recursive Reward Modeling

Instead of betting on adversarial structure the way debate does, recursive reward modeling bets on bootstrapping: use the AI capability you already have to help a human evaluate harder tasks, train a stronger system against that improved evaluation, then repeat. Each round is supposed to push both model capability and the ability to oversee that capability forward together, rather than letting oversight fall behind.

## What you'll learn

- The core idea behind recursive reward modeling, as proposed by Leike and colleagues
- How AI assistants are used to help a human evaluate a task they couldn't fully judge alone
- Why the process is described as recursive, and what that buys you
- The main assumption this approach depends on, and where it could fail

## The core idea: assisted evaluation

Recursive reward modeling, proposed in DeepMind's "Scalable agent alignment via reward modeling," starts from ordinary reward modeling — train a reward model from human feedback, then train an agent against that reward model. The recursive step is in how the human gives that feedback on hard tasks. Instead of asking a human to evaluate an entire complex output unassisted, the human is given AI assistants that handle specific sub-components of the evaluation: summarizing a long document, checking a specific factual claim, flagging a suspicious section of code. The human's judgment, now extended by these tools, produces the comparison data the reward model is trained on.

## Why "recursive"

The method is called recursive because the process is meant to repeat across generations of increasing capability. Round one trains a reward model and an agent on tasks within reach of human-plus-assistant evaluation. That first agent, or other systems like it, can then become the assistant used in round two, helping evaluate an even harder task that round one's setup couldn't have handled unassisted. Each round's output becomes an input to the next round's evaluation process, so oversight capability is meant to climb the same capability ladder the models themselves are climbing, rather than getting left behind at some fixed human-only level.

## What this buys you, in principle

If it works as intended, recursive reward modeling means a lab never has to find a single human evaluator capable of judging a superhuman task outright. Instead, the task gets broken into assisted sub-judgments that stay within reach at each step, and the ladder of successive rounds is what actually reaches the harder task — no single step requires a bigger leap in human capability than the assistants at that step can cover.

## The assumption this depends on, and where it could fail

The whole scheme depends on each round's assistants being trustworthy enough that the human's extended judgment is actually more accurate, not just more confident. If an assistant used in evaluation has its own blind spots, biases, or outright errors, those get baked into the reward model the next agent is trained against — and because the process is recursive, an error introduced early can propagate and compound across rounds rather than staying contained to one step. This is the same scalability-ceiling concern from earlier in the course, relocated rather than eliminated: now it's a question of whether the assistants' judgment is reliable, not whether the unassisted human's judgment is reliable, and verifying that reliability at each step is itself a nontrivial oversight problem.

## Key terms

- **Reward modeling** — training a model to predict human preference judgments, then training an agent against that learned reward model rather than against raw human feedback directly
- **AI-assisted evaluation** — using AI systems to handle specific sub-components of a judgment task, extending what a human evaluator can reliably assess
- **Recursive reward modeling** — repeating the assisted-evaluation-then-train cycle across generations, so each round's trained system can become part of the assistant toolkit for evaluating the next, harder round
- **Error propagation** — the risk that a mistake or blind spot introduced by an assistant in an early round gets baked into the reward model and compounds across later rounds
- **Capability ladder** — the idea that both model capability and oversight capability are meant to climb together, round by round, rather than oversight getting left behind at a fixed level
