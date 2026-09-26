# Script — Collaborative Filtering

## Segment 1 (title)

People like you also liked. That is collaborative filtering. It ignores what items are and looks only at who interacted with what.

## Segment 2 (idea)

If two users clicked many of the same items, they probably share taste, so what one liked is a good candidate for the other. We measure that overlap with cosine similarity: a score near one means the same people clicked both items, and zero means no overlap at all.

## Segment 3 (item-item code)

Here is item-based filtering on our illustrative click matrix. We compute similarity between item columns, zero out the diagonal, and multiply the click matrix by the similarity matrix. Each candidate item's score is its total similarity to the items the user already clicked.

## Segment 4 (output)

Item zero is more similar to item one, in the same taste group, than to item twenty, in the other group. User zero's recommendations all come from the first half of the catalog. User-based filtering gives a similar but not identical list.

## Segment 5 (SVD code)

Matrix factorization takes a different route. TruncatedSVD compresses the matrix into just two latent factors per user, then reconstructs the empty cells from them. Two factors is a tiny choice for a toy dataset. On real data, it is a hyperparameter to tune.

## Segment 6 (chart)

Plot those two factors and the two taste groups separate on their own, even though the model never saw a group label. The latent factors have discovered the structure hidden in the clicks.

## Segment 7 (limits)

Collaborative filtering has limits. New users and items have no history. Real matrices are sparse, so overlaps are thin. Popular items tend to dominate. And the model never knows why anyone clicked.

## Segment 8 (outro)

Next, content-based recommendation, which fills the cold-start gap.
