Real datasets have gaps: a skipped form field, a dropped sensor reading, a join that found no match. Most scikit-learn models raise an error the moment they see a not-a-number value. The question is not only how to fill a gap, but where in your workflow to do it. Inside a pipeline, imputation is repeatable and leak-free.

First, look before you fill. On our fifteen hundred illustrative customers, eighteen percent of monthly charges are missing. And those customers churn at fifty-seven percent, versus twenty-five percent for everyone else. The fact that a value is missing carries signal. Dropping every row with a gap would also throw away four hundred twenty-three customers.

Now fill inside the pipeline. Give the numeric columns a simple imputer using the median, then scale them. Give the categorical column its most frequent value, then one-hot encode it. Because the imputer lives inside the pipeline, each cross-validation fold learns its fill values from its own training rows only, so no information leaks from the test fold.

Compare strategies with the same cross-validation. The median and a nearest-neighbors imputer both score about zero point seven six AUC. Add missing-value indicator columns, and the score jumps to zero point seven nine eight. The model can finally see the was-missing flag that carried the churn signal. That is one argument, add indicator equals true.

The chart puts the three scores side by side, with the fold-to-fold spread as error bars. The indicator version clearly separates from the other two.

Two more options. Dropping rows is tempting, but you lose data now and every future row that has a gap, and its score is measured on a different, easier set of rows, so it isn't comparable. And histogram gradient boosting accepts missing values natively, so some tree models let you skip imputation. Either way, measure first, impute inside the pipeline, and compare fairly.

Up next, the Applied Projects chapter begins with a churn prediction walkthrough.
