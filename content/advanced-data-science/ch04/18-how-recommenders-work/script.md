# Script — How Recommenders Work

## Segment 1 (title)

Customers who bought this also bought that. Recommendations like this are everywhere, and they start from one simple object: a table of which users interacted with which items.

## Segment 2 (matrix)

That table is the user-item matrix. Rows are users, columns are items, and each cell holds an interaction, like a star rating or a click. The empty cells are the whole point. A recommender's job is to guess which empty cells a user would fill in with a high value, then show those items.

## Segment 3 (tiny matrix)

Here is a tiny illustrative log of ratings, pivoted into a matrix. Ana has not rated the desk, and Cy has rated only one item. Feedback like this is explicit, because the user told us their opinion. Most real data is implicit: clicks and purchases. A click suggests interest, but a missing click does not mean dislike.

## Segment 4 (popularity code)

The simplest recommender is popularity. We total the clicks per item, set items this user already clicked to minus infinity, and take the top five. We use one illustrative dataset for the whole chapter: sixty users, thirty items, and a one where the user clicked.

## Segment 5 (output)

Our matrix has six hundred thirty-eight clicks, about thirty-five percent filled in. Real matrices are far sparser. User zero has already clicked item ten, so popularity skips it. Notice that a brand-new user simply gets the overall top five, the same list as everyone else.

## Segment 6 (families)

There are three families. Popularity gives everyone the same list. Collaborative filtering uses only the matrix: people like you liked these. Content-based uses item attributes: you liked items like these. Collaborative methods struggle with cold start, when a new user or item has no history, so popularity is a common fallback.

## Segment 7 (outro)

Next, we build collaborative filtering from scratch.
