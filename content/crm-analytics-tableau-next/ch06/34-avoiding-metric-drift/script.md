A metric rarely fails all at once. It drifts. Two dashboards that agreed in January differ by three percent in June, and nobody can say when or why. This lesson closes the chapter with how to spot drift, prevent it, and catch it early.

Four causes account for most drift. Copied logic, where someone duplicates a calculation and tweaks a filter. Silent redefinition, where an editor changes a metric without telling anyone. Source changes, like a renamed picklist value or a new stage. And ambiguous time, such as fiscal versus calendar, or close date versus created date.

Prevention is mostly design. Keep one definition and reference it rather than copying it. State the filters, exclusions, and time dimension in the description. Give separate meanings separate metrics. Keep the editor role rare, and announce every change with an effective date.

Detection is a reconciliation. Compare the metric against an independently computed source. This SOQL query sums the amount of closed won opportunities in the current fiscal quarter. If the metric for the same period does not match, drift has crept in, and the difference points to the cause. Note the refresh time, since sync timing can also explain gaps.

Make it routine. Reconcile your top metrics on a schedule, and after any release that touches stages or fields. Keep a short change log. And retire old copies, because a dashboard nobody trusts competes with the one everybody should.

That completes the semantic modeling chapter. Define once, govern deliberately, and reconcile often. Next up: integrating Salesforce with a data warehouse.
