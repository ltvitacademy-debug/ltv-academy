# Script — Spot & Preemptible Instances

## Segment 1 (title)

On-demand H100 capacity is expensive and sometimes scarce. Spot instances and preemptible VMs offer the same hardware at a steep discount, with one catch — the provider can take them back on short notice. For a run depending on five hundred twelve GPUs staying up together, that trade-off needs careful handling, not blind adoption.

## Segment 2 (steps)

Spot and preemptible capacity typically costs sixty to ninety percent less than on-demand, because the provider is selling capacity it would otherwise leave idle. AWS gives roughly a two-minute interruption notice before actually reclaiming an instance. GCP's window is tighter, around thirty seconds. Either way, that's too short for any human to react — whatever happens next has to be automated.

## Segment 3 (code)

A background thread polls the instance metadata endpoint for that notice, and the moment it sees one, it triggers an emergency checkpoint save immediately, rather than waiting for the normal five-hundred-step interval. Two minutes is usually enough time for a parallel sharded save to finish — but it's tight, which is one more reason the normal checkpoint interval can't be pushed out too far.

## Segment 4 (steps)

The one node that can't just live on spot is the Master. It anchors the rendezvous address and drives checkpoint writes — if its node gets reclaimed, the whole job loses its coordination point, not just one worker's GPUs. Solara keeps the Master on an on-demand node for exactly that reason, while Worker replicas, individually replaceable, run on spot where the discount actually pays off.

## Segment 5 (outro)

Spot capacity cuts cost dramatically but demands a fast, automated reaction to a short window, and Solara's Master-on-demand, Workers-on-spot split keeps the savings without betting the whole job on reclaimable hardware. Next up, lesson twenty-two: elastic training.
