Predict who will cancel sounds like a machine learning problem. It is not yet. It is a wish. Before you train anything you must answer questions the request leaves open, and get them wrong and you build a model that scores well and is useless.

Ask five questions. What decision will the prediction change? The retention team will contact a limited number of customers, so we need a ranking. What is the unit? One row per customer. When is the prediction made? At a fixed snapshot, June thirtieth, twenty twenty five. What is the label? A cancellation in the sixty days after. And who is in scope? Only customers still active at the snapshot.

Now write it in SQL. Take the distinct customers, left join the cancellations, drop anyone who cancelled before the snapshot, and label a customer one only when the cancel date falls inside the window, which ends August twenty ninth.

Run it and read the counts. Four thousand distinct customers. Three hundred ten cancelled before the snapshot and are out of scope. That leaves three thousand six hundred ninety active customers, of whom five hundred sixty eight cancel in the window. The baseline churn rate is fifteen point four percent.

Now the snapshot rule, which protects you from leakage. Every feature must be computed from records dated on or before the snapshot. Test it instead of trusting it. There are three hundred seventy one orders dated up to two days after the snapshot. Count them as recent activity and you are using the future. Every feature query filters on the snapshot date, and the cancellations table never appears on the feature side.

Finally, write your assumptions down: the population, the label, the output as a probability used to rank, and an illustrative capacity of about ten percent of active customers per cycle. Send it to the stakeholder and let them correct you in week one, not week six.

Next, in lesson three, you decide how success will be measured and plan the project.
