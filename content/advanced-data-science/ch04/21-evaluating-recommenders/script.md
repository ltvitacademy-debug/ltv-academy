# Script — Evaluating Recommenders

## Segment 1 (title)

You have built two kinds of recommender. Now the question every stakeholder asks first: is it any good? Evaluating a recommender is trickier than scoring a classifier, because the right answer is a ranked list, not a single label.

## Segment 2 (three families)

There are three families of metrics. Rating accuracy, like RMSE, measures predicted stars against real stars, but users never see predicted ratings. Ranking quality, meaning precision at k, recall at k, and NDCG, scores the top items you would actually show. And beyond-accuracy measures, like coverage, tell you whether you are recommending the whole catalog or just bestsellers.

## Segment 3 (split)

To evaluate offline, hold out interactions per user. For each user, we hide one item they clicked, and keep the rest as training history. The model's job is to put that hidden item near the top of its list.

## Segment 4 (metric code)

Then we score the top five items for each user. The first line sets already-seen items to minus infinity, so the model never gets credit for recommending something the user already has. Count the hits, divide by five for precision, divide by the number of hidden items for recall.

## Segment 5 (output)

Here is what we saw. Random finds the hidden item about eighteen percent of the time. Simply recommending the most popular items gets thirty-five percent. Item-item collaborative filtering gets sixty-two percent. NDCG, in the guide, tells the same story. Coverage jumps from fifty-seven to ninety-three percent, so more of the catalog gets a chance to sell.

## Segment 6 (cautions)

Two cautions. Always beat the popularity baseline, because it is cheap and hard to beat on sparse data. And remember offline metrics are only a proxy, since past behavior was shaped by what the old system showed. The real test is an online A/B experiment.

## Segment 7 (outro)

Next lesson, we open the black box, starting with why explainability matters.
