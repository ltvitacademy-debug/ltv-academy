# Script — Model Versioning

## Segment 1 (title)

Three months from now, a colleague will ask: which churn model did we ship in June, what data trained it, and how good was it? If the answer is probably churn final v3, you cannot debug it or roll back to it. Let's version the model properly.

## Segment 2 (steps)

A model version is more than a file. It is the file, a fingerprint of its bytes, the hash of the training data, the settings and library versions, and the evaluation metrics. Write all of that down next to the model.

## Segment 3 (code)

The fingerprint is a SHA-256 hash of the file. The model id is just its first twelve characters. We save it, along with everything else, in a small JSON file beside the model, called a sidecar.

## Segment 4 (code)

Here is the real sidecar for our first model. It names the model id, the data hash from last lesson, the setting C equals one, an AUC of point seven nine nine, and the Python and scikit-learn versions. It is plain text, so Git can track it.

## Segment 5 (code)

We trained twice with the same setting and got the same hash both times. Changing C to point one produced a different one. That is reassuring, but not guaranteed in general, so treat the hash as the identity of a file, and the sidecar as the record of how it was made.

## Segment 6 (code)

The model file is binary and changes on every retrain, so it follows the data workflow. Add it to DVC, commit the pointer and the sidecar, then tag the commit, model v1. After retraining, we tagged model v2. Git now shows exactly what differs between them.

## Segment 7 (code)

To roll back, check out the old pointer and sidecar from the tag, then run dvc checkout. Before serving, verify. Our loader recomputes the hash and checks the library version. Adding a single byte to the file made it fail loudly, which is what you want.

## Segment 8 (outro)

Doing this by hand teaches the idea. Next, lesson eight: experiment tracking with MLflow, which records all of it automatically.
