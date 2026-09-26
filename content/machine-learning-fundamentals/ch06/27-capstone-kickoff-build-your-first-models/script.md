You have learned the parts of machine learning. Now you put them together. The capstone is one guided project in three lessons: frame the problem, build and compare models, then evaluate honestly and present the result. Today is the kickoff.

The brief: a subscription company is losing customers and wants to know who is likely to leave, so retention can reach out first. That is binary classification. Because about a third of customers churn, accuracy misleads, so we track ROC AUC, then precision and recall. The plan: split first, set a baseline, compare models with cross-validation, and touch the test set once.

The data is illustrative and synthetic: two thousand customers from a fixed seed, with tenure, monthly charges, support calls, contract, and autopay. Sixty four monthly charges are missing, and the churn rate is zero point three four four. About one in three leaves.

Two business questions first. Month-to-month customers churn at forty six percent, against twenty five percent on one-year contracts and fourteen percent on two-year. Churners have about fifteen months of tenure against twenty six for stayers, and more support calls. Those are patterns a model should find.

Here are the same patterns as charts. Churn falls steeply with longer contracts, and churners pile up at short tenures. The tall bar at seventy two is an artifact of our generator, which caps tenure. Output of the code above.

Now split, stratified, so the churn rate matches in both sets: sixteen hundred rows to train, four hundred to test. Then the baseline, a dummy model that predicts stayed for everyone. It gets zero point six five five accuracy but a ROC AUC of exactly zero point five, which is chance. That is the bar to beat.

Everything from now on fits on the training set only, and the test set stays sealed. In the next lesson, you build the preprocessing pipeline and compare three models.
