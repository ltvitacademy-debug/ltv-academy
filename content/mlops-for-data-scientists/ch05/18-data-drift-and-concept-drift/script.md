Welcome to lesson eighteen. A model is trained on a snapshot of the world, and the world keeps moving. Nothing crashes when that happens. The model just quietly gets worse. Let's learn to catch it.

There are two kinds of drift. Data drift means the inputs changed, so production features no longer look like the training features. You can spot it without labels. Concept drift means the relationship between inputs and the outcome changed, and only labelled outcomes reveal it. Use input checks as an early warning, then confirm with outcomes.

The Population Stability Index cuts the training values into ten quantile bins, then compares the share of training rows and live rows in each bin. The larger the gap, the larger the score. The Kolmogorov-Smirnov test from scipy compares the two distributions directly and gives a statistic and a p-value. Both take just a few lines of numpy.

Here is a simulated production batch of two thousand customers after an app change. Four features are quiet. Sessions and days idle are loud, with P S I of point four and point nine. A common rule of thumb calls anything above point two five significant. It is only a convention, and big samples make K S p-values overreact.

The chart makes the shift easy to see. On the left, the days idle distribution has moved. On the right, only two features cross the alarm lines.

Now the key comparison: one model, three batches. On data like training, A U C is point seven five four. On the data drift batch it is point seven two eight, so the inputs moved a lot yet the ranking mostly survived. On the concept drift batch, every P S I is under point zero one, but the A U C collapses to point four seven four, worse than a coin flip. A quiet drift report does not mean a healthy model.

Next, we build the outcome side: performance monitoring and alerting.
