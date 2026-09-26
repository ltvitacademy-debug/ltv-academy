If a model sees only a handful of positives, it has little to learn from. Resampling rebalances the training data. It is easy to do and just as easy to do wrongly, so we will focus on doing it safely.

There are three main methods. Random undersampling drops majority rows until the classes match. Random oversampling copies minority rows. SMOTE creates new minority rows: it takes a minority point, picks one of its nearest minority neighbors, and adds a point somewhere on the line between them.

With the imbalanced learn package, every sampler has fit resample. Our training set has thirty-five fifty-three negatives and one hundred ninety-seven positives. SMOTE grows the positives to thirty-five fifty-three. Undersampling shrinks the negatives to one ninety-seven, throwing away over three thousand rows.

Now the trap. The tempting workflow is to resample the whole training set, then cross validate. Instead, put SMOTE inside an imblearn pipeline. The pipeline resamples only the training part of each fold, and validates on real, untouched rows.

The difference is dramatic. With a random forest, resampling first gives recall of point nine eight three and average precision of point nine nine nine, nearly perfect. Done correctly, recall is point eight eight eight and average precision point nine two seven. The wrong version leaked, because synthetic points are built from real ones, so validation folds held near copies of training rows.

Now compare strategies on the held-out test set, which is never resampled. Undersampling gets the highest recall, point eight four eight, but precision falls to point six eight three. SMOTE reaches point eight, with precision still point nine three. Notice average precision barely moves. Resampling mostly slides you along the precision recall curve.

Here are recall and precision side by side for all five strategies. Pick the trade-off that matches your costs. And remember: resample inside the pipeline, never on validation or test data.

Up next, class weights and cost-sensitive learning: a gentler fix that leaves the data alone.
