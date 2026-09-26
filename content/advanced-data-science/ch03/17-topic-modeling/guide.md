# Topic Modeling

Suppose a retailer collects thousands of customer messages and nobody has time to read them all. Sentiment analysis tells you whether people are happy, but not what they are talking about. Topic modeling is an unsupervised technique that answers that second question: it scans a pile of documents and proposes a small number of themes that explain the words in them. No labels are needed, which is the appeal and, as you will see, also the catch.

## What you'll learn

- The core idea: every document is a mixture of topics, and every topic is a weighted list of words
- How to fit NMF and LDA topic models with scikit-learn
- How to read the two outputs: topic-word weights and document-topic weights
- Why topics need human interpretation, and why results can change between runs

## The idea in two matrices

Start from the document-term matrix you built in the bag-of-words and TF-IDF lesson: one row per document, one column per word. Topic modeling factors that matrix into two smaller ones. One matrix says how strongly each *topic* uses each *word*. The other says how strongly each *document* uses each *topic*. Multiply them back together and you approximate the original word counts.

Two algorithms dominate in scikit-learn. **NMF** (non-negative matrix factorization) does this factoring directly and pairs naturally with TF-IDF. **LDA** (latent Dirichlet allocation) is a probabilistic model that treats each document as a mixture of topics and works on raw word counts.

## A small illustrative corpus

We use 22 short, invented retail customer messages about delivery, product quality, and billing. Real corpora have thousands of documents; this one is deliberately tiny so you can read every line.

```python
docs = [
    "package arrived late and the courier left it outside",
    "delivery took two weeks and tracking never updated",
    "battery died after a week and the screen cracked",
    "charged twice on my card for one order",
    # ... 18 more messages
]
```

## Fitting NMF

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF

tfidf = TfidfVectorizer(stop_words="english", min_df=2)
X = tfidf.fit_transform(docs)
terms = tfidf.get_feature_names_out()

nmf = NMF(n_components=3, init="nndsvd",
          random_state=0, max_iter=500)
W = nmf.fit_transform(X)      # documents x topics
H = nmf.components_           # topics x words

for i, row in enumerate(H):
    top = row.argsort()[::-1][:6]
    print("Topic", i, ":", ", ".join(terms[top]))
```

`n_components=3` is the number of topics, and *you* choose it. Output from running this on our corpus (the matrix has 22 documents and 25 words after removing stop words and words that appear only once):

```
Topic 0 : package, arrived, courier, late, delivery, tracking
Topic 1 : charged, card, refund, invoice, twice, weeks
Topic 2 : battery, screen, sturdy, cracked, week, fast
```

Notice the model gave us numbered topics, not names. Reading the top words, a human decides that topic 0 looks like *delivery*, topic 1 looks like *billing*, and topic 2 looks like *product quality*. That naming step is yours.

## Document-topic weights

`W` tells you how much each document belongs to each topic. For documents 0, 6, 12 and 21:

```python
print(W[[0, 6, 12, 21]].round(2))
```

```
[[0.64 0.   0.  ]
 [0.   0.   0.69]
 [0.01 0.54 0.  ]
 [0.12 0.   0.39]]
```

Document 0 ("package arrived late...") loads on the delivery topic, document 6 on quality, document 12 on billing. Document 21 ("delivery early, but the battery was dead on arrival") mixes delivery and quality, which is exactly the kind of overlap topic models are meant to expose.

## LDA, and an honest warning

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

counts = CountVectorizer(stop_words="english", min_df=2)
C = counts.fit_transform(docs)
cterms = counts.get_feature_names_out()
for seed in (0, 1):
    lda = LatentDirichletAllocation(
        n_components=3, random_state=seed, max_iter=50)
    lda.fit(C)
    print("seed", seed)
    for i, row in enumerate(lda.components_):
        top = row.argsort()[::-1][:3]
        print(i, ", ".join(cterms[top]))
```

```
seed 0
0 package, arrived, battery
1 invoice, total, wrong
2 refund, card, charged
seed 1
0 package, arrived, courier
1 battery, screen, invoice
2 charged, card, quality
```

On this tiny corpus LDA gives blurrier topics than NMF (battery lands in the delivery topic under seed 0), and the topics change when only the random seed changes. That is not a bug you can fix by tuning; it is a reminder that topic models are exploratory. LDA usually needs far more text than 22 messages to become stable.

## Interpreting topics responsibly

- **Topics are suggestions, not facts.** The model finds word patterns; only a person can decide whether "charged, card, refund" is a meaningful theme.
- **You choose the number of topics.** Try a few values of `n_components` and read the results. Too few merge distinct themes; too many split one theme into near-duplicates.
- **Check stability.** Refit with different seeds. Themes that appear every time are more trustworthy than ones that flicker.
- **Preprocess deliberately.** Stop-word lists, minimum document frequency, and lemmatization change the topics noticeably.

## Recap

Topic modeling factors a document-term matrix into topic-word and document-topic weights. NMF on TF-IDF and LDA on counts are the two standard scikit-learn options. Always read the top words, name the topics yourself, and test how stable they are before you present them. Next chapter: recommendation systems, starting with how they work.
