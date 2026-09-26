Someone will ask what the model is looking at, and why a given customer is on the list. This lesson explains our logistic regression three ways, and then tests the puzzle from lesson six instead of repeating it.

Way one: coefficients. Because the inputs were standardized, they are comparable. Customers who order steadily are safer. A higher share of late or refunded orders raises risk. The Family plan is safer, Basic and Premium are riskier, and so are social signups.

Way two: permutation importance. Shuffle one column of held-out data and see how much average precision drops. The chart shows both views. Order rate and tenure dominate, each costing about point oh nine. Region, age, and recent tickets add nothing, just as lesson seven predicted.

Now the puzzle. Longer tenure means higher churn, the opposite of the usual assumption. Our hypothesis: long-tenured customers have simply had more chances to be let down. So we test it. Tenure correlates point seven with the cumulative count of late or refunded orders. Add that count as a feature, using cross-validation on training data only, and average precision rises from point three two five to point three four five, better in fourteen of fifteen folds. Tenure drops out of the top coefficients. That supports the hypothesis. It does not prove late deliveries cause cancellations, and because we found the feature after looking, it is a candidate for version two, not a quiet upgrade.

Way three: SHAP. It splits one customer's prediction into contributions from each feature. For customer three thousand five hundred ninety-two, predicted point two seven nine against a base of point one three four, a low order rate adds the most risk, while a short tenure and clean deliveries pull it down.

Remember what explanations can claim. They describe what the model uses, not what causes churn. Correlated features share credit. Next, we package the model.
