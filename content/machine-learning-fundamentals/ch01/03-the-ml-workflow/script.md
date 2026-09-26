# Script — The ML Workflow

## Segment 1 (title)

Beginners picture machine learning as pick an algorithm, call fit, done. In real projects the algorithm is a small part of the work. This lesson gives you the map of the whole workflow, so every later lesson has a place to sit.

## Segment 2 (steps)

The first half happens before any model. Frame the problem: what decision will this prediction support, and what metric defines success? Get and explore the data, which you already know how to do from the EDA course. Then prepare it: split, clean, encode, scale, and engineer features. That's chapter two of this course.

## Segment 3 (steps)

The second half is the model and what surrounds it. Train a simple baseline first, then real algorithms. Evaluate on data the model has never seen, and study where it fails. Finally deploy and monitor, because performance drifts as the world changes. The real workflow loops. A poor evaluation sends you back to the data.

## Segment 4 (code)

Here's a minimal honest loop on the breast cancer dataset. Split with stratify, so both sets keep the class mix. Then fit three models on the training rows only: a dummy baseline that always guesses the majority class, a logistic regression, and a random forest. Score each on the held-out test set.

## Segment 5 (code)

The baseline scores sixty-three percent, just by always saying benign. Both real models reach ninety-six percent. Without the baseline, you couldn't tell how impressive that is. And the tie is a reminder that one number isn't the whole story. For a medical screen, the type of error matters as much as the total.

## Segment 6 (screenshot)

Here are those scores as a chart, the output of the code above. One rule to keep: the test set is a one-shot exam. If you tune against it, it stops being honest. Experiments belong on a validation set, which lesson seven covers.

## Segment 7 (outro)

Set the metric and baseline first, split before you experiment, and trust only scores from unseen data. Up next, lesson four: bias, variance and generalization.
