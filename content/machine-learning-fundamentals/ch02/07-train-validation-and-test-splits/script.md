# Script — Train, Validation & Test Splits

## Segment 1 (title)

Chapter two is about preparing data. It starts with a decision you make before fitting anything: which rows are for learning and which are for judging. Get this right and your scores are honest. Get it wrong and they're fiction.

## Segment 2 (steps)

Three sets, three jobs. The training set is what the model learns from. The validation set is where you compare models and choose settings, as often as you like. The test set is a one-time final check. Because you never tuned anything against it, its score is your honest estimate of real-world performance. Sixty, twenty, twenty is a common starting point.

## Segment 3 (code)

train test split only makes two pieces, so call it twice. First carve off twenty percent as the test set. Then split the remaining eighty percent, taking a quarter of it as validation, which is twenty percent of the total. Notice stratify equals y in both calls, and a fixed random state so the split is reproducible.

## Segment 4 (code)

Why stratify? Our illustrative customer table has about nine percent churn. A plain random split gave a test set with thirteen percent churn, a different world from the real nine. The stratified split matched exactly. Across three hundred random seeds, the plain split wandered by two and a half points, while the stratified one never moved.

## Segment 5 (screenshot)

Here's that experiment as a histogram, the output of the code above. The gray bars are plain splits, scattered around the true rate. The red bar is every stratified split landing on the same value. Imbalanced targets are exactly where luck in the split can mislead you.

## Segment 6 (steps)

A random split isn't always right. If you'll predict the future, sort by date and test on the later rows. If one customer has many rows, keep all of their rows on the same side, using group based splitting. And always set a random state, so a changed score means a real change.

## Segment 7 (outro)

Train to learn, validate to choose, test once to confirm. Up next, lesson eight: data leakage, the quiet mistake that breaks the wall between these sets.
