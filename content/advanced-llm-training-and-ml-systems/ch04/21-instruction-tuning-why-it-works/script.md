# Script — Instruction Tuning: Why It Works

## Segment 1 (title)

Chapter 3 ended with a pretrained base model: very good at predicting the next token, not naturally good at being asked a question and giving a direct, helpful answer. This chapter closes that gap through supervised fine-tuning, and this lesson explains why so little extra training produces such a dramatic shift.

## Segment 2 (steps)

A base model's entire objective is completing text in whatever style it's given. Ask it a direct question and it might continue like it's writing a quiz or a Wikipedia article — a technically valid completion, just not what the user wanted. It has no built-in notion of "this is an instruction, now respond helpfully."

## Segment 3 (code)

Instruction tuning fixes that with additional training on instruction-response pairs. The objective doesn't change — it's still next-token prediction — but now loss is computed only over the response tokens, and the model is being trained to match a conversational, instruction-following distribution instead of raw internet text.

## Segment 4 (steps)

Here's the surprising part: this dataset is tens of thousands to a few million examples, compared to trillions of pretraining tokens, yet the behavioral shift is huge. The accepted explanation is that pretraining already built essentially all the knowledge and capability the model needs — instruction tuning isn't teaching new facts, it's teaching the model which of the things it already knows how to do it should actually do, by demonstration.

## Segment 5 (outro)

Google's FLAN work and OpenAI's InstructGPT work both demonstrated this empirically, and InstructGPT specifically showed supervised fine-tuning alone measurably improved helpfulness before any reinforcement learning was added. Up next: exactly how those instruction-response pairs get structured as text in the first place — chat templates.
