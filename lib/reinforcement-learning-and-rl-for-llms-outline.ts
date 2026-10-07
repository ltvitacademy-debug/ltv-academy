// The Reinforcement Learning & RL for LLMs course outline — FRAMEWORK ONLY (chapter
// and lesson titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Third course of the AI/ML Research Engineer & Alignment Engineer
// destination. Assumes Deep Learning & PyTorch. Goes from classic RL foundations
// through to RLHF, RLAIF and RL for reasoning — the algorithms behind how modern LLMs
// are aligned and taught to reason.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/reinforcement-learning-and-rl-for-llms/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const REINFORCEMENT_LEARNING_AND_RL_FOR_LLMS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "RL Foundations",
    lessons: [
      L(1, "what-reinforcement-learning-is", "What Reinforcement Learning Is", { contentDir: "ch01/01-what-reinforcement-learning-is" }),
      L(2, "markov-decision-processes", "Markov Decision Processes", { contentDir: "ch01/02-markov-decision-processes" }),
      L(3, "reward-policy-and-value-functions", "Reward, Policy & Value Functions", { contentDir: "ch01/03-reward-policy-and-value-functions" }),
      L(4, "the-bellman-equation", "The Bellman Equation", { contentDir: "ch01/04-the-bellman-equation" }),
      L(5, "exploration-vs-exploitation", "Exploration vs. Exploitation", { contentDir: "ch01/05-exploration-vs-exploitation" }),
      L(6, "episodic-vs-continuing-tasks", "Episodic vs. Continuing Tasks", { contentDir: "ch01/06-episodic-vs-continuing-tasks" }),
      L(7, "on-policy-vs-off-policy-learning", "On-Policy vs. Off-Policy Learning", { contentDir: "ch01/07-on-policy-vs-off-policy-learning" }),
    ],
  },
  {
    n: 2,
    title: "Classic RL Algorithms",
    lessons: [
      L(8, "dynamic-programming-for-rl", "Dynamic Programming for RL", { contentDir: "ch02/08-dynamic-programming-for-rl" }),
      L(9, "monte-carlo-methods", "Monte Carlo Methods", { contentDir: "ch02/09-monte-carlo-methods" }),
      L(10, "temporal-difference-learning", "Temporal-Difference Learning", { contentDir: "ch02/10-temporal-difference-learning" }),
      L(11, "q-learning", "Q-Learning", { contentDir: "ch02/11-q-learning" }),
      L(12, "sarsa", "SARSA", { contentDir: "ch02/12-sarsa" }),
      L(13, "tabular-rl-limitations", "Tabular RL, Limitations", { contentDir: "ch02/13-tabular-rl-limitations" }),
      L(14, "function-approximation-for-rl", "Function Approximation for RL", { contentDir: "ch02/14-function-approximation-for-rl" }),
    ],
  },
  {
    n: 3,
    title: "Deep RL",
    lessons: [
      L(15, "deep-q-networks-dqn", "Deep Q-Networks (DQN)", { contentDir: "ch03/15-deep-q-networks-dqn" }),
      L(16, "experience-replay-and-target-networks", "Experience Replay & Target Networks", { contentDir: "ch03/16-experience-replay-and-target-networks" }),
      L(17, "double-dqn-and-dueling-dqn", "Double DQN & Dueling DQN", { contentDir: "ch03/17-double-dqn-and-dueling-dqn" }),
      L(18, "policy-gradient-methods", "Policy Gradient Methods", { contentDir: "ch03/18-policy-gradient-methods" }),
      L(19, "the-reinforce-algorithm", "The REINFORCE Algorithm", { contentDir: "ch03/19-the-reinforce-algorithm" }),
      L(20, "actor-critic-methods", "Actor-Critic Methods", { contentDir: "ch03/20-actor-critic-methods" }),
      L(21, "variance-reduction-with-baselines", "Variance Reduction With Baselines", { contentDir: "ch03/21-variance-reduction-with-baselines" }),
    ],
  },
  {
    n: 4,
    title: "Policy Optimization Methods",
    lessons: [
      L(22, "trust-region-methods-conceptually", "Trust Region Methods, Conceptually", { contentDir: "ch04/22-trust-region-methods-conceptually" }),
      L(23, "proximal-policy-optimization-ppo", "Proximal Policy Optimization (PPO)", { contentDir: "ch04/23-proximal-policy-optimization-ppo" }),
      L(24, "ppo-clipping-and-the-objective-function", "PPO Clipping & the Objective Function", { contentDir: "ch04/24-ppo-clipping-and-the-objective-function" }),
      L(25, "generalized-advantage-estimation-gae", "Generalized Advantage Estimation (GAE)", { contentDir: "ch04/25-generalized-advantage-estimation-gae" }),
      L(26, "implementing-ppo-from-scratch", "Implementing PPO From Scratch", { contentDir: "ch04/26-implementing-ppo-from-scratch" }),
      L(27, "debugging-a-ppo-training-run", "Debugging a PPO Training Run", { contentDir: "ch04/27-debugging-a-ppo-training-run" }),
      L(28, "ppo-hyperparameters-that-matter", "PPO Hyperparameters That Matter", { contentDir: "ch04/28-ppo-hyperparameters-that-matter" }),
    ],
  },
  {
    n: 5,
    title: "RL Environments & Infrastructure",
    lessons: [
      L(29, "the-gymnasium-api", "The Gymnasium API", { contentDir: "ch05/29-the-gymnasium-api" }),
      L(30, "building-a-custom-environment", "Building a Custom Environment", { contentDir: "ch05/30-building-a-custom-environment" }),
      L(31, "vectorized-environments", "Vectorized Environments", { contentDir: "ch05/31-vectorized-environments" }),
      L(32, "reward-shaping", "Reward Shaping", { contentDir: "ch05/32-reward-shaping" }),
      L(33, "reward-hacking-in-toy-environments", "Reward Hacking in Toy Environments", { contentDir: "ch05/33-reward-hacking-in-toy-environments" }),
      L(34, "environment-design-pitfalls", "Environment Design Pitfalls", { contentDir: "ch05/34-environment-design-pitfalls" }),
    ],
  },
  {
    n: 6,
    title: "Reward Modeling",
    lessons: [
      L(35, "why-llms-need-a-learned-reward-model", "Why LLMs Need a Learned Reward Model", { contentDir: "ch06/35-why-llms-need-a-learned-reward-model" }),
      L(36, "collecting-human-preference-data", "Collecting Human Preference Data", { contentDir: "ch06/36-collecting-human-preference-data" }),
      L(37, "the-bradley-terry-model", "The Bradley-Terry Model", { contentDir: "ch06/37-the-bradley-terry-model" }),
      L(38, "training-a-reward-model", "Training a Reward Model", { contentDir: "ch06/38-training-a-reward-model" }),
      L(39, "reward-model-overoptimization", "Reward Model Overoptimization", { contentDir: "ch06/39-reward-model-overoptimization" }),
      L(40, "evaluating-a-reward-model", "Evaluating a Reward Model", { contentDir: "ch06/40-evaluating-a-reward-model" }),
    ],
  },
  {
    n: 7,
    title: "RLHF",
    lessons: [
      L(41, "the-full-rlhf-pipeline", "The Full RLHF Pipeline", { contentDir: "ch07/41-the-full-rlhf-pipeline" }),
      L(42, "sft-then-reward-model-then-ppo", "SFT, Then Reward Model, Then PPO", { contentDir: "ch07/42-sft-then-reward-model-then-ppo" }),
      L(43, "the-kl-penalty-and-why-it-exists", "The KL Penalty & Why It Exists", { contentDir: "ch07/43-the-kl-penalty-and-why-it-exists" }),
      L(44, "rlhf-failure-modes", "RLHF Failure Modes", { contentDir: "ch07/44-rlhf-failure-modes" }),
      L(45, "direct-preference-optimization-dpo", "Direct Preference Optimization (DPO)", { contentDir: "ch07/45-direct-preference-optimization-dpo" }),
      L(46, "dpo-vs-ppo-based-rlhf", "DPO vs. PPO-Based RLHF", { contentDir: "ch07/46-dpo-vs-ppo-based-rlhf" }),
      L(47, "running-a-small-rlhf-pipeline", "Running a Small RLHF Pipeline", { contentDir: "ch07/47-running-a-small-rlhf-pipeline" }),
    ],
  },
  {
    n: 8,
    title: "RLAIF & Constitutional AI",
    lessons: [
      L(48, "reinforcement-learning-from-ai-feedback", "Reinforcement Learning From AI Feedback", { contentDir: "ch08/48-reinforcement-learning-from-ai-feedback" }),
      L(49, "constitutional-ai-the-approach", "Constitutional AI: the Approach", { contentDir: "ch08/49-constitutional-ai-the-approach" }),
      L(50, "self-critique-and-revision", "Self-Critique & Revision", { contentDir: "ch08/50-self-critique-and-revision" }),
      L(51, "when-rlaif-beats-rlhf", "When RLAIF Beats RLHF", { contentDir: "ch08/51-when-rlaif-beats-rlhf" }),
      L(52, "combining-human-and-ai-feedback", "Combining Human & AI Feedback", { contentDir: "ch08/52-combining-human-and-ai-feedback" }),
    ],
  },
  {
    n: 9,
    title: "RL for Reasoning",
    lessons: [
      L(53, "reward-signals-for-chain-of-thought", "Reward Signals for Chain-of-Thought", { contentDir: "ch09/53-reward-signals-for-chain-of-thought" }),
      L(54, "outcome-reward-vs-process-reward", "Outcome Reward vs. Process Reward", { contentDir: "ch09/54-outcome-reward-vs-process-reward" }),
      L(55, "verifiable-rewards-rlvr", "Verifiable Rewards (RLVR)", { contentDir: "ch09/55-verifiable-rewards-rlvr" }),
      L(56, "rl-for-math-and-code-reasoning", "RL for Math & Code Reasoning", { contentDir: "ch09/56-rl-for-math-and-code-reasoning" }),
      L(57, "reward-hacking-in-reasoning-models", "Reward Hacking in Reasoning Models", { contentDir: "ch09/57-reward-hacking-in-reasoning-models" }),
      L(58, "test-time-compute-and-search", "Test-Time Compute & Search", { contentDir: "ch09/58-test-time-compute-and-search" }),
      L(59, "evaluating-reasoning-improvements", "Evaluating Reasoning Improvements", { contentDir: "ch09/59-evaluating-reasoning-improvements" }),
    ],
  },
  {
    n: 10,
    title: "Agents & Multi-Step RL",
    lessons: [
      L(60, "rl-for-tool-use", "RL for Tool Use", { contentDir: "ch10/60-rl-for-tool-use" }),
      L(61, "multi-turn-credit-assignment", "Multi-Turn Credit Assignment", { contentDir: "ch10/61-multi-turn-credit-assignment" }),
      L(62, "agentic-rl-environments", "Agentic RL Environments", { contentDir: "ch10/62-agentic-rl-environments" }),
      L(63, "sparse-rewards-in-long-horizon-tasks", "Sparse Rewards in Long-Horizon Tasks", { contentDir: "ch10/63-sparse-rewards-in-long-horizon-tasks" }),
      L(64, "simulation-vs-real-environments-for-agent-training", "Simulation vs. Real Environments for Agent Training", { contentDir: "ch10/64-simulation-vs-real-environments-for-agent-training" }),
      L(65, "current-open-problems-in-llm-rl", "Current Open Problems in LLM RL", { contentDir: "ch10/65-current-open-problems-in-llm-rl" }),
    ],
  },
  {
    n: 11,
    title: "Capstone: Train a Model With PPO on a Verifiable-Reward Task",
    lessons: [
      L(66, "capstone-kickoff-and-task-selection", "Capstone Kickoff & Task Selection", { contentDir: "ch11/66-capstone-kickoff-and-task-selection" }),
      L(67, "capstone-building-the-reward-function", "Capstone: Building the Reward Function", { contentDir: "ch11/67-capstone-building-the-reward-function" }),
      L(68, "capstone-running-and-monitoring-ppo-training", "Capstone: Running & Monitoring PPO Training", { contentDir: "ch11/68-capstone-running-and-monitoring-ppo-training" }),
      L(69, "capstone-evaluation-against-baseline", "Capstone: Evaluation Against Baseline", { contentDir: "ch11/69-capstone-evaluation-against-baseline" }),
      L(70, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps", { contentDir: "ch11/70-capstone-writeup-and-next-steps" }),
    ],
  },
];
