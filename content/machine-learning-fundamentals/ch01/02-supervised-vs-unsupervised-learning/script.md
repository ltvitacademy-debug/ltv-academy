# Script — Supervised vs. Unsupervised Learning

## Segment 1 (title)

Almost every machine learning problem falls into one of two families, and the dividing line is a single question: do you have the answers? This lesson shows you both families running on the same data.

## Segment 2 (steps)

In supervised learning, every training example comes with a label, the known answer. If the answer is a number, like a price, that's regression. If it's a category, like churn or no churn, that's classification. In unsupervised learning there is no label. The algorithm just looks for structure, like groups of similar customers.

## Segment 3 (code)

First, supervised, on scikit-learn's bundled iris flowers. We split the data, fit a logistic regression on the training rows with their species labels, then score it on flowers it hasn't seen. Because we have the true answers, we can grade the model, and it gets ninety-seven point eight percent.

## Segment 4 (code)

Now the same features, with no species column at all. KMeans is asked for three groups. Notice there is no y anywhere in this code. The algorithm only sees petal measurements and decides for itself which flowers belong together.

## Segment 5 (code)

How did it do? Compare the groups it found to the real species, which we kept aside just to check. Species zero was found perfectly. The other two overlap a little. Notice the cluster numbers are arbitrary names. Cluster two here matches species one. Only the grouping means anything.

## Segment 6 (screenshot)

Here are both results side by side, the output of the code you've seen. Same flowers, left coloured by given labels, right by discovered clusters. Unsupervised results need human interpretation, since there's no truth to score against.

## Segment 7 (outro)

To choose your family, ask whether your history contains the answer column. Next up, lesson three: the machine learning workflow.
