# Lesson 9 — Open-Source vs. Closed Models · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson's five families were all closed, API-only models. But there's a whole second
category: models whose actual trained weights you can download. That split matters more than it
might sound like.

## S2 · STEPS CARD (closed vs open-weight, the real distinction)

"Open-source" is the common term, but it's a bit loose — you get the trained weights and a
license, not the training data or training code, which is what open-source traditionally means in
software. Open-weight is the more accurate term. Closed means API-only, no weights distributed.
Open-weight means you can download and self-host it yourself.

## S3 · CODE CARD (real open-weight families, with real licenses)

Here's the current field, checked directly. Llama 4 from Meta — Scout and Maverick variants,
under Meta's own community license. DeepSeek V4 — Flash and Pro, MIT licensed, about as
unrestricted as it gets. Qwen 3 from Alibaba — multiple releases, often Apache 2.0. And Mistral
Small 4 — also Apache 2.0, combining reasoning and agentic coding in one open-weight model.
Licenses genuinely differ — read the actual terms, don't assume "open" means no restrictions.

## S4 · STEPS CARD (the real trade-off)

Closed models: fully managed, scaling, continuously updated — but you're bound by that provider's
policies and pricing, and you never get the weights. Open-weight models: self-host it, fine-tune
it freely, audit exactly what's running — but you own the entire operational burden of running
and securing it yourself.

## S5 · OUTRO CARD

Most real teams don't pick a side — they use a closed flagship for the hardest reasoning tasks,
and a self-hosted open model for high-volume or sensitive work. Next lesson: the actual framework
for making that choice, task by task.
