# Script — Tuning Boosted Models

## Segment 1 (title)

Boosting libraries have dozens of settings, and it's tempting to throw a giant grid search at all of them. That's slow, and it often buys very little. In this lesson we tune XGBoost in a sensible order, and we measure every gain against the noise.

## Segment 2 (steps)

Here's the order. First, the learning rate and the number of trees, because they trade off against each other. Second, tree shape: max depth and min child weight. Third, randomness, meaning row and column sampling. Fourth, regularization. Most of the payoff comes from the first step.

## Segment 3 (code)

Step one, on our illustrative churn data. Fix the learning rate at point one, and let five-fold cross-validation with early stopping choose the tree count. It settled on fifty-eight trees.

## Segment 4 (code)

Step two is a random search. Instead of trying every combination, we sample twenty-five settings from ranges we specify, and score each with three-fold cross-validation on the training data only. The test set stays locked away.

## Segment 5 (code)

Now the honest result. Default settings scored point seven eight eight on the test set. After step one, point eight two seven. After the whole random search, point eight two six. The search added nothing.

## Segment 6 (screenshot)

This is the output of the code above. All twenty-five trials landed between point eight two six and point eight three four, and each one has error bars reaching about nine thousandths either side, from fold to fold. The gaps between the top trials are far smaller than the noise, so the search couldn't tell them apart.

## Segment 7 (steps)

So remember three habits. Tune on training data only, and touch the test set once. Treat differences smaller than fold-to-fold noise as ties. And when scores tie, prefer the simpler model.

## Segment 8 (outro)

Next, a big question: when does boosting beat a random forest?
