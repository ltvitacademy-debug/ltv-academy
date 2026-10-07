# RLHF & RLAIF, an Alignment Lens

Your reinforcement learning course already covered how RLHF and RLAIF work mechanically — preference comparisons, reward model training, policy optimization with PPO or a similar algorithm. We're not re-deriving any of that here. This lesson asks a narrower, alignment-specific question: what does RLHF actually buy you as a technique for making a model behave as intended, and where does it structurally fall short? Then we look at RLAIF — reinforcement learning from AI feedback — as a variant that substitutes AI-generated judgments for some or all of the human labels.

## What you'll learn

- Why RLHF aligns a model to human preference labels, not to any independent, ground-truth notion of "good behavior"
- Three structural limits of RLHF as an alignment technique: labeler disagreement and noise, a scalability ceiling on tasks beyond human judgment, and surface-level rather than deep behavior change
- What RLAIF is and how it differs from RLHF mechanically
- Why RLAIF scales the labeling process without eliminating the underlying limits

## RLHF aligns to labels, not to "good"

RLHF trains a reward model to predict which of two candidate outputs a human rater preferred, then optimizes the policy against that learned reward model. There is no independent, objective signal of "good behavior" anywhere in this loop — only the preferences that raters expressed, compressed into a model that approximates them. Whatever those labels capture becomes the alignment target. Whatever they fail to capture — because raters didn't notice it, didn't agree on it, or couldn't evaluate it — never enters the training signal at all. This is worth holding onto precisely because it's easy to describe RLHF loosely as "teaching the model to be good," when what it actually does is narrower and more mechanical: it teaches the model to produce outputs that score well against a proxy for a specific population's preferences.

## Three structural limits

**Labeler disagreement and noise.** Human raters frequently disagree with each other, especially on questions that are genuinely contested, ambiguous, or value-laden rather than simple quality judgments. The reward model ends up learning something like an average over noisy, sometimes contradictory preferences — not a single coherent standard. Different rater pools, different instructions, or different cultural backgrounds can all shift what the "preference" being learned actually is.

**A scalability ceiling.** Human raters can only reliably judge outputs they're capable of evaluating. On a task that exceeds the rater's own expertise — a dense proof, a subtle piece of code, a technical claim outside their training — a confident, fluent, wrong answer can look just as good as a correct one, or better. As models are pushed toward tasks at or beyond the edge of human expertise, the rater's judgment stops being a reliable training signal, which caps how far RLHF alone can scale as an alignment method. This gap is the direct motivation for the "scalable oversight" techniques covered later in this course.

**Surface-level behavior change.** RLHF optimizes observed outputs — what the model says and does in response to the prompts it was trained on. It does not come with a guarantee that the change runs any deeper than that. A model can learn to produce the responses that earn high reward without that reflecting a corresponding shift in whatever process actually generates its outputs. This is a genuinely open question in current research, not a settled fact in either direction — but it's the reason researchers are cautious about equating "behaves well under RLHF" with "is aligned."

## RLAIF: substituting AI feedback

RLAIF keeps the same reinforcement learning mechanics as RLHF — a reward signal, a policy optimized against it — but replaces some or all of the human preference labels with judgments produced by an AI model. Anthropic's Constitutional AI is the best-known implementation of this idea: instead of a human comparing two responses on every single preference judgment, an AI model compares them, grounded in a written set of principles. That one substitution removes the biggest bottleneck in RLHF — the volume of human labeling required — and makes it far cheaper and faster to generate large amounts of preference data.

## What RLAIF changes, and what it doesn't

Scaling the labeling process is not the same as resolving the limits labeling was running into. An AI judge, like a human rater, can still be a noisy and imperfect standard. It can still struggle to evaluate outputs on tasks that exceed what it can reliably judge — the scalability ceiling doesn't disappear just because the judge is now a model instead of a person; it relocates to whatever the judging AI is itself capable of assessing. And RLAIF still optimizes observed behavior against a reward signal, so the surface-versus-depth question carries over unchanged. RLAIF is a real improvement in how cheaply preference data can be produced — it is not, by itself, a fix for what RLHF was structurally unable to guarantee.

## Key terms

- **RLHF (Reinforcement Learning from Human Feedback)** — training a policy against a reward model fit to human preference comparisons
- **RLAIF (Reinforcement Learning from AI Feedback)** — the same RL mechanics as RLHF, with some or all human preference labels replaced by AI-generated judgments
- **Labeler disagreement** — raters giving inconsistent or contradictory preference judgments, especially on ambiguous or value-laden questions
- **Scalability ceiling** — the limit on how well human (or AI) judgment can evaluate outputs on tasks that exceed the judge's own expertise
- **Surface-level behavior change** — a shift in a model's observed outputs that isn't guaranteed to reflect a deeper change in how those outputs are generated
