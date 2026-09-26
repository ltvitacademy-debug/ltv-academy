Welcome to the capstone. You have learned the scikit-learn workflow piece by piece. Now you put it all into one project, and the key word is defend. Anyone can call fit. A data scientist can explain every choice.

The brief is a subscription service where about one customer in nine cancels each month. The retention team wants a ranked list of likely cancellers. The two errors cost differently. For illustration, an offer costs ten units, and a missed cancellation costs one hundred.

The data is six thousand seeded, illustrative customers, saved in a file called capstone data dot py, with a few missing values. The cancel rate is zero point one one one. We split off twenty percent with stratification, giving four thousand eight hundred training rows and twelve hundred test rows, and the test set stays sealed.

Now the floors to beat. A dummy model that predicts stayed for everyone gets zero point eight eight nine accuracy, which sounds great and is worthless. Its ROC AUC is zero point five, and its average precision equals the cancel rate. Contacting nobody costs about eleven thousand one hundred per thousand customers; contacting everybody costs ten thousand. Our model must beat ten thousand.

A quick look at the training data. Basic plan customers cancel most, and cancellation rises sharply once a customer has been idle for more than two weeks. That kink may be hard for a straight line to capture, which sets up a fair contest between models. Output of the code above.

Before modeling, write your success criteria. Average precision is the main metric, with ROC AUC alongside. Validate with stratified cross-validation on training data only. The chosen threshold must beat both cost baselines. And every fitted step lives inside a pipeline. Written first, these stop you moving the goalposts.

Next, in lesson twenty six, you build the pipeline, compare models, handle the imbalance, and tune.
