# Script — Capstone Kickoff & Model Selection

## Segment 1 (title)

This is the start of the capstone: one project running across the rest of this chapter, pulling together nearly everything the course has covered. You'll pick a real open-weight model, build a real dataset, run a real fine-tune, and evaluate it against a baseline. This lesson is just the first step — choosing the model and task — but it shapes everything downstream.

## Segment 2 (steps)

Pick the task before the model. Define something narrow enough to describe in one sentence and judge with a concrete metric — a style, a structured-output format, a domain-specific behavior. A narrow task is also what makes the Chapter 7 evaluation lessons usable here, because you can't build a good eval set for a vague goal.

## Segment 3 (steps)

Choosing the base model comes down to a few real factors: size versus available compute, since this capstone is meant to run on realistic single-GPU hardware with LoRA or QLoRA; license terms, since open-weight doesn't always mean unrestricted; whether to start from a raw base model or an already instruction-tuned checkpoint; and whether the tooling you already know — transformers, trl, peft — actually supports that architecture.

## Segment 4 (code)

Before writing any dataset code, sanity-check the candidate: load the model and tokenizer, confirm the parameter count matches what you expect, and print what the chat template actually produces for a simple message. Five minutes here avoids a confusing debugging session three lessons from now, when a formatting mismatch would otherwise look like a training bug.

## Segment 5 (outro)

That's the task and model locked in — a choice worth making deliberately, since it shapes every lesson that follows. Next up: building the SFT dataset, applying Chapter 4's methods directly to the task you just defined.
