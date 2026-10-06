# Lesson 26 — Model Cards & Choosing a Model

**Chapter 5 · Using Pretrained Models · Lesson 26 of 30**

## What you'll learn

- What a model card actually is, structurally, underneath the rendered page
- The metadata fields that make a model card searchable and filterable, not just readable
- How benchmark results get from a model's training run onto its public page
- Why checking the source paper is a real, five-second credibility check
- A complete checklist for choosing a model, pulling together every signal from this chapter

## A model card is just a README with structured metadata

Every model page this chapter has shown — lessons 22 through 25 — is rendered from one
file: the repository's `README.md`, with a block of structured metadata (YAML
"frontmatter") at the top. The prose below that block is for humans; the metadata above
it is for machines — search, filtering, and the Hub's own UI all read it directly. Here's
that metadata, edited through the Hub's own UI instead of raw YAML:

![The Hugging Face Hub's Metadata UI editor for a real model (bigscience/bloomz-560m), showing structured fields: license (BigScience BLOOM RAIL 1.0), language tags (Xhosa, Yoruba, Chinese, Zulu, and more), datasets (bigscience/xP3), and pipeline_tag set to Text Generation.](/courses/ai-ml-foundations/ch05/26-model-cards-and-choosing-a-model/metadata-ui-editor.png)
*Every one of these fields is filterable on the Hub's search page — this is the data behind lesson 22's filter checkboxes.*
Source: [Hugging Face Hub docs — Model Cards](https://huggingface.co/docs/hub/model-cards)

`pipeline_tag` in particular is worth noticing: it's the exact string `pipeline(...)`
reads in lesson 23's code to know what kind of model it's loading, and it's the field
that makes a model show up when you filter the Hub by task.

## Where benchmark numbers on a model card come from

A model card can also declare `model-index`: structured evaluation results (which
benchmark, which metric, what score), which the Hub renders as a readable results widget
right on the page — no separate leaderboard to visit:

![Side-by-side comparison showing real YAML model-index metadata (task: text-generation, dataset: openai_humaneval, metric: pass@1, value: 0.408) on the left, and the exact rendered 'Evaluation results' widget it produces on a real model's page (StarCoder, pass@1 on HumanEval, MBPP, and more) on the right.](/courses/ai-ml-foundations/ch05/26-model-cards-and-choosing-a-model/eval-results-v2.png)
*The number you see on the page is never hand-typed into the rendered text — it's structured data, traceable back to this exact YAML.*
Source: [Hugging Face Hub docs — Model Cards](https://huggingface.co/docs/hub/model-cards)

Notice the `self-reported` tag next to each result in the widget: these numbers come from
whoever published the model, not an independent referee. That doesn't make them
worthless, but it's a reason to treat them as a strong first signal rather than
unconditional proof.

## The paper is a five-second credibility check

Many serious models link directly to the research paper that describes how they were
trained:

![A small real Hugging Face model card detail: an "arxiv:1810.04805" tag with a dropdown showing "View paper page" and "List models citing this paper."](/courses/ai-ml-foundations/ch05/26-model-cards-and-choosing-a-model/models-arxiv.png)
*Clicking through confirms the model is what it claims to be — a real, published, peer-reviewed-or-not method, not just a name.*
Source: [Hugging Face Hub docs — Model Cards](https://huggingface.co/docs/hub/model-cards)

"List models citing this paper" is a genuinely useful discovery tool on its own: it
surfaces every other model built on the same underlying method, which is often a faster
way to compare options than searching by keyword.

## Putting it together: a checklist

Every lesson in this chapter contributed one signal. Combined, they're the actual
checklist for choosing a model in real work:

| Signal | From | What it tells you |
|---|---|---|
| `pipeline_tag` / tags | This lesson | Does it do the task you need, at all |
| License | This lesson | Can you legally use it the way you intend |
| Downloads, Spaces using it | Lesson 23 | Is it actually used and trusted by others |
| `model-index` eval results | This lesson | How it performs on named benchmarks (self-reported) |
| Paper / citations | This lesson | Is the method real and traceable |
| `Finetuned from` lineage | Lesson 24 | What it's actually built on, and what else shares that base |

No single row is sufficient alone — a high download count with no eval results, or
eval results with a license that doesn't fit your use case, both leave you exposed. Read
the card like you'd read any other piece of technical documentation before depending on
it: skeptically, and in full.

## Recap

A model card is a README with structured YAML metadata on top — `pipeline_tag`, license,
language, and `model-index` eval results, all of it searchable and renderable because
it's structured data, not just prose. The paper link is a real, fast credibility check.
Put together with lesson 23's download/usage signals and lesson 24's base-model lineage,
that's the full picture for choosing a model deliberately instead of by guesswork.
Chapter 5 closes here. Chapter 6, the capstone, puts everything from this course together
on one real, small project — starting with lesson 27.
