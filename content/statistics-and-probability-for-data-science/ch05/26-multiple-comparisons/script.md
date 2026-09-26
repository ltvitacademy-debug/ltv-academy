One test at alpha point oh five has a five percent chance of a false alarm when nothing is going on. But real analyses rarely stop at one test. An A/B test reports twenty metrics. A marketing analysis slices results by ten segments. Every extra test is another lottery ticket.

Run twenty independent tests where every null is true, and the chance at least one is significant is one minus point nine five to the twentieth, about sixty-four percent. Almost guaranteed. This is the multiple comparisons problem.

A simulation confirms it. A thousand experiments, each testing twenty metrics that truly don't differ. About sixty-two percent produced at least one significant result, close to the formula. That's how teams end up celebrating a lift that was really luck.

Now a realistic case: twenty metrics, six that truly move and fourteen that don't. Uncorrected testing flags eight metrics, and two are false alarms. In real life, you wouldn't know which.

Three corrections. Bonferroni tests each hypothesis at alpha divided by the number of tests. Holm walks the sorted p-values with a gradually easing threshold, and is never less powerful. Both control the chance of any false discovery. Benjamini-Hochberg controls the false discovery rate, the expected share of discoveries that are false, and keeps more power.

Results: Bonferroni and Holm removed both false alarms and found five of six real effects. Benjamini-Hochberg found all six with no false alarms. Stricter control means more missed effects, and this is one illustrative run, not a general ranking. The best defense is prevention: choose your primary metric before the test, count every test you run, and treat exploratory findings as hypotheses to confirm.

That completes the hypothesis-testing chapter. Next: correlation, and the difference between correlation and causation.
