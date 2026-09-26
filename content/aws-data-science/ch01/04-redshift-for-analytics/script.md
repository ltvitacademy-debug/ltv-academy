In many companies the cleanest data lives in a warehouse, and on AWS that is often Amazon Redshift. The Data Engineer path covers how it is built. Here we ask a data scientist's questions: how do I build features without leaking the future, and how do I get data out for a model?

Suppose you want to predict who stops ordering in the first half of 2024. Features must come only from before a cutoff date, and the label from after it. This join counts each customer's orders and spend before January first. The cutoff lives in the join condition, so customers with no earlier orders still appear, with zeros. I ran this on a local stand-in.

Here is why it matters. A logistic regression on those features scored an AUC of zero point seven seven five. Adding a feature that peeked at 2024 orders jumped the score to a perfect one point zero. A perfect score is a red flag, not a triumph. Ask of every feature, would I have known this on the cutoff date?

To get data out, the Redshift Data API runs SQL over a secure HTTP endpoint, with no drivers or open connections. Calls are asynchronous, so you start a statement, then poll its status. This is illustrative and not run here.

For training data, use UNLOAD to write query results to S3. The query is wrapped in single quotes, and the default output is pipe-delimited text, so ask for Parquet explicitly.

Redshift ML goes further. CREATE MODEL trains a model from a table, using SageMaker AI behind the scenes, and gives you a SQL function to predict with. Training has extra cost, which you can limit with settings. It suits quick baselines.

For full control, use SageMaker directly, which we start in Chapter 2. First, Lesson 5 covers the IAM roles that make all of this work securely.
