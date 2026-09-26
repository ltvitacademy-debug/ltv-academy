Deploying a model is not the finish line. The world keeps moving. Customers change plans, prices rise, an upstream team renames a column. Nothing crashes, and the endpoint keeps returning success. The predictions just quietly get worse. Monitoring is how you notice.

Azure Machine Learning monitoring works in three steps. It computes the baseline distribution of each feature from your reference data, usually the training set. It computes the distribution of the latest production values. Then it compares them, and if the score crosses a threshold you set, it alerts you.

You choose signals. Data drift watches the inputs. Prediction drift watches the outputs. Data quality catches nulls and out-of-range values. Performance signals need ground truth, which often arrives late, so drift is your early warning.

These metrics are not magic. Population Stability Index bins the reference data, compares the share of production rows in each bin, and sums the weighted log ratio. Here are the core lines.

I ran it on synthetic data. A production week that looks like training scores a P S I of about point zero one. A week where spend rose and plan mix shifted scores point five seven, and the K S and chi-squared p-values collapse to zero. My version is a teaching implementation, so Azure's numbers may differ.

Two settings matter. The lookback window says how much production data each run examines, and the reference window should not overlap it. For batch endpoints, remember that you must collect the production data yourself.

In the SDK you define a spark compute, a monitoring target, an alert, and a recurring schedule. That code is illustrative, since we have no Azure account here, so check the current docs for exact names.

Next: Responsible A I tooling.
