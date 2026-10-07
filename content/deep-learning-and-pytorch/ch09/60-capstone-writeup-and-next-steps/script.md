# Script — Capstone: Write-Up & Next Steps

## Segment 1 (title)

You've built, trained, and evaluated a transformer from scratch. The last step is the one most self-taught projects skip: writing it up — the difference between "I trained a thing once" and a project you can actually point to later, in an interview or your own notes six months from now.

## Segment 2 (steps)

The industry convention is a model card, in four short sections. What this is: architecture, parameter count, dataset. How it was trained: optimizer, schedule, steps, hardware. Results: your real validation loss, perplexity, and what the samples actually look like. And limitations — what it plainly cannot do. None of these sections need to be long.

## Segment 3 (code)

Here's the whole thing on one page: what the model is, how it was trained, the real numbers from evaluation, and an honest limitations section. Keep each part to a few lines. The goal isn't length, it's that someone who never watched you train it could read this and know exactly what they're looking at, and trust the numbers because the limitations are stated right alongside them.

## Segment 4 (steps)

State your results plainly, without overselling or underselling them. Then look forward. From here, the natural directions are fine-tuning a pretrained model instead of training from scratch, alignment techniques that shape a model's behavior beyond next-token prediction, and understanding how this architecture changes at a much larger scale.

## Segment 5 (outro)

You took this course from tensors and autograd to a trained, evaluated, documented transformer language model, built entirely from first principles, with every chapter along the way earning its place in this final project. That foundation is what makes everything beyond it learnable instead of mysterious. Congratulations — the course is complete.
