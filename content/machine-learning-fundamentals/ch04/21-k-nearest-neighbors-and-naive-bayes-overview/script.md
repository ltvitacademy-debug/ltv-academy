You have met linear models, trees, and forests. Two more classic algorithms round out the toolbox: k-nearest neighbors and naive Bayes. They think about prediction in completely different ways, and both make fast, honest baselines.

k-nearest neighbors barely trains at all. It memorizes the training rows. To predict for a new row, it finds the k closest training rows and lets them vote. Four of the five nearest customers churned? Predict churn. For regression, it averages the neighbors instead.

Closest means smallest distance across every feature, and that creates a trap. On our illustrative dataset, one feature is multiplied by a thousand. Unscaled, k-NN scores zero point four five three on the test set, no better than a coin flip. Put a standard scaler in a pipeline, and the same model scores zero point nine.

Then there is k itself. With k of one, the model scores a perfect one on training but only zero point nine on test, a classic overfit. At fifteen, training is zero point nine one and test is zero point nine three, a much healthier gap. Tune k the way you tune anything: compare validation scores.

Naive Bayes multiplies evidence using Bayes' rule. The naive part is assuming features are independent once you know the class. That is rarely true, yet the model trains almost instantly, scores zero point nine one here, and returns real probabilities. The multinomial variant is a long-time favorite for spam filtering and text.

So: k-NN votes among neighbors, so scale your features and tune k. Naive Bayes multiplies probabilities and is fast with little data. Next, we leave labels behind and start finding structure on our own, with clustering.
