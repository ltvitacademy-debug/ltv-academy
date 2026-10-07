# Adversarial Prompting & Jailbreaks

Red-teaming exists to find jailbreaks before real users do. This lesson explains what a jailbreak actually is, the general shape of the technique categories red-teamers and researchers have documented, and — most importantly — why such techniques can work at all. The goal here is conceptual and defensive: understanding the mechanism well enough to reason about defenses, not a working recipe for circumventing any specific model's safeguards.

## What you'll learn

- What a jailbreak is: an input crafted to circumvent a model's safety training
- Why jailbreaks are possible at all — a distributional gap between what safety training covered and the full space of possible inputs
- Three general categories of jailbreak technique, described conceptually rather than operationally
- Why no single patch permanently closes this gap

## What a jailbreak is

A jailbreak is an input — a prompt, or a sequence of prompts — specifically crafted to get a model to produce an output its safety training was meant to prevent. The model's refusal behavior (covered in depth next lesson) was trained to activate on requests that look like the harmful categories it was trained to recognize. A jailbreak works by presenting a request that functionally asks for the same disallowed output while not looking, to the model, like the thing it was trained to refuse.

## Why jailbreaks are possible at all: the distributional gap

Safety training — RLHF, RLAIF, Constitutional AI, red-teaming-driven fixes — is finite. It covers a large but necessarily incomplete sample of ways a harmful request could be phrased. The space of all possible inputs a model could receive is vastly larger than any training process can enumerate. That mismatch is the **distributional gap**: safety training shapes behavior reliably on inputs that resemble what it saw, and that reliability degrades, in ways that are hard to fully predict in advance, as an input drifts further from that training distribution while still functionally requesting the same disallowed thing. A jailbreak doesn't need to break the model's underlying capabilities — it only needs to find a phrasing or framing that falls outside what the refusal training generalized to cover.

## Three general categories, described conceptually

Research and red-teaming work on language models has documented several recurring categories of jailbreak technique. Describing what each category exploits, conceptually, is useful for building the right mental model of the problem — this is not a working guide to carrying any of them out.

- **Roleplay and persona framing.** A request is wrapped in a fictional or hypothetical frame — asking the model to speak "as" a character, or to treat the exchange as fiction, analysis, or simulation rather than a direct request. The underlying ask may be functionally unchanged, but the framing shifts how the request pattern-matches against what refusal training recognized as "a direct harmful request."
- **Obfuscation and encoding.** The harmful intent is present but expressed in a way that doesn't surface-match the phrasings safety training saw — through indirection, unusual formatting, or other transformations of how the request is expressed. The content a filter or refusal behavior was trained to recognize can be present in substance while absent in the specific surface form the training generalized from.
- **Many-shot context stuffing.** A long context full of examples or framing is used to shift the model's apparent behavior pattern before the actual request appears, exploiting the fact that a model's behavior is influenced by everything already in its context, not only by the specific request at the end. Documented research on this pattern (often called "many-shot jailbreaking") has shown that very long adversarial contexts can measurably erode refusal behavior that holds reliably at shorter context lengths.

## Why no single fix closes the gap

Each of these categories can be, and has been, specifically defended against — labs retrain against documented jailbreak patterns once they're discovered, which is exactly the red-teaming feedback loop from the previous lesson. But patching a documented pattern doesn't close the distributional gap itself; it narrows one known instance of it. Because the space of possible phrasings is effectively unbounded, this is better understood as an ongoing adversarial dynamic between defenders finding and patching known patterns and testers finding new ones, rather than a problem with a final, permanent fix.

## Key terms

- **Jailbreak** — an input crafted to circumvent a model's safety training and elicit a disallowed output
- **Distributional gap** — the mismatch between the finite set of phrasings safety training covered and the much larger space of possible inputs a model can receive
- **Roleplay/persona framing** — wrapping a request in a fictional or hypothetical frame to shift how it pattern-matches against trained refusal behavior
- **Many-shot context stuffing** — using a long context of examples to shift a model's behavior pattern before the actual request appears
