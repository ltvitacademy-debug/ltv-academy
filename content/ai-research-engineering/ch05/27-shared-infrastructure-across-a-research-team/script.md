# Script — Shared Infrastructure Across a Research Team

## Segment 1 (title)

Every piece of infrastructure in this chapter exists as a shared resource the moment more than one person uses it. Shared resources need explicit norms, not because researchers are careless, but because a norm obvious to whoever set up the infrastructure is invisible to everyone who joined after.

## Segment 2 (steps)

A cluster without agreed naming conventions doesn't crash, it just becomes slowly unusable. Generic job names pile up in the queue with no way to tell them apart. Generic checkpoint filenames get silently overwritten by the next run. None of this throws an error — it just makes the shared infrastructure progressively harder to use.

## Segment 3 (code)

Checkpoints accumulate fast enough to fill a shared quota within weeks if nothing is ever deleted. An explicit retention policy — keep the best and latest, delete the rest after 30 days unless tagged keep — prevents both silently running out of space and someone deleting a file another person still needed.

## Segment 4 (code)

A naming convention for jobs and tracking runs costs nothing extra to follow and makes shared resources navigable at scale. The real test is whether it's written down somewhere discoverable, like a short infrastructure doc in the team's repo, rather than living only in the memory of whoever set things up.

## Segment 5 (outro)

That closes Chapter 5 — cluster basics, Slurm, Kubernetes, data versioning, and now the team norms that keep it all usable as more people share it. Next, Chapter 6: debugging research code, starting with silent bugs versus loud bugs.
