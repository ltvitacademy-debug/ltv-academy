# Instruction Tuning: Why It Works

Chapter 3 ended with a pretrained base model: something that's very good at predicting the next token given everything it's seen, but not naturally good at the specific thing people actually want — being asked a question and getting a direct, helpful answer back. This chapter is about closing that gap through supervised fine-tuning, and this first lesson explains why a comparatively small amount of extra training can transform a base model's behavior so dramatically.

## What you'll learn

- What a base (pretrained) model actually does, and why that's different from being "helpful"
- What instruction tuning is, concretely, as a supervised learning problem
- Why relatively little instruction data produces such a large behavioral shift
- The the key paper that demonstrated this (FLAN / InstructGPT-era work) and what it showed
- How instruction tuning relates to, and differs from, the RLHF/preference-tuning stage that typically follows it

## What a base model actually does

A pretrained base model's entire training objective is next-token prediction over internet-scale text: given a sequence, predict the most likely next token. This makes it extremely good at *completing* text in whatever style it's given, but it has no built-in notion of "this piece of text is an instruction, now respond to it helpfully." Ask a base model a direct question and it may continue the text as if it were writing a quiz, a list of related questions, or a Wikipedia-style continuation — all "valid" completions by the training objective, none of them necessarily what the user wanted.

## Instruction tuning as a supervised learning problem

Instruction tuning (also called supervised fine-tuning, or SFT, the subject of the rest of this chapter) is additional training on a dataset of (instruction, response) pairs — human-written or carefully curated examples that look like "here's an instruction; here's the ideal response to it." The training objective itself doesn't change: it's still next-token prediction, typically with cross-entropy loss computed only over the response tokens (the instruction/prompt tokens are present as context but usually masked out of the loss, a detail covered in depth in Lesson 23). What changes is the *distribution* the model is being trained to match — conversational, instruction-following text instead of raw internet text.

```python
# Conceptual shape of one training example
example = {
    "prompt": "Explain what a compiler does, in two sentences.",
    "response": (
        "A compiler translates source code written in a "
        "programming language into a lower-level form -- "
        "often machine code -- that a computer can execute "
        "directly. It does this once, ahead of time, rather "
        "than interpreting the code line by line at runtime."
    ),
}
# Loss is computed over `response` tokens only (see Lesson 23).
```

## Why so little data produces such a large shift

This is the part that surprised early researchers: instruction tuning typically uses a dataset many orders of magnitude smaller than the pretraining corpus — tens of thousands to a few million examples, compared to trillions of pretraining tokens — yet produces a dramatic change in how the model behaves. The widely accepted explanation is that pretraining has already built essentially all of the underlying knowledge and capability the model needs; instruction tuning isn't teaching new facts or skills so much as it's teaching the model *which* of the many things it already knows how to do it should actually do, by demonstration. This framing — instruction tuning as eliciting and reweighting existing capability rather than injecting new capability — is why it's comparatively cheap and fast relative to pretraining, and why Lesson 24 can meaningfully compare it against far cheaper parameter-efficient alternatives.

## The research that established this

Google's FLAN work (Wei et al., 2021, "Finetuned Language Models Are Zero-Shot Learners") showed that fine-tuning on a large collection of NLP tasks phrased as instructions dramatically improved zero-shot performance on held-out tasks the model had never been instruction-tuned on. OpenAI's InstructGPT work (Ouyang et al., 2022) pushed this further for open-ended instruction following and showed that a comparatively small, well-curated set of human-written demonstrations, used for supervised fine-tuning, measurably improved helpfulness before any reinforcement learning was applied at all.

## Instruction tuning vs. what comes after

Instruction tuning (SFT) teaches the model to produce *a* good response in the demonstrated style. It does not, by itself, teach the model to choose between several plausible responses and prefer the better one — that comparative judgment is what preference-tuning methods (RLHF, DPO, and related techniques) add afterward, and is covered in a later chapter. SFT is the foundation those methods build on: a model has to already produce reasonable, on-distribution responses before preference optimization has anything useful to compare and improve.

## Key terms

- **Base (pretrained) model** — a model trained only on next-token prediction over raw text, with no instruction-following behavior
- **Instruction tuning / supervised fine-tuning (SFT)** — additional training on (instruction, response) pairs to teach instruction-following behavior
- **Eliciting vs. injecting capability** — the view that SFT mostly surfaces behavior already latent from pretraining, rather than teaching new facts
- **FLAN (Wei et al., 2021)** — the paper demonstrating instruction tuning's zero-shot generalization benefits
- **InstructGPT (Ouyang et al., 2022)** — OpenAI's work establishing SFT-then-RLHF as a practical alignment pipeline
