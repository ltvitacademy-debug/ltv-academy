# Script — Random Forests

## Segment 1 (title)

A single decision tree is easy to read, but unstable and prone to memorizing. A random forest keeps the tree's strengths and fixes that weakness by training hundreds of slightly different trees and letting them vote. It's one of the most reliable, low-fuss models for tabular data.

## Segment 2 (steps)

The idea is the wisdom of crowds. Individual guesses are noisy, but their errors point in different directions, so the average is better. To keep the trees different, a forest adds randomness two ways. Each tree trains on a bootstrap sample of the rows. And at every split, each tree considers only a random subset of the features. Then the trees vote.

## Segment 3 (code)

Here's a real dataset bundled with scikit-learn, five hundred sixty-nine breast cancer samples with thirty measurements. A single tree scores point nine oh six on the test set. A forest of two hundred trees scores point nine five three. Both fit the training data perfectly, but the forest generalizes better. That's variance reduction.

## Segment 4 (code)

More trees help, with diminishing returns. We sweep the forest size with five-fold cross-validation, and plot it against the single tree's score as a dashed line.

## Segment 5 (screenshot)

This is the output of the code above. A one-tree forest scores point nine oh oh, no better than a plain tree. By five trees it jumps to point nine five six, peaks near point nine six three around fifty to a hundred trees, then levels off. Extra trees just cost time.

## Segment 6 (steps)

Know the key settings: n estimators for the number of trees, max features for how many each split sees, and max depth or min samples leaf to limit tree size. Forests are accurate and need no scaling. But you lose the single tree's readable path, and they're slower and larger.

## Segment 7 (outro)

So how do you find out what a forest actually learned? Next up: feature importance.
