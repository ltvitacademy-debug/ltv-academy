You know overfitting from classical machine learning: great on training data, poor on new data. Neural networks are especially prone to it, because a big network has far more parameters than a small dataset has rows.

Here's the signature. Sixty noisy points from a sine wave, and an oversized network: two hidden layers of two hundred neurons. The noise sets a best-possible test error of about zero point two five. With no regularization, the training error drops to zero point zero six, well below that floor. That's a red flag: it's fitting noise.

Add an L2 penalty, called alpha in scikit-learn and weight decay in other libraries. It discourages large weights, which create sharp wiggles. Training error rises a little, to zero point one two, and test error falls from zero point four four five to zero point three four. Averaged over five datasets, zero point four three seven versus zero point three three two.

The chart makes it visible. On the left, the unregularized network wiggles through individual noisy points. On the right, the regularized one follows the underlying sine. A small eight-neuron network also averaged zero point three three two, a reminder that a smaller model is itself a form of regularization.

Early stopping watches a validation set and stops when it stops improving. Here it was mixed: on one dataset it helped, but averaged over five it did badly, because sixty rows leave only twelve validation points, and a noisy dip stops training too early. It works best with enough data.

Dropout randomly switches off a fraction of neurons at every training step, so the network can't lean on any single one. Scikit-learn doesn't offer it, but PyTorch does. Notice the gotcha: in train mode two calls give different answers; call model dot eval before predicting, and they match.

So the checklist: compare training and held-out error, try a smaller model or more data first, add L2, use early stopping when you have the data, and dropout in deep networks.

Next lesson: given all this, when do neural networks actually beat classical machine learning?
