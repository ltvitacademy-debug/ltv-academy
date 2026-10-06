# Lesson 20 — When to Fine-Tune vs. Prompt

**Chapter 4 · Fine-Tuning & Customization · Lesson 20 of 31**

## What you'll learn

- Why "prompt first" is the default, industry-wide starting point for customizing model
  behavior
- A practical decision framework for when prompting genuinely stops being enough
- A current, verified fact about the state of fine-tuning in late 2026 that should shape
  your default choice
- The real trade-offs: iteration speed, cost, and reversibility
- Why this chapter still teaches fine-tuning even though it's often not the first move

## Start with prompting, every time

Every major provider's own guidance agrees on this: try prompt engineering, few-shot
examples, and retrieval (grounding the model in your own documents at request time)
**before** reaching for fine-tuning. Prompting is cheap, takes minutes to iterate on, and
is fully reversible — change the prompt, get a different behavior, instantly. Fine-tuning
is the opposite on every one of those axes: it costs real money to train, takes time to
run, and produces a new artifact you now have to manage.

## When prompting actually stops being enough

Fine-tuning earns its cost in a specific set of situations:

- **A narrow, repeated output shape or style** that's hard to pin down in words but easy
  to show with hundreds of examples (a particular tone, a particular formatting
  convention your team has used for years).
- **Shrinking a long, repeated system prompt** into the model's weights — if every single
  call pays the token cost of a 2,000-word instruction block, baking that behavior in can
  cut real, recurring per-call cost.
- **Domain vocabulary or behavior that resists prompting** — specialized jargon, an
  unusual classification scheme, a house style that a general model keeps drifting away
  from no matter how it's worded.
- **Latency-sensitive, narrow tasks** where a smaller fine-tuned model can match a bigger
  general model's quality on just that one task, at a fraction of the cost and latency.

Notice what's *not* on this list: "the model doesn't know a fact." That's what retrieval
(giving the model documents at request time) is for — fine-tuning is a poor, expensive way
to teach a model new facts, and it tends to memorize specific examples rather than
generalizing knowledge reliably.

## A current fact worth knowing before you decide

As of late 2026, the two major providers have taken genuinely different stances on
self-serve fine-tuning, and it's worth knowing this *before* you plan around it:

- **Anthropic's own Claude API has no self-serve fine-tuning endpoint.** Fine-tuning a
  Claude model is only available through Amazon Bedrock (and historically only for
  specific models like Claude 3 Haiku), or through Anthropic's professional-services
  engagements for larger organizations — not a self-service API call. This reflects a
  deliberate position: Anthropic's documented customization path leans on prompting,
  context, and configuration at the API layer instead.
- **OpenAI has long offered a self-serve fine-tuning API** — but it is actively **winding
  it down**: new organizations have been blocked from it since mid-2026, and OpenAI's own
  documentation states new fine-tuning job creation ends in January 2027.

In other words: the self-serve fine-tuning landscape is actively shrinking, not growing,
at exactly the same moment prompting, retrieval, and tool use have gotten dramatically
more capable. That's a real factor in the "prompt vs. fine-tune" decision today, not just
a cost trade-off on paper.

## A simple decision framework

```
Can retrieval or a better prompt fix it?  → Use that. Don't fine-tune.
Is it a narrow, high-volume, stable task? → Fine-tuning may pay for itself.
Do you have hundreds of good examples?    → Required either way.
Can you afford to re-tune when the base
  model is deprecated (Lesson 12)?        → If not, don't commit to it yet.
```

## Key terms

| Term | Meaning |
|---|---|
| Retrieval (RAG) | Grounding a model in your own documents at request time, instead of baking facts into weights |
| Few-shot prompting | Showing the model several examples of the desired behavior inside the prompt itself |
| Self-serve fine-tuning | An API you can call yourself to kick off a training job, without a vendor engagement |

## Lab

1. List three signals that suggest a task is a good fine-tuning candidate, and one signal
   that specifically suggests it's not (and retrieval is the better fix instead).
2. Explain, in your own words, why "the model doesn't know a recent fact" is usually a
   retrieval problem, not a fine-tuning problem.
3. State the current, provider-specific fact that should make you pause before planning a
   fine-tuning project around either Anthropic's or OpenAI's API.

## Check yourself

You're ready for Lesson 21 when you can explain why "prompt first" is the industry
default, list the handful of situations where fine-tuning actually earns its cost, and
state today's real availability picture for both major providers.
