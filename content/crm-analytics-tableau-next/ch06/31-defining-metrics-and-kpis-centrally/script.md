The most important thing a semantic layer defines is the metric. The named number the business actually steers by, like closed won revenue or win rate. Define it centrally once, and every dashboard shows the same number.

In Tableau Next a metric is a measure tracked over time. You create it in the semantic model builder by choosing New, then Metric. The first part is Details. Give it a name, and write a description. The builder's own hint says the description makes the metric discoverable, so treat it as a governance tool, not a formality.

Next is Value. Pick the required measure, add an optional filter, and choose the required time dimension. Then add the dimensions people can slice it by. This real example tracks a revenue measure by reservation date, with city, brand, and owner as breakdowns. A third part, Insights, adds optional automated trend and contributor analysis.

Before you open the builder, write the definition in words. This is an illustrative spec. A name, a measure, a filter, a time dimension, and an owner. If you cannot fill in those lines, the metric is not ready. Most metric disputes are really unwritten definition disputes.

Follow four habits. Use a consistent naming convention. Put the owner and any exclusions in the description. Reference logic instead of copying it. And if someone needs a variation, create a separate, clearly named metric rather than quietly changing the original.

Defined centrally, a metric becomes a shared language for the whole team. Next up: metric governance, who owns these definitions and how they change.
