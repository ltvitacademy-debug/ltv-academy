# What Reinforcement Learning Is

Welcome to Reinforcement Learning & RL for LLMs. This is lesson 1 of Chapter 1, RL Foundations — the chapter that builds the vocabulary and math every later lesson, including the RLHF and RLVR techniques used to train large language models, depends on. Before any of that, you need a clear answer to a simple question: what problem is reinforcement learning actually solving?

## What you'll learn

- How reinforcement learning differs from supervised and unsupervised learning
- The agent-environment loop: the one diagram that describes every RL problem
- What "reward" means, and why it's the only signal the agent gets
- Where reinforcement learning shows up today, including in LLM training

## Three ways a machine can learn

Machine learning problems generally fall into three families:

- **Supervised learning** — you have labeled examples (input, correct output) and the model learns to map one to the other. Think: predicting house prices from labeled sales data.
- **Unsupervised learning** — you have unlabeled data and the model finds structure in it, like clusters or compressed representations.
- **Reinforcement learning (RL)** — there is no labeled "correct answer" at all. Instead, an **agent** takes **actions** inside an **environment**, and the environment responds with a **reward** (a number saying how good or bad that action was) and a new **state**. The agent's only goal is to choose actions that maximize the total reward it collects over time.

RL is the right framework whenever the problem is really about a sequence of decisions, and the consequences of an early decision aren't known until much later — a game of chess, a robot learning to walk, or a chatbot learning which responses humans prefer.

## The agent-environment loop

Every RL problem, no matter how complex, reduces to the same loop repeating at each time step *t*:

1. The agent observes the current **state** S_t of the environment.
2. The agent selects an **action** A_t.
3. The environment transitions to a new state S_{t+1} and emits a **reward** R_{t+1}.
4. The agent uses R_{t+1} and S_{t+1} to improve its decision-making, and the loop repeats.

The agent never sees "correct answers" — it only sees a reward number after the fact, often delayed. A chess-playing agent might not get any meaningful reward until the game ends dozens of moves later. Figuring out which of those earlier moves actually deserved credit for the win is the **credit assignment problem**, and most of the algorithms in this course exist to solve some version of it.

## Why reward is the only teacher

In supervised learning, a human (or a labeled dataset) tells the model the exact right answer for every example. In RL, nobody tells the agent the right action — the agent has to discover it by trying actions and observing which ones lead to higher reward over time. This is what makes RL both powerful and hard: the agent must balance trying new things (**exploration**) against doing what already seems to work (**exploitation**), a tension covered fully in Lesson 5.

## RL is not just for games

Reinforcement learning trained the game-playing systems that beat human champions at Go and Atari, but the same loop now sits underneath a very different application: training large language models. In **RLHF** (Reinforcement Learning from Human Feedback) and **RLVR** (RL from Verifiable Rewards), the "agent" is the language model, an "action" is generating a response (or a token), and the "reward" comes from a human preference judgment or an automatically checkable answer (like a unit test passing). The rest of this course builds toward exactly that connection.

## Key terms

| Term | Meaning |
|---|---|
| Agent | The decision-maker; the thing being trained |
| Environment | Everything the agent interacts with and that responds to its actions |
| State (S_t) | A snapshot of the environment at time t |
| Action (A_t) | A choice the agent makes at time t |
| Reward (R_t) | A scalar feedback signal; what the agent is trying to maximize over time |
| Credit assignment problem | Figuring out which past actions deserve credit for a later reward |

## Recap

Reinforcement learning is the study of an agent that learns to act by trial and error, guided only by a reward signal, inside an environment it interacts with through the agent-environment loop. Next up, Lesson 2: Markov Decision Processes, the formal mathematical model that makes this loop precise.
