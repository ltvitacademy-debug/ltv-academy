# Lesson 23 — Loading a Pretrained Model

**Chapter 5 · Using Pretrained Models · Lesson 23 of 30**

## What you'll learn

- The two-line pattern that loads almost any model on the Hub
- What files actually get downloaded when you call `from_pretrained`
- The `pipeline` API — the fastest path from a model name to a working prediction
- Why a tokenizer and a model are always loaded as a pair, not separately
- Where the downloaded files land on disk, and why the second run is instant

## Finding a model to load

Before writing any code, you need a model name — the same `owner/model-name` string you'd
see in a Hub URL. The Hub's full-text search is how real engineers find one, filtering by
task, library, or license:

![Hugging Face Hub's full-text search page, with Models, Datasets, and Spaces filter checkboxes and a live results list showing matches across real repositories for the query "albert".](/courses/ai-ml-foundations/ch05/23-loading-a-pretrained-model/Filter_search_1.png)
*Search finds the exact repository name you'll pass to `from_pretrained` — here, results reference the real `albert-base-v2` model.*
Source: [Hugging Face Hub docs — Search](https://huggingface.co/docs/hub/search)

Lesson 22 covered the Hub's structure; this lesson picks one real name — the classic
`bert-base-uncased` — and loads it for real.

## The two-line pattern

Every model on the Hub is loaded the same way: a tokenizer (lesson 22's "the Hub hosts
the files, `transformers` runs them" in practice) and the model itself, both keyed off the
same model name:

```python
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")
```

`AutoTokenizer` and `AutoModel` are **auto classes** — they read the model's config on the
Hub and pick the correct underlying class for you, so the same two lines work whether the
name is `bert-base-uncased`, `gpt2`, or a model release that didn't exist when this
lesson was written. You never have to know in advance exactly which architecture class a
given model needs.

## What actually gets downloaded

`from_pretrained` isn't magic — it's an HTTP download of specific files from the model's
Hub repository, the same files you'd see browsing its Files tab:

![The Files tab of a real Hugging Face model (xlm-roberta-base), showing the actual repository contents: config.json, pytorch_model.bin, sentencepiece.bpe.model, tokenizer.json, each with real file sizes, plus tags for PyTorch, JAX, and Transformers, and a "Use in Transformers" button.](/courses/ai-ml-foundations/ch05/23-loading-a-pretrained-model/repo_with_files.png)
*This is exactly what `from_pretrained` reads: config.json for architecture, the weight file for parameters, and the tokenizer files.*
Source: [Hugging Face Hub docs — Repositories, Getting Started](https://huggingface.co/docs/hub/repositories-getting-started)

Three groups of files, every time: `config.json` (the architecture's shape — how many
layers, how wide), a weights file (`pytorch_model.bin` or the newer `.safetensors`
format — the actual learned numbers from Chapter 4's backpropagation, already trained),
and the tokenizer's own files (vocabulary and rules for turning text into the numeric IDs
a model actually consumes). `AutoTokenizer.from_pretrained` downloads the tokenizer
files; `AutoModel.from_pretrained` downloads the config and the weights.

## Using what you loaded

A loaded tokenizer and model work together immediately:

```python
inputs = tokenizer("Hugging Face is based in New York.", return_tensors="pt")
outputs = model(**inputs)

print(inputs["input_ids"].shape)   # token IDs, e.g. torch.Size([1, 10])
print(outputs.last_hidden_state.shape)  # torch.Size([1, 10, 768])
```

The tokenizer turns the sentence into numeric IDs (`input_ids`); the model turns those IDs
into a `768`-dimensional vector per token (for `bert-base-uncased` specifically — this
number is the model's hidden size, defined in its `config.json`). That output is the raw
building block other lessons use: lesson 24 runs it through a classification head,
Generative AI & LLMs (the next course in this path) turns it into generated text.

## The shortcut: `pipeline`

For common tasks, `transformers` offers a higher-level shortcut that wraps the
tokenizer-plus-model pattern into one call:

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis",
                       model="distilbert-base-uncased-finetuned-sst-2-english")
result = classifier("I really enjoyed learning how this works.")
print(result)
# [{'label': 'POSITIVE', 'score': 0.999...}]
```

`pipeline` still calls `from_pretrained` under the hood for both the tokenizer and the
model — it's the exact same download, just one line shorter, with the pre- and
post-processing (turning raw model output back into a readable label) handled for you.
Reach for the two-line pattern when you need the raw hidden states or a custom head;
reach for `pipeline` when a standard task already has one.

## A sanity check before you load anything

A model name is just a string — `from_pretrained` will happily try to download whatever
you type, including a typo. Before trusting one in real work, its own page is the check:
real download counts, real usage by other public projects, and a real research citation
are all signs a model is what it claims to be.

![A real, popular Hugging Face model page (LiheYoung/depth_anything_vitl14), showing its actual "Downloads last month" count (254,366) and the live list of public Spaces that use this exact model as a dependency.](/courses/ai-ml-foundations/ch05/23-loading-a-pretrained-model/example_repository.png)
*254,366 downloads and 248 Spaces built on top of it — real, checkable signals this is a legitimate, widely-used model.*
Source: [Hugging Face Hub docs — Uploading Models](https://huggingface.co/docs/hub/models-uploading)

Lesson 26 goes deeper into reading a model card before choosing one; for now, the habit to
start building is simple — glance at the page before you load the name.

## Why the second run is instant

The first call to `from_pretrained` downloads every file; after that, they're cached
locally (by default in `~/.cache/huggingface/hub`), keyed by the model name and a content
hash. Every later call — including a different script, the next day — reads from that
cache instead of hitting the network, which is why a real model used across a project
only pays the download cost once.

## Recap

`from_pretrained`, called on a tokenizer and a model together, downloads exactly the
files you'd see on a model's Files tab — `config.json`, the weights, the tokenizer — and
the auto classes pick the right underlying architecture automatically. `pipeline` wraps
that same pattern for common tasks into one line. Both cache locally after the first
download. Next, lesson 24 picks up from the model's raw output and asks: when should you
use a model exactly as downloaded, and when should you fine-tune it on your own data?
