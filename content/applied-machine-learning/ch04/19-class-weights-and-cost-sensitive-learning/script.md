Resampling changes your data to fix an imbalance. There is a gentler option: leave the data alone and change what a mistake costs. Class weights tell the model that missing a rare, valuable case is worse than a false alarm. This is cost-sensitive learning, and in scikit-learn it is often one argument.

Why do models ignore the rare class? Most algorithms minimize a loss that treats every row equally. If ninety-five percent of rows are negative, predicting negative almost every time already gives a low loss and a great-looking accuracy. A weight of five on the rare class makes each of those rows count five times, so ignoring them finally becomes expensive.

Here are three logistic regressions on five thousand illustrative rows, only five percent positive. One has no weights. One uses class weight balanced, which scales each class inversely to its frequency. The last uses a dictionary: weight one for the common class, five for the rare one. You choose the ratio yourself.

Now judge them with real costs. Say a miss costs one hundred dollars and a false alarm costs five. The plain model has the best accuracy, ninety-seven percent, and the worst cost, thirty-seven hundred, because it catches only forty-four percent of positives. Balanced catches eighty-nine percent, and its cost falls to sixteen sixty. Accuracy dropped, but the business result improved.

The chart shows the trade. Precision falls as recall rises, and the cost bar on the right tells you which point is cheapest for these particular costs. Change the costs, and the best weight changes with them.

Some estimators have no class weight option. In scikit-learn one point one, the histogram gradient boosting classifier is one. Use sample weight instead: compute sample weight builds it, and you pass it to fit. In a pipeline, name the final step, then two underscores, then sample weight. And choose any weight or threshold on validation data, never the test set.

Up next, missing data in pipelines: how to fill gaps safely without leaking information.
