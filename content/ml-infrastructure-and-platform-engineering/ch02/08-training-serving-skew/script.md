# Script — Training/Serving Skew

## Segment 1 (title)

This lesson has been promised since lesson five: training-serving skew, named directly, with the specific mechanism that causes it and the specific technique a feature store uses to prevent the most common form of it.

## Segment 2 (steps)

Skew comes from three distinct places. Code duplication is lesson five's core problem — training and serving code are two separate implementations of the same logic that drift apart over time. Time travel, or data leakage, happens when a training set is built using a feature's current value instead of its value at the moment the label's event actually happened, leaking future information into training. And infrastructure differences are subtler — like a training pipeline filling missing values with a historical mean, while serving fills them with zero because it doesn't have that context in real time.

## Segment 3 (steps)

Here's the leak in concrete terms. Say you're training on a ride from three months ago, and you join today's current value of a driver's average daily trips onto that historical row. The model is now training on three months of future driving activity baked into a feature for a past event. That inflates offline accuracy in a way that can never be reproduced at serving time, when the model only has access to what's true right now.

## Segment 4 (code)

A point-in-time join fixes this by matching each historical event to the feature value as of that event's own timestamp, not the feature's current value. Feast's get_historical_features does this automatically — for each row in the entity dataframe, it looks up the value that was correct as of that exact timestamp, never a later one, no matter how much more recent data exists. That's the single most important guarantee a real feature store gives you over a hand-rolled join.

## Segment 5 (outro)

Skew is detectable even before it shows up as a performance drop — log what serving actually used, and periodically compare it against what the offline pipeline would compute for the same entity and timestamp. A persistent difference is skew. Up next, lesson nine: feature versioning and lineage, tracking exactly which definition produced which result.
