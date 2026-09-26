# Script — Reproducible Environments

## Segment 1 (title)

Your code is in Git and your settings are in a params file. But there is one more input to every training run that neither one records: the environment. The Python version, and every library installed beside your code.

## Segment 2 (steps)

A model is produced by code, data, settings, and the libraries that run them. Change any one of these and the result can change. So the environment has to be written down, rebuilt on demand, and checked.

## Segment 3 (code)

Here is a real failure. Our requirements file pinned scikit-learn and pandas to exact versions, but never mentioned NumPy. So pip installed the newest NumPy, and training crashed with a binary incompatibility error. Even the pip check command said everything was fine.

## Segment 4 (code)

The fix is to pin what your libraries install, too. Keep two files. A short requirements file lists the libraries you chose. A lock file, made with pip freeze, lists every installed package at an exact version. Ours grew from four lines to ten.

## Segment 5 (code)

A lock file you have never used is only a guess. So we built a brand new virtual environment from it and compared. The diff was empty, and training returned the same accuracy, point seven six eight. Run this check in your automation later on.

## Segment 6 (code)

The model file cares, too. We trained under scikit-learn one point one, then loaded the model under one point six. Every step raised a version warning, and predicting failed with an attribute error. Serve a model with the versions that trained it.

## Segment 7 (steps)

Isolate with a virtual environment. Pin direct and transitive dependencies in a lock file. Rebuild from scratch to prove it works. And save a small fingerprint of the versions next to each model. Containers will extend this to the operating system in chapter three.

## Segment 8 (outro)

Next, we tackle the other big input that Git does not hold: the data itself. Lesson six is data versioning.
