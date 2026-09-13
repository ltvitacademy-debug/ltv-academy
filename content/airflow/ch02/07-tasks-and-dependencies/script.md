# Script — Tasks & Dependencies

## Segment 1 (title)

You already saw hello shift-shift world in Lesson 6. The rule is simple — a shift-shift b means a must finish before b starts. It also works backwards, b reverse-shift a, written the other way round.

## Segment 2 (code: fan-out/fan-in)

Dependencies aren't limited to one-to-one. Extract, shift-shift, a list of transform_orders and transform_customers, shift-shift, load. Extract must finish before both of those start — they run in parallel with each other — and load waits until both of them finish.

## Segment 3 (steps: the methods underneath)

Shift-shift and its reverse are shorthand for two methods you'll see in Airflow's own documentation — set_downstream and set_upstream. You'll almost always use the operators, but recognizing this vocabulary matters: upstream means finishes first, downstream means waits.

## Segment 4 (screenshot: a real failure propagating)

Here's a real run with this exact shape. One task actually failed — everything downstream of it never even attempted to run, and it's marked upstream_failed, not failed. Airflow is telling you the real cause is upstream, so when you're debugging you go straight to the one task that broke.

## Segment 5 (outro)

Next lesson: PythonOperator — wrapping any Python callable as a task.
