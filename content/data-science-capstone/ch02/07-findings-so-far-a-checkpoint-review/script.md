Before you build a model, stop and write down what you know. A checkpoint review answers four questions: what did we do, what did we find, what are we unsure about, and what happens next. It is the cheapest quality control in the project.

Start by re-verifying the pipeline with code. One row per customer. Three thousand six hundred ninety active customers. Five hundred sixty eight churners. No future orders. No nulls in the customer fields. All five checks print pass.

Next, put statistical weight behind what you saw. Chi-square tests for the categorical columns, Mann-Whitney tests for the numeric ones. Plan, channel, order rate, tenure, late share, and recent orders are all clearly associated with churn. Region, age, and recent tickets are not. But look at recency: its p-value is under one percent, yet its correlation with churn was only point zero four three. Significant does not mean important.

Now a careful sanity check on value. Customers with over a year of tenure and more than ten percent late or refunded orders number eight hundred seventy four and churn at twenty seven point three percent, above the twenty point eight percent break-even. Under the illustrative economics that nets about four thousand. But it is in-sample, it is more than double our capacity, and the costs are assumed. The honest conclusion is only that continuing is justified.

Log the quirks too. Five thousand seven hundred fifty seven orders are dated after their customer's cancellation. Out of scope, but a real project would tell the data owner.

Then write the memo, and separate what you found from what you do not know. Whether the signals survive in prediction. Whether tenure is a cause or a proxy. How the model behaves on a later period. That separation is what earns a stakeholder's trust.

Next, in lesson eight, Phase two begins: feature engineering and baselines.
