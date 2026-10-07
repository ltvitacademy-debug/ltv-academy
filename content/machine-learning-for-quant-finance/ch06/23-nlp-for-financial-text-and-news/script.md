# Script — NLP for Financial Text & News

## Segment 1 (title)

Not every useful signal lives in a price or volume column. News articles, earnings call transcripts, and regulatory filings all carry information that can move markets, and natural language processing turns that text into usable features.

## Segment 2 (code)

The simplest approach is bag-of-words: count occurrences of words from a predefined positive or negative list and ignore grammar and order entirely. The problem is that general-purpose sentiment dictionaries misread ordinary financial vocabulary. Words like liability or tax read as negative to a general model, even though they're routine language in a filing. The Loughran-McDonald financial sentiment lexicon was built specifically to fix this, tagging words as positive, negative, uncertain, or litigious based on how they're actually used in real financial disclosures.

## Segment 3 (code)

Bag-of-words still throws away context and word order completely. Modern transformer-based models fix that by capturing context instead of just counting words. FinBERT is the best-known example: a BERT model fine-tuned specifically on financial communications like analyst reports and earnings calls, so it classifies sentiment with an awareness of financial context a general-purpose model lacks. The same kind of model can also extract which company or executive a piece of text is actually about, which matters when one article discusses several companies at once.

## Segment 4 (steps)

The biggest practical risk is timing. This is the text-specific version of the leakage problem from earlier chapters. If a feature derived from a filing's content gets timestamped to the fiscal period it covers instead of the date it was actually released, the model is being handed information before it existed in the real world. The same applies to earnings call transcripts, which aren't available until after the call ends, not at the start of that trading day. And even with timing handled correctly, sentiment signals tend to stay noisy, since a headline can already be priced in or simply misread by the market.

## Segment 5 (outro)

Text is one source of alternative data, but far from the only one. Up next, lesson twenty-four: alternative data overview, covering satellite imagery, transaction panels, and other non-traditional sources.
