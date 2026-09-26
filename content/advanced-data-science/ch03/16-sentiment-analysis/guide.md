# Sentiment Analysis

Sentiment analysis asks whether a piece of text is positive or negative. Businesses use it on reviews, survey comments and support messages to spot problems at scale. It looks like the easiest text task, because everyone knows "great" is good and "awful" is bad. It is also where the shortcuts of bag-of-words show their limits: negation, sarcasm and words the model has never met. This lesson builds two simple scorers from scratch and tests them honestly.

## What you'll learn

- How a lexicon-based scorer works, including simple negation handling
- How to train a sentiment classifier with TF-IDF and logistic regression
- Why a high score on data that resembles your training set can mislead
- Which sentences break both approaches, and why
- Where pretrained tools fit in

## The data, and an honest warning

We use two illustrative datasets, both written for this course. The **test set** is 80 hand-written product reviews, 40 positive and 40 negative, with varied wording ("The battery easily lasts two days", "Stopped working after a week, total waste of money"). The **training set** is 200 short reviews assembled by a seeded random generator from a pool of hand-written phrases, so that key sentiment words repeat often enough for a model to learn anything at all:

```python
import random

def make_corpus(n_per_class=100, seed=7):
    rng = random.Random(seed)
    items = ["blender", "headphones", "laptop", "vacuum", "backpack",
             "kettle", "monitor", "keyboard", "camera", "speaker"]
    pos = ["I love this {p}", "Great {p}, works perfectly",
           "Excellent {p} and fast shipping", "Very happy with this {p}",
           "This {p} is amazing", "Best {p} I have owned",
           "Really good {p} for the price", "This {p} is not bad at all",
           "Happy with the {p}, no problems"]
    neg = ["Terrible {p}, it broke in a week", "I hate this {p}",
           "Awful {p} and slow shipping", "Very disappointed with this {p}",
           "This {p} is a waste of money", "Worst {p} I have owned",
           "Really poor {p} for the price", "This {p} is not good at all",
           "Unhappy with the {p}, many problems"]
    pos_t = ["", "", ", would buy again", ", highly recommend it",
             ", works great", ", so easy to use"]
    neg_t = ["", "", ", would not buy again", ", do not recommend it",
             ", stopped working", ", so hard to use"]
    out = []
    for label, heads, tails in ((1, pos, pos_t), (0, neg, neg_t)):
        for _ in range(n_per_class):
            text = rng.choice(heads).format(p=rng.choice(items)) + rng.choice(tails)
            out.append((text, label))
    rng.shuffle(out)
    return out
```

Real training data would be real reviews, thousands of them. Keep this in mind for every number below.

## Approach 1: a lexicon

A **sentiment lexicon** is a list of words with polarity. Our tiny one has 24 positive words (`good`, `great`, `love`, `excellent`, `fast`...), 28 negative ones (`bad`, `terrible`, `broke`, `waste`...) and four negators (`not`, `no`, `never`, `hardly`). The score adds up the polarity of the words, flipping the sign of a word that directly follows a negator:

```python
import re

def score(text):
    toks = re.findall(r"[a-z']+", text.lower())
    s = 0
    for i, t in enumerate(toks):
        v = (t in POS) - (t in NEG)
        if i and toks[i-1] in NEGATORS:
            v = -v
        s += v
    return s
```

A review is called positive when its score is above zero. On the 80 test reviews, accuracy is 0.775 without the negation rule and 0.812 with it. The rule earns its keep on sentences like "Not bad at all, better than I expected", which it now scores positive.

The overall number hides the real story. Thirty-two reviews score exactly zero because they contain no lexicon word at all ("It exceeded my expectations"), and our rule treats zero as negative, which is right by luck for the negative ones and wrong for 15 positives. The other 48 reviews are all classified correctly. The lexicon has high precision but low coverage. One more caveat: I wrote the lexicon while looking at reviews like these, so its score is optimistic. Established lexicon tools such as VADER or TextBlob exist and are widely used, but they are not installed in this environment, so we have not run them; check their current documentation before using them.

## Approach 2: a trained classifier

```python
from sklearn.pipeline import make_pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

model = make_pipeline(TfidfVectorizer(),
    LogisticRegression(max_iter=1000))
print(cross_val_score(model, Xtr, ytr, cv=5).mean())   # 0.98
model.fit(Xtr, ytr)
print(model.score(Xte, yte))                           # 0.70
```

Cross-validation on the training data reports 0.98, which looks superb. But the generated reviews all come from the same nine phrase patterns per class, so the model is only proving it can recognize its own templates. On the 80 independent hand-written reviews it scores 0.70, catching 57% of the positives and 82% of the negatives. The reason is vocabulary: the training set contains only 67 distinct words, and about 59% of the distinct words in the test reviews (counted per review) were never seen. A model cannot weigh a word it has no coefficient for.

## Where both approaches break

```
sentence                      lex P(pos)
The battery is not great       -1   0.56
Not bad, I like it             +1   0.60
Oh great, it broke on day one   0   0.52
I did not love it              -1   0.54
Absolutely wonderful           +1   0.50
```

The lexicon handles simple negation but scores the sarcastic sentence as 0, because "great" and "broke" cancel out. The classifier leans slightly positive on "not great", which is wrong, and sits near 0.5 on most of these: its unigram features cannot see that "not" modifies the next word, and it does not know words like "wonderful". Bigrams can help with negation given enough data, while sarcasm generally needs far more context.

Pretrained transformer models, for example those available through Hugging Face's `transformers` library, are the usual next step for real projects because they were trained on very large text collections. We have not run one here; if you try one, evaluate it on your own labeled examples rather than trusting a headline accuracy.

## Recap

- A lexicon needs no training data, but misses words it does not list and misjudges negation and sarcasm.
- A trained classifier adapts to your domain but only knows the words it has seen.
- Cross-validation on data resembling your training set can wildly overstate real-world accuracy: test on realistic text.
- Always inspect the failures, not just the accuracy.

Next lesson: topic modeling, finding themes in text when you have no labels at all.
