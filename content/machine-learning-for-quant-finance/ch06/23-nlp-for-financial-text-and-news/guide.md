# NLP for Financial Text & News

Not every useful signal lives in a price or volume column. News articles, earnings call transcripts, and regulatory filings all carry information that can move markets before — or instead of — any price reaction shows up on its own. This lesson covers how natural language processing turns that text into usable features, from older bag-of-words methods through modern transformer-based models, along with the timing caveats that make financial NLP easy to get wrong.

## What you'll learn

- Bag-of-words sentiment scoring and the Loughran-McDonald financial lexicon
- Why general-purpose sentiment models misread financial language
- Modern transformer-based approaches like FinBERT-style fine-tuned models
- The leakage risk specific to text: using information before it was actually public
- Why text-derived signals tend to be noisy even when the method is sound

## Older approach: bag-of-words and the Loughran-McDonald lexicon

The simplest way to score sentiment is a **bag-of-words** approach: count occurrences of words from a predefined positive/negative word list, ignoring grammar and word order entirely.

```python
positive_words = {"growth", "profit", "strong", "beat", "improved"}
negative_words = {"decline", "loss", "weak", "miss", "litigation"}

def bow_sentiment(text):
    tokens = text.lower().split()
    pos = sum(1 for t in tokens if t in positive_words)
    neg = sum(1 for t in tokens if t in negative_words)
    return (pos - neg) / max(len(tokens), 1)
```

This naive approach has a well-known failure mode in finance: general-purpose sentiment dictionaries misclassify ordinary financial vocabulary. A word like "liability," "tax," or "cost" reads as negative to a general sentiment model, even though it's routine, neutral language in a 10-K filing. The **Loughran-McDonald financial sentiment lexicon** was built specifically to fix this — it's a word list derived from actual financial disclosures, tagging terms as positive, negative, uncertain, or litigious based on how they're actually used in financial text, rather than everyday usage.

```python
# Conceptual use of a Loughran-McDonald-style lexicon
import pandas as pd

lm_lexicon = pd.read_csv("loughran_mcdonald_lexicon.csv")  # word, category
negative_set = set(lm_lexicon[lm_lexicon.category == "Negative"].word)

def lm_sentiment(text):
    tokens = text.lower().split()
    neg_hits = sum(1 for t in tokens if t in negative_set)
    return -neg_hits / max(len(tokens), 1)
```

## Modern approach: transformer-based embeddings

Bag-of-words approaches throw away context and word order entirely — "beat expectations" and "missed, beat down by competition" would be scored the same way if both contain "beat." Transformer-based language models, pretrained on large text corpora and then **fine-tuned** on financial text, capture context instead of just counting words.

**FinBERT** is the best-known example of this pattern: a BERT model fine-tuned specifically on financial communications (analyst reports, earnings calls) to classify sentiment with awareness of financial context that a general-purpose model lacks.

```python
# Illustrative use of a FinBERT-style model via Hugging Face transformers
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")

text = "Revenue missed expectations but management reaffirmed full-year guidance."
inputs = tokenizer(text, return_tensors="pt", truncation=True)
with torch.no_grad():
    logits = model(**inputs).logits
probs = torch.softmax(logits, dim=-1)  # [positive, negative, neutral]
```

These models can also be used for entity extraction — identifying which company, executive, or product a piece of text is actually about — which matters when a single news article discusses multiple companies and a sentiment score needs to be attributed to the right one.

## The timing caveat: don't use information before it was public

This is the text-specific version of the leakage problem from Chapter 1 and Chapter 4. A news article has a publication timestamp, and a regulatory filing has a filing timestamp — if your backtest uses the *content* of a filing but accidentally timestamps the resulting feature to an earlier date (say, the fiscal period the filing covers, rather than the date it was actually released), the model is being handed information before it existed in the real world. The same risk applies to earnings-call transcripts: the transcript isn't available until after the call ends, not at the start of the trading day the call happens to fall on.

## A practical caveat: noisy signal, even done right

Even with correct timing and a properly fine-tuned model, text-derived signals tend to be noisy. Sentiment extracted from news is a proxy for market-moving information, not the information itself — the same headline can be already priced in, misinterpreted by the market, or simply irrelevant to the asset you're modeling. Treat NLP-derived features the same way Chapter 5 taught you to treat any feature: check their importance and stability, don't assume sentiment equals signal just because it sounds intuitive.

## Key terms

| Term | Meaning |
|---|---|
| Bag-of-words | Sentiment scoring by counting words against a list, ignoring order/context |
| Loughran-McDonald lexicon | A word list built from real financial disclosures, correcting general sentiment dictionaries' financial-vocabulary errors |
| FinBERT | A BERT-family language model fine-tuned on financial text for context-aware sentiment |
| Timing/event leakage | Using text-derived information before it was actually publicly available |

## Recap

Financial NLP has moved from simple word-counting with finance-specific lexicons like Loughran-McDonald to transformer-based models like FinBERT that understand context. Either way, the biggest practical risk is timing leakage — using a filing's or transcript's content before it was actually public — and even correctly-timed sentiment signals tend to be noisy. Next up, Lesson 24: alternative data overview, where we look beyond text to satellite imagery, transaction data, and other non-traditional sources.
