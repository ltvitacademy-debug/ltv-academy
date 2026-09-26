You know the tools now. This lesson is about how they go wrong, even in careful hands. These are protocol errors, not arithmetic errors, and each one shows up in a few lines of Python.

First, peeking. You launch an A/B test, check the p-value every day, and stop the moment it dips below point oh five. Every look is another chance for noise to cross the line. We simulated an A/A test, with no real difference, two thousand times. With one planned look, about four percent came out significant, close to alpha. With ten looks, about twenty percent did. A fixed-sample test is only valid at its planned end.

Second, Simpson's paradox. Treatment converts better on desktop, twenty-two percent versus twenty, and better on mobile, five percent versus four. Yet overall it loses, eight point four percent versus sixteen point eight. Why? Most treatment users were low-converting mobile visitors. An uneven mix of segments can reverse a trend. In a properly randomized test the mix should be balanced, so an imbalance is a signal to investigate.

Third, regression to the mean. We picked the top ten percent of a thousand units in year one. They averaged about one twenty-four. In year two, with no intervention, the same units averaged about one twelve. Their first score was part skill and part luck, and luck does not repeat. Any program applied to that group would look like it worked.

Finally, a few more traps. Test twenty metrics at point oh five and the chance of at least one false positive is about sixty-four percent. Survivorship bias hides everyone who left. Rare events fool accurate tests, which is base rate neglect. And with enough users, trivial effects become significant.

The habit: decide the metric and stopping rule first, check balance, report intervals, and count what you tested.

Next up, the capstone kickoff.
