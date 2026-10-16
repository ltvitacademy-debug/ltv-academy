# Hugging Face Model Selection Checklist

The six-signal checklist from Chapter 5, turned into a worksheet you can actually fill in before
loading a model into a real project — plus the loading code patterns it pairs with.

## The checklist

Fill in one row per candidate model before you commit to one:

| Signal | Where to find it | Your candidate model's answer |
|---|---|---|
| `pipeline_tag` / tags — does it do the task you need, at all? | The model's Hub page, under tags | |
| License — can you legally use it the way you intend (commercial vs. research-only)? | The model card's metadata | |
| Downloads last month / Spaces using it — is it actually used and trusted by others? | The model's Hub page | |
| `model-index` eval results — how does it perform on named benchmarks? (self-reported) | The "Evaluation results" widget on the model card | |
| Paper / citations — is the method real and traceable? | The `arxiv:` tag, if present | |
| `Finetuned from` lineage — what is it actually built on? | The model card's base-model field | |

No single row is sufficient alone. A high download count with no eval results, or strong eval
results with a license that doesn't fit your use case, both leave you exposed. Fill in every row
before loading a model into anything beyond a quick experiment.

## The loading patterns this checklist leads into

Once a candidate clears the checklist, these are the two patterns Chapter 5 teaches for actually
using it:

```python
# Pattern 1 — the two-line pattern (when you need raw hidden states or a custom head)
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("MODEL_NAME_HERE")
model = AutoModel.from_pretrained("MODEL_NAME_HERE")

inputs = tokenizer("Your text here.", return_tensors="pt")
outputs = model(**inputs)
```

```python
# Pattern 2 — the pipeline shortcut (when a standard task already exists)
from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="MODEL_NAME_HERE")
result = classifier("Your text here.")
print(result)
```

Reach for the two-line pattern when you need the model's raw output for something custom; reach
for `pipeline` when your task (sentiment analysis, summarization, translation, etc.) already has
a standard one. Both download the same underlying files — `config.json`, the weights, and the
tokenizer's own files — and cache them locally after the first call.

## Fine-tune or use as-is?

Before loading, decide which side of this you're on, since it changes what "good enough" means
while you're filling in the checklist above:

- **Use as-is** when your task is close to what the model was already trained/fine-tuned for,
  you need results fast, and a small, documented miss-rate is acceptable for a first pass.
- **Fine-tune** when your domain's language, labels, or edge cases are meaningfully different
  from what the model has seen, and you have labeled examples from your own domain to train on.

Write down which choice you made and why — that sentence becomes the first line of the model
card's "Intended Use" / limitations notes once the model is actually in use.
