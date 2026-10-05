# Lesson 3 — AI Risks: Bias, Privacy, Security and Hallucination

**Chapter 1 · AI Governance Foundations · Lesson 3 of 30**

## What you'll learn

- Four risk categories that recur across nearly every AI governance program
- How each risk shows up differently depending on the type of model involved
- Why these four categories, specifically, drive most of the controls covered later in this course
- How to describe each risk in plain language, without needing a named incident to make the point

## Bias

Bias is a model's outputs systematically favoring or disfavoring some group of people, in a way that doesn't track the thing the model is actually supposed to be measuring. It isn't always intentional, and it rarely comes from one bad decision — it usually comes from the data the model learned from reflecting some real-world imbalance, and the model faithfully reproducing that imbalance at scale. A model can be statistically accurate overall and still be biased against a specific subgroup. Lesson 9 goes deeper into where bias actually enters through the data itself.

## Privacy

Privacy risk is the chance that an AI system exposes personal information it shouldn't. This can happen in more than one way: training data itself might contain personal information that was never meant to end up in a model, a model can sometimes be prompted into reproducing specific pieces of training data it "memorized," and outputs can combine seemingly harmless pieces of information in a way that re-identifies a specific person. Privacy risk doesn't require a data breach in the traditional sense — the model itself can become the exposure.

## Security

Security risk covers ways an AI system can be attacked or manipulated, distinct from traditional IT security. This includes adversarial inputs designed to fool a model into a wrong classification, prompt injection that tricks a generative system into ignoring its instructions, data poisoning that corrupts a model during training, and straightforward theft of a valuable trained model or the data behind it. Because models behave probabilistically rather than by fixed rule, some of these attacks are hard to fully rule out in advance — which is exactly why ongoing monitoring (Chapter 4) matters, not just a one-time security review.

## Hallucination

Hallucination is specific to generative AI: a model producing output that sounds fluent, confident, and plausible, but is factually wrong — a citation that doesn't exist, a policy that was never written, a fact invented to fill a gap. It happens because generative models are built to produce the most statistically likely next output, not to verify truth, and they have no built-in mechanism to say "I don't actually know this." The danger isn't the error itself — people are wrong sometimes too — it's that the output's confident tone gives no signal to the reader that it should be double-checked.

## Why these four, together

These categories aren't independent of each other. A biased training set can also be a privacy problem if it overrepresents a vulnerable group. A security attack can be designed specifically to trigger a hallucination. Most of the specific controls in the rest of this course — documentation, access controls, monitoring, incident response — exist because at least one of these four risks is what they're defending against.

## Key terms

| Term | Meaning |
|---|---|
| Bias | A model's outputs systematically favoring or disfavoring a group, independent of the thing actually being measured |
| Privacy risk | The chance an AI system exposes personal information through its training data or its outputs |
| Hallucination | A generative model producing fluent, confident, but factually wrong output |

## Lab

Pick any one of the four risk categories in this lesson. Write one paragraph describing, in your own words, a plausible (not necessarily real) scenario where that risk could show up in a system your organization might plausibly use — a hiring tool, a chatbot, a fraud filter, anything. Don't look up a real incident; reason through it yourself.

## Check yourself

Can you name all four risk categories from this lesson and give a one-sentence description of each, without looking back at the lesson?
