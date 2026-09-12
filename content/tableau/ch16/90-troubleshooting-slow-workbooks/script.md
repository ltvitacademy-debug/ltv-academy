# Script — Troubleshooting Slow Tableau Workbooks

## Segment 1 (title)

Every optimization lesson from here starts with the same rule: measure before you optimize. Tableau ships a built-in tool for exactly that — Performance Recording, under Help, Settings and Performance, in Tableau Desktop.

## Segment 2 (screenshot: timeline)

This is a real Performance Recording Timeline, straight from Tableau's documentation. Every recorded event — connecting to the data source, executing a query, generating an extract, geocoding — gets plotted as a bar across elapsed time. That lets you tell a one-time cost, like a slow extract build at load, apart from a recurring one, like a query that reruns every time someone touches a filter.

## Segment 3 (screenshot: events)

This is the Events view — the same recorded events, sorted by duration, longest first. Whatever sits at the top of this list is where your optimization effort actually pays off. A third view, Query, shows the literal query text behind any slow query event.

## Segment 4 (steps: what actually causes slowness)

The recurring culprits fall into a short list: a slow data connection, extract generation, complex calculations recomputing on every render, a dense view with too many marks, or a dashboard loading too many worksheets and filters at once. None of these are guesses — a recording points at each one by name, with a duration attached.

## Segment 5 (outro)

Next lesson turns this diagnosis into action: how to actually optimize extracts, queries, calculations, and dashboards once you know where the time is going.
