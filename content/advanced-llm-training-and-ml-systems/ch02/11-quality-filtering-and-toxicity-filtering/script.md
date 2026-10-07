# Script — Quality Filtering & Toxicity Filtering

## Segment 1 (title)

After deduplication removes redundant content, the corpus still has plenty of unique but low-value or harmful text. This lesson covers the two remaining cleaning passes: quality filtering and toxicity or safety filtering.

## Segment 2 (code)

The cheapest pass uses simple heuristic rules rather than a trained model: document length bounds, the ratio of alphabetic characters to symbols, and the fraction of stop words present. These catch obviously broken documents, like gibberish or keyword-stuffed spam, before any model-based filtering runs.

## Segment 3 (steps)

Two model-based approaches go further. KenLM-style perplexity filtering trains a small n-gram model on known high-quality text and scores candidate documents by how surprised that model is by them. Classifier-based filtering instead trains a lightweight model, often a fastText classifier for speed at scale, to predict a quality label directly.

## Segment 4 (code)

In practice, a fastText quality classifier loads once and predicts a label and probability for each document, letting a pipeline threshold on that score to keep or drop it.

## Segment 5 (steps)

Toxicity filtering is a separate concern entirely, using tools like Perspective API or Detoxify to score hate speech and harassment. And PII scrubbing, removing emails, phone numbers, and ID numbers with pattern matching and named-entity recognition, runs as its own independent pass regardless of a document's quality or toxicity score. Next up, lesson twelve: sequence packing, where this filtered, tokenized text finally becomes training sequences.
