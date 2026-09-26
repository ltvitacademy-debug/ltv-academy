Welcome to the final lesson of the course. You have six working stages. Now we run them as one lifecycle, break them on purpose, and package the result.

One command runs everything. The first model is trained, gated, registered, contract tested, and promoted. Then eight simulated weeks arrive. Input drift appears in week three, and the pipeline only says investigate, because performance is holding. By week six the A U C has fallen below the floor twice in a row, and the decision becomes retrain.

The retrained candidate scores point five nine three, better than the champion on the same newer weeks, but far below the floor. So the gate refuses to ship it, and a person must investigate. Then a scheduled refresh on fresh data scores point seven eight against the champion's point seven eight nine. That is inside the tolerance, so it is promoted, and version one stays available for rollback.

Here is the chart from that log. Output of the code above.

A safety check you have never seen fail is only a guess, so we break the pipeline twice. Shuffled training labels give an A U C of point four five six, and the gate blocks the model with three reasons. A serving bug that returns percentages instead of probabilities is caught by the contract test. The champion never moves.

The workflow file would run the same commands on GitHub. It parses as valid YAML, but it was not run on GitHub here. Check current action versions before using it.

Be your own reviewer: the data is synthetic, the registry is a local folder, and the server has no authentication.

To present the project, lead with a README, show the failures the gates caught, attach the model card, and mark what is illustrative.

That completes MLOps for Data Scientists. Next in the path is the Data Science Capstone, where you take a messy business dataset from problem to presentation.
