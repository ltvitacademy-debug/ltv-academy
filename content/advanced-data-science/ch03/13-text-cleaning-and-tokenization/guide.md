# Text Cleaning & Tokenization

Every model you have built so far consumed numbers. Text is not numbers: it is a messy string of letters, punctuation, emoji, URLs and typos. Natural language processing (NLP) starts with a humble question: how do we turn a raw string into a clean list of units that a model can count? The answer is a small pipeline, and most of the skill lies in knowing which steps help your problem and which quietly damage it.

## What you'll learn

- The four-step text pipeline: normalize, tokenize, filter, reduce
- How to clean and tokenize text with Python's `re` module
- Why the default stop-word list can flip a sentence's meaning
- What stemming does, and why its output is not always a real word
- Why every cleaning step is a decision, not a ritual

## Steps 1 and 2: normalize and tokenize

**Normalizing** makes different spellings of the same thing look identical: lowercase everything, remove URLs, strip symbols. **Tokenizing** splits the cleaned string into units, usually words, called tokens.

Here is one messy review (illustrative) run through both steps with only the standard library:

```python
import re

raw = ("Loved it!!! Battery lasts 2 days..."
       " see https://x.co/a1 :) but the"
       " CHARGER isn't great.")

text = raw.lower()
text = re.sub(r"https?://\S+", " ", text)
text = re.sub(r"[^a-z' ]", " ", text)
tokens = re.findall(r"[a-z']+", text)
print(tokens)
```

Output:

```
['loved', 'it', 'battery', 'lasts', 'days', 'see', 'but', 'the', 'charger', "isn't", 'great']
```

Eleven tokens. Notice what our rules decided: the digit `2` was dropped, the emoticon vanished, and `isn't` survived as one token because we kept apostrophes. None of that is universally right. If digits matter (say, in support tickets that mention error codes), keep them. If emoticons carry sentiment, keep them. Write the regular expression for the data you have, not the data a tutorial had.

A shortcut worth knowing: scikit-learn's `CountVectorizer().build_analyzer()` returns a function that lowercases and tokenizes in one call. Its default pattern keeps tokens of two or more letters or digits, so it silently drops single characters.

## Step 3: stop words, and a trap

Stop words are very common words (`the`, `a`, `of`) that carry little topical information. Removing them shrinks your vocabulary. scikit-learn ships a list of 318 English stop words:

```python
from sklearn.feature_extraction.text import (
    ENGLISH_STOP_WORDS, CountVectorizer)

print(len(ENGLISH_STOP_WORDS))        # 318
print("not" in ENGLISH_STOP_WORDS)    # True

vec = CountVectorizer(stop_words="english")
print(vec.build_analyzer()("Not a good battery"))
# ['good', 'battery']
```

The list contains `not`. So "Not a good battery" becomes "good battery", the opposite of what the customer said. For topic-style tasks stop-word removal is usually harmless. For sentiment, negation is signal. When in doubt, skip the filter, or edit the list to keep negations.

## Step 4: reduce words to a root

The same idea appears in many surface forms: `charge`, `charging`, `charged`, `charges`. **Stemming** chops suffixes by rule. **Lemmatization** uses a dictionary and grammar to return the real base form. A deliberately crude stemmer shows the idea and its limits:

```python
def crude_stem(w):
    for suf in ("ing", "ed", "s"):
        if w.endswith(suf):
            return w[:-len(suf)]
    return w
```

Applied to real tokens: `lasts` becomes `last`, `charging` becomes `charg`, `loved` becomes `lov`, `batteries` becomes `batterie`, and `was` becomes `wa`. Some of these are useful; several are not real words. Mature libraries such as NLTK (Porter stemmer, WordNet lemmatizer) and spaCy (lemmatizer) handle far more cases, but they are not installed in the environment used for these lessons, so we do not run them here. Check their current documentation before relying on them, and inspect their output on your own data.

## Recap

- Text pipelines are normalize, tokenize, filter, reduce, and every step is optional.
- Regular expressions from Python's standard library cover most cleaning needs.
- The default stop-word list removes negations, which is dangerous for sentiment.
- Stemmers are fast but crude; lemmatizers are more accurate but heavier.
- Decide each step by asking: does removing this information help my task or hurt it?

Next lesson: turning these tokens into numbers with bag-of-words and TF-IDF.
