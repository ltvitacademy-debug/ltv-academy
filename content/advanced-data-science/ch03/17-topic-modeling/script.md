# Script — Topic Modeling

## Segment 1 (title)

Sentiment analysis tells you whether customers are happy. Topic modeling tells you what they are talking about. It scans a pile of documents, with no labels at all, and proposes a small set of themes.

## Segment 2 (idea)

The idea is simple. Every document is a mixture of topics, and every topic is a weighted list of words. Mathematically, we take the document-term matrix and factor it into two smaller matrices: one linking topics to words, and one linking documents to topics. The two standard tools in scikit-learn are NMF, which pairs well with TF-IDF, and LDA, which works on raw word counts.

## Segment 3 (NMF code)

Here we fit NMF on twenty-two short, illustrative retail messages. We build the TF-IDF matrix, then ask for three topics. That number is your choice, not the model's. Fit transform gives document-topic weights, and components gives topic-word weights.

## Segment 4 (output)

Reading the top words, topic zero looks like delivery, topic one looks like billing, and topic two looks like product quality. Notice the model only gave us numbers. Naming the topics is a human job. Document weights also show mixtures: the message about early delivery but a dead battery loads on both delivery and quality.

## Segment 5 (LDA)

Now the honest part. LDA on this tiny corpus gives blurrier topics, and they change when only the random seed changes. Battery even lands in a delivery topic under one seed. LDA usually needs far more text than this to be stable.

## Segment 6 (interpret)

So treat topics as suggestions. Name them yourself, try several topic counts, and refit with different seeds. Themes that appear every time are more trustworthy than ones that flicker.

## Segment 7 (outro)

Next chapter we move to recommendation systems, starting with how they work.
