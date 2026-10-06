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
      L(1, "what-reinforcement-learning-is", "What Reinforcement Learning Is"),
      L(2, "markov-decision-processes", "Markov Decision Processes"),
      L(3, "reward-policy-and-value-functions", "Reward, Policy & Value Functions"),
      L(4, "the-bellman-equation", "The Bellman Equation"),
      L(5, "exploration-vs-exploitation", "Exploration vs. Exploitation"),
      L(6, "episodic-vs-continuing-tasks", "Episodic vs. Continuing Tasks"),
      L(7, "on-policy-vs-off-policy-learning", "On-Policy vs. Off-Policy Learning"),
    ],
  },
  {
    n: 2,
    title: "Classic RL Algorithms",
    lessons: [
      L(8, "dynamic-programming-for-rl", "Dynamic Programming for RL"),
      L(9, "monte-carlo-methods", "Monte Carlo Methods"),
      L(10, "temporal-difference-learning", "Temporal-Difference Learning"),
      L(11, "q-learning", "Q-Learning"),
      L(12, "sarsa", "SARSA"),
      L(13, "tabular-rl-limitations", "Tabular RL, Limitations"),
      L(14, "function-approximation-for-rl", "Function Approximation for RL"),
    ],
  },
  {
    n: 3,
    title: "Deep RL",
    lessons: [
      L(15, "deep-q-networks-dqn", "Deep Q-Networks (DQN)"),
      L(16, "experience-replay-and-target-networks", "Experience Replay & Target Networks"),
      L(17, "double-dqn-and-dueling-dqn", "Double DQN & Dueling DQN"),
      L(18, "policy-gradient-methods", "Policy Gradient Methods"),
      L(19, "the-reinforce-algorithm", "The REINFORCE Algorithm"),
      L(20, "actor-critic-methods", "Actor-Critic Methods"),
      L(21, "variance-reduction-with-baselines", "Variance Reduction With Baselines"),
    ],
  },
  {
    n: 4,
    title: "Policy Optimization Methods",
    lessons: [
      L(22, "trust-region-methods-conceptually", "Trust Region Methods, Conceptually"),
      L(23, "proximal-policy-optimization-ppo", "Proximal Policy Optimization (PPO)"),
      L(24, "ppo-clipping-and-the-objective-function", "PPO Clipping & the Objective Function"),
      L(25, "generalized-advantage-estimation-gae", "Generalized Advantage Estimation (GAE)"),
      L(26, "implementing-ppo-from-scratch", "Implementing PPO From Scratch"),
      L(27, "debugging-a-ppo-training-run", "Debugging a PPO Training Run"),
      L(28, "ppo-hyperparameters-that-matter", "PPO Hyperparameters That Matter"),
    ],
  },
  {
    n: 5,
    title: "RL Environments & Infrastructure",
    lessons: [
      L(29, "the-gymnasium-api", "The Gymnasium API"),
      L(30, "building-a-custom-environment", "Building a Custom Environment"),
      L(31, "vectorized-environments", "Vectorized Environments"),
      L(32, "reward-shaping", "Reward Shaping"),
      L(33, "reward-hacking-in-toy-environments", "Reward Hacking in Toy Environments"),
      L(34, "environment-design-pitfalls", "Environment Design Pitfalls"),
    ],
  },
  {
    n: 6,
    title: "Reward Modeling",
    lessons: [
      L(35, "why-llms-need-a-learned-reward-model", "Why LLMs Need a Learned Reward Model"),
      L(36, "collecting-human-preference-data", "Collecting Human Preference Data"),
      L(37, "the-bradley-terry-model", "The Bradley-Terry Model"),
      L(38, "training-a-reward-model", "Training a Reward Model"),
      L(39, "reward-model-overoptimization", "Reward Model Overoptimization"),
      L(40, "evaluating-a-reward-model", "Evaluating a Reward Model"),
    ],
  },
  {
    n: 7,
    title: "RLHF",
    lessons: [
      L(41, "the-full-rlhf-pipeline", "The Full RLHF Pipeline"),
      L(42, "sft-then-reward-model-then-ppo", "SFT, Then Reward Model, Then PPO"),
      L(43, "the-kl-penalty-and-why-it-exists", "The KL Penalty & Why It Exists"),
      L(44, "rlhf-failure-modes", "RLHF Failure Modes"),
      L(45, "direct-preference-optimization-dpo", "Direct Preference Optimization (DPO)"),
      L(46, "dpo-vs-ppo-based-rlhf", "DPO vs. PPO-Based RLHF"),
      L(47, "running-a-small-rlhf-pipeline", "Running a Small RLHF Pipeline"),
    ],
  },
  {
    n: 8,
    title: "RLAIF & Constitutional AI",
    lessons: [
      L(48, "reinforcement-learning-from-ai-feedback", "Reinforcement Learning From AI Feedback"),
      L(49, "constitutional-ai-the-approach", "Constitutional AI: the Approach"),
      L(50, "self-critique-and-revision", "Self-Critique & Revision"),
      L(51, "when-rlaif-beats-rlhf", "When RLAIF Beats RLHF"),
      L(52, "combining-human-and-ai-feedback", "Combining Human & AI Feedback"),
    ],
  },
  {
    n: 9,
    title: "RL for Reasoning",
    lessons: [
      L(53, "reward-signals-for-chain-of-thought", "Reward Signals for Chain-of-Thought"),
      L(54, "outcome-reward-vs-process-reward", "Outcome Reward vs. Process Reward"),
      L(55, "verifiable-rewards-rlvr", "Verifiable Rewards (RLVR)"),
      L(56, "rl-for-math-and-code-reasoning", "RL for Math & Code Reasoning"),
      L(57, "reward-hacking-in-reasoning-models", "Reward Hacking in Reasoning Models"),
      L(58, "test-time-compute-and-search", "Test-Time Compute & Search"),
      L(59, "evaluating-reasoning-improvements", "Evaluating Reasoning Improvements"),
    ],
  },
  {
    n: 10,
    title: "Agents & Multi-Step RL",
    lessons: [
      L(60, "rl-for-tool-use", "RL for Tool Use"),
      L(61, "multi-turn-credit-assignment", "Multi-Turn Credit Assignment"),
      L(62, "agentic-rl-environments", "Agentic RL Environments"),
      L(63, "sparse-rewards-in-long-horizon-tasks", "Sparse Rewards in Long-Horizon Tasks"),
      L(64, "simulation-vs-real-environments-for-agent-training", "Simulation vs. Real Environments for Agent Training"),
      L(65, "current-open-problems-in-llm-rl", "Current Open Problems in LLM RL"),
    ],
  },
  {
    n: 11,
    title: "Capstone: Train a Model With PPO on a Verifiable-Reward Task",
    lessons: [
      L(66, "capstone-kickoff-and-task-selection", "Capstone Kickoff & Task Selection"),
      L(67, "capstone-building-the-reward-function", "Capstone: Building the Reward Function"),
      L(68, "capstone-running-and-monitoring-ppo-training", "Capstone: Running & Monitoring PPO Training"),
      L(69, "capstone-evaluation-against-baseline", "Capstone: Evaluation Against Baseline"),
      L(70, "capstone-writeup-and-next-steps", "Capstone: Write-Up & Next Steps"),
    ],
  },
];
