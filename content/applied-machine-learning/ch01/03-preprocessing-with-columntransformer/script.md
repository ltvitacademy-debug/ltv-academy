# Script — Preprocessing With ColumnTransformer

## Segment 1 (title)

Real tables mix column types. Numbers need imputing and scaling. Categories need imputing and one-hot encoding. Slicing columns, transforming each, and gluing them back together by hand is slow and error-prone. ColumnTransformer does it in one object.

## Segment 2 (steps)

The idea is simple: declare which recipe applies to which columns. Numeric columns get a median imputer and a scaler. Category columns get a most-frequent imputer and a one-hot encoder. The transformer applies each recipe to its columns, then stitches the results back together.

## Segment 3 (code)

Here we build two small recipes with make pipeline, which just means do these steps in order. Then ColumnTransformer takes a list of name, transformer, and columns. Fit transform on the training set gives seven hundred fifty rows and eleven columns: four numeric, three for plan, four for region.

## Segment 4 (code)

The output is a NumPy array, so we ask for get feature names out to recover the meaning of each column. The prefix is the recipe name we chose. That's essential later, when we interpret coefficients and feature importances.

## Segment 5 (code)

What if production data has a region the training set never saw? A default encoder would crash a live scoring job. With handle unknown set to ignore, the unknown region simply becomes all zeros. Also remember, columns you don't mention are dropped by default. Use remainder equals passthrough only on purpose.

## Segment 6 (steps)

A few habits to keep. List every column explicitly so nothing is dropped by accident. Set handle unknown to ignore for categories. Use make column selector for wide tables, but check the output names, because a code stored as a number is still numeric. And always fit on training data only.

## Segment 7 (outro)

We now have a preprocessor and a model, but still two objects to keep in sync. Next up, pipelines.
