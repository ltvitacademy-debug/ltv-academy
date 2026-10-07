# Script — AllReduce & AllGather, Conceptually

## Segment 1 (title)

Lesson seven named the collectives NCCL provides. This lesson opens up the most important one, ring AllReduce, step by step, and contrasts it with the tree algorithm NCCL sometimes uses instead.

## Segment 2 (steps)

Ring AllReduce has two phases. In scatter-reduce, each GPU splits its data into pieces and passes them around a ring, reducing as it goes — after N minus one steps, every GPU holds one fully-reduced piece of the total. In all-gather, those pieces circulate around the ring again so that after another N minus one steps, every GPU has collected every piece — ending with the complete, identical result everywhere.

## Segment 3 (code)

That two-phase structure is exactly why ring AllReduce is called bandwidth-optimal. Each GPU moves roughly two times N minus one over N times its share of the data — and as N grows large, that approaches a constant, two times the data size, independent of how many GPUs are involved. The total data any one GPU has to move doesn't blow up as the cluster grows.

## Segment 4 (steps)

Where ring loses is latency. It needs two times N minus one total communication steps, each with its own fixed overhead — negligible at small N, but it adds up at very large N. That's why NCCL can switch to a tree algorithm instead, cutting the step count down to roughly log of N, trading a little extra bandwidth for much lower latency at scale. NCCL_ALGO is the variable that controls this choice.

## Segment 5 (outro)

Scatter-reduce then all-gather — that structure is why ring AllReduce's per-GPU bandwidth stays flat as GPU count grows. Up next, lesson nine: comparing the two fabrics these collectives actually run over, InfiniBand and Ethernet.
