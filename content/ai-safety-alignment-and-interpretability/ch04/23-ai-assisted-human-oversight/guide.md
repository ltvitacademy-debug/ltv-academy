# AI-Assisted Human Oversight

This chapter has covered three proposals for the superhuman future: debate, recursive reward modeling, and weak-to-strong generalization. This closing lesson brings the chapter back to the present, covering the nearer-term version of scalable oversight already showing up in practice — AI tools that help a human reviewer evaluate work the human couldn't fully check alone — and the open question of how much to trust the tool doing the helping.

## What you'll learn

- What AI-assisted human oversight means as a near-term, practical technique
- The main categories of assistance: critique, summarization, and fact-checking
- Concrete evidence that AI critique measurably helps human evaluators
- Why the assisting AI's own trustworthiness becomes a new thing to oversee
- How this lesson ties together the chapter's three other proposals

## The idea: give the human help, not a replacement

AI-assisted human oversight keeps a human as the final decision-maker but gives that human AI-generated tools to extend what they can actually check — rather than trying to replace the human's judgment, or waiting for a future method like debate to mature. This is less a single named technique than a practical category covering several concrete tools already being studied and deployed: models that write critiques of other models' outputs, models that summarize long or technical material into something a time-constrained reviewer can actually read, and models that fact-check specific claims against retrieved sources. It's the lesson 19 problem addressed with the tools already available today, rather than a future architecture.

## Critique models: the clearest tested example

The clearest empirical case for this approach is OpenAI's 2022 paper "Self-Critiquing Models for Assisting Human Evaluators" (Saunders, Yeh, et al.). The researchers fine-tuned language models to write natural-language critiques — comments pointing out specific flaws — of model-generated summaries, using a topic-based summarization task as the testbed. The result: these critiques helped human labelers catch flaws in the summaries that they missed when reviewing without AI assistance, including flaws the researchers had deliberately planted to be misleading. Larger models wrote more helpful critiques and were better at critiquing their own outputs — even though their own outputs were, naturally, harder to critique than a weaker model's more obviously flawed ones.

## Summarization and fact-checking as oversight tools

Critique is one category; summarization and fact-checking are two others doing real work in practice. A model that compresses a long document, a sprawling codebase diff, or a dense technical report into a reviewable summary doesn't replace a human's judgment about whether the underlying work is good — but it does make the review tractable at all for a human who would otherwise have to read something at a scale and speed that makes careful review impractical. Fact-checking tools that verify specific claims against retrieved sources serve a narrower but complementary role: they don't evaluate the overall quality of a piece of work, but they can catch a factual error a time-pressured human reviewer would otherwise wave through. None of these tools are oversight on their own — they're force multipliers for a human overseer who remains the one making the final call.

## The new problem this creates: who oversees the overseer's assistant

Handing a human reviewer an AI assistant doesn't remove the trust problem — it relocates it. If the critique model, the summarizer, or the fact-checker is itself subtly wrong, biased, or incomplete in a way the human can't detect, the human's confidence in their own judgment can go up while the actual reliability of that judgment doesn't improve to match, or even goes down if the assistant's errors are confidently stated. Anthropic's "Measuring Progress on Scalable Oversight" work found that participants paired with an unreliable AI assistant still did measurably better than either the assistant alone or their own unaided judgment — a genuinely useful result — but "better than unaided" is a different claim from "fully reliable," and the paper's own framing treats this as encouraging early evidence, not a closed case.

## Tying the chapter together

Debate, recursive reward modeling, and AI-assisted human oversight are not competing answers to the same multiple-choice question — they're different angles on the same underlying problem, and in practice they overlap. A critique model is itself a lightweight form of the "assistant" idea at the heart of recursive reward modeling. A debate between two models, with a human judge reading the transcript, is a structured special case of AI-assisted human oversight. Weak-to-strong generalization studies what happens inside the model being supervised, while debate and AI-assisted oversight focus on the supervision process around it. None of the four fully solves scalable oversight on its own — together, they represent the field's current best attempts at keeping supervision trustworthy as the systems being supervised keep getting more capable than the people checking them.

## Key terms

| Term | Meaning |
|---|---|
| AI-assisted human oversight | Using AI tools such as critique, summarization, or fact-checking to help a human reviewer evaluate work they couldn't fully check unaided, while the human remains the final decision-maker |
| Critique model | A model fine-tuned to write natural-language critiques pointing out specific flaws in another model's output, measurably helping human reviewers catch flaws they'd otherwise miss |
| Force multiplier | A tool that extends what a human reviewer can check without itself making the final judgment call |
| Relocated trust problem | The dynamic where handing a human an AI assistant doesn't remove the question of trustworthiness — it just moves that question onto the assistant itself |

## Recap

AI-assisted human oversight is the practical, available-today version of scalable oversight: critique, summarization, and fact-checking tools that genuinely help human reviewers catch more than they would alone, while raising a new question of how much to trust the assisting tool itself — and it sits alongside debate, recursive reward modeling, and weak-to-strong generalization as one of several overlapping attempts at the same underlying problem. That closes Chapter 4; Chapter 5, "Interpretability Foundations," turns from supervising a model's outputs to looking inside it, starting with lesson 24, "Why Interpretability Matters."
