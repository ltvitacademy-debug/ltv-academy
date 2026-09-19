# Script — Data Compression & Storage Optimization

## Segment 1 (title)

Compression isn't free -- it's a trade. Smaller pages mean less I/O and better buffer-pool efficiency, but every read and write now pays a CPU cost to decompress and recompress the data.

## Segment 2 (code: ROW vs PAGE compression)

ROW compression drops unused bytes from fixed-length columns -- a lighter CPU cost, smaller savings. PAGE compression does everything ROW does, plus prefix and dictionary compression at the page level -- more space saved, more CPU spent reversing it on every read.

## Segment 3 (code: estimate before you commit)

sp_estimate_data_compression_savings tells you the size before and after compression without actually applying it. Run this before committing CPU cycles to a rebuild that might not be worth it.

## Segment 4 (steps: when it's worth it)

Large, cold, mostly-read tables on an I/O-bound server are the clear win for PAGE compression. Small, frequently-updated tables on an already CPU-constrained server are exactly where compression can make things worse.

## Segment 5 (outro)

Trade CPU for I/O, and only where the data's access pattern makes that trade pay off. Next up: database sharding and horizontal scaling -- splitting one dataset across multiple databases entirely.
