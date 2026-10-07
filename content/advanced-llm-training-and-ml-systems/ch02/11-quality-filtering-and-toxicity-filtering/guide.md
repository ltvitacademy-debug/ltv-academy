# Quality Filtering & Toxicity Filtering

After deduplication removes redundant content, the corpus still contains plenty of unique but low-value or harmful text — spam, auto-generated boilerplate, adult content, hate speech, and personally identifiable information. This lesson covers the two remaining cleaning passes: quality filtering (is this text well-formed, useful prose) and toxicity/safety filtering (should this content be excluded regardless of how well-formed it is).

## What you'll learn

- The difference between heuristic and classifier-based quality filtering
- How perplexity-based filtering with an n-gram language model (KenLM) works
- How fastText-based quality and toxicity classifiers are used in practice
- Why PII scrubbing is a distinct concern from both quality and toxicity

## Heuristic quality filters

The cheapest filtering pass uses simple, fast rules rather than a trained model: document length bounds, the ratio of alphabetic characters to symbols/digits, the fraction of stop words present (too few suggests gibberish or keyword-stuffed spam), repeated-line ratio, and mean word length. These heuristics, used by corpora like C4 and Gopher's filtering pipeline, catch obviously broken documents cheaply before any model-based filtering runs.

```python
def passes_heuristic_filters(text: str) -> bool:
    words = text.split()
    if not (50 <= len(words) <= 100_000):
        return False
    alpha_chars = sum(c.isalpha() for c in text)
    if alpha_chars / max(len(text), 1) < 0.6:
        return False
    stopwords = {"the", "a", "an", "and", "of", "to", "in"}
    stopword_ratio = sum(w.lower() in stopwords for w in words) / len(words)
    return stopword_ratio > 0.02
```

## Perplexity-based filtering with KenLM

A more targeted approach trains a lightweight n-gram language model (commonly with **KenLM**) on a small set of known high-quality text (e.g., Wikipedia), then scores every candidate document by its **perplexity** under that model — how "surprised" the small model is by the text. Text that looks statistically unlike well-formed prose (gibberish, keyword stuffing, heavily corrupted OCR output) gets high perplexity and can be filtered out. This is the approach used by CCNet, one of the pipelines behind CommonCrawl-derived training corpora.

## Classifier-based quality filtering

Rather than hand-written heuristics, many modern pipelines (e.g., the approach behind FineWeb-Edu) train a lightweight classifier — often a **fastText** linear classifier for speed at scale — to predict a quality label, using a small set of human- or LLM-labeled examples as training data.

```python
import fasttext

quality_model = fasttext.load_model("quality_classifier.bin")

def quality_score(text: str) -> float:
    label, prob = quality_model.predict(text.replace("\n", " "))
    return prob[0] if label[0] == "__label__high_quality" else 1 - prob[0]
```

## Toxicity and safety filtering

Separately from quality, documents are screened for harmful content — hate speech, harassment, sexually explicit material, and similar categories. Common approaches include Google's **Perspective API** (a hosted toxicity-scoring service) and the open-source **Detoxify** models, both of which output per-category probability scores (e.g., "toxicity," "severe_toxicity," "identity_attack") that a pipeline thresholds against to decide whether to drop a document.

## PII scrubbing: a distinct concern

Even well-written, non-toxic text can contain personally identifiable information — emails, phone numbers, government ID numbers — that shouldn't be memorized and potentially regurgitated by a trained model. PII scrubbing uses pattern-matching (regex for structured identifiers like emails/phone numbers) combined with named-entity recognition for less structured PII, and is run as its own pass independent of quality and toxicity scoring.

## Key terms

- **Perplexity** — a measure of how "surprised" a language model is by a piece of text; high perplexity under a quality model suggests ill-formed text
- **KenLM** — a fast n-gram language model toolkit commonly used for perplexity-based quality filtering
- **fastText classifier** — a lightweight, fast linear text classifier used at web scale for quality/category prediction
- **Perspective API / Detoxify** — tools that score text for toxicity and related harmful-content categories
- **PII (Personally Identifiable Information)** — information scrubbed from training data regardless of its quality or toxicity score

## Recap

After deduplication, text still needs quality filtering (heuristic rules, KenLM perplexity, or fastText classifiers) and separate toxicity/safety filtering (Perspective API, Detoxify) before it's ready for the next stage, with PII scrubbing run as its own independent pass. Next up, Lesson 12: sequence packing, where filtered, tokenized documents get assembled into actual training sequences.
