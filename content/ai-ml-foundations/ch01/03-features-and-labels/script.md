# Script — Features & Labels

## Segment 1 (title)

Picture a spreadsheet of past customers, one row each. Every column but the last describes that customer — tenure, support calls, plan. The last column records what actually happened: did they cancel. That last column is special, and today we give it a name.

## Segment 2 (code)

In ML terms, every input column is a feature — a piece of information the model is allowed to use. The last column, churned, is the label: the answer the model is trying to predict. A row's full set of feature values is called a feature vector.

## Segment 3 (steps)

So: a feature is a column the model may use. A label is the column it's predicting. And a feature vector is just one row's worth of features.

## Segment 4 (code)

In practice you split the table into X and y before training. X is a two-dimensional table of every row's features. Y is a one-dimensional column of every row's label. You'll see this exact split in almost every ML codebase you ever read.

## Segment 5 (steps)

Features come in different flavors. Continuous numbers like monthly spend. Discrete counts like support calls. And categorical values like plan type, which most algorithms need converted to numbers first — we'll cover exactly how in chapter three.

## Segment 6 (outro)

Here's the detail that trips people up: the label only exists in training data, because that's the data where you already know the outcome. At inference time you have the features but not the label — the model's whole job is filling that in. Next, we'll look at what happens when a model learns the training data's quirks too well.
