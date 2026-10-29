# Lesson 21 — Where Data Gravity Actually Decides Your Architecture

**Chapter 6 · Data Architecture Across Hybrid and Multi-Cloud · Lesson 21 of 32**

## What you'll learn

- What **data gravity** actually means, and why it isn't a metaphor you
  can argue your way around
- Why moving compute to data is almost always cheaper and faster than
  moving data to compute, once a dataset is large enough
- How egress pricing and transfer time turn a "we'll stay cloud-agnostic"
  policy into "all our new workloads keep landing in AWS, because that's
  where the data already is"
- How to use data gravity deliberately — deciding where a large dataset
  should first land, instead of discovering its pull after the fact

## Data gravity: the term and the mechanism

**Data gravity** is a term coined by Dave McCrory in 2010 to describe a
real, observable tendency: as a dataset grows, applications, services,
and analytics tools are pulled toward it — the same way mass attracts
mass. It is not a preference anyone chooses. It's a consequence of two
plain facts: large datasets are expensive and slow to move, and compute
is comparatively cheap and fast to move. Given that asymmetry, the
economical direction is almost always to bring the processing to where
the data already sits, not the other way around.

This matters enormously in hybrid and multi-cloud architecture because
it quietly overrides architectural intentions. A company can adopt a
clean, stated multi-cloud strategy — "we standardize compute on Azure,
regardless of which cloud a service lives in" — and still watch every
new analytics workload get built in AWS instead, for one simple reason:
the company's core transactional data has been accumulating in S3 for
six years, and nobody is going to pay to move petabytes of it just to
satisfy a standardization preference.

## Why moving the data costs more than moving the compute

Three forces drive this, and all three get worse as data volume grows:

1. **Egress cost.** Every major cloud charges to move data out of its
   network toward another cloud or the public internet. AWS's standard
   internet egress is commonly in the range of several cents per
   gigabyte once you're past the free tier, and cross-cloud transfers
   are billed the same way egress to the internet is. At terabyte and
   petabyte scale, that is real, recurring money — not a rounding
   error on an architecture diagram.
2. **Transfer time.** Even on a fast dedicated link, moving multiple
   terabytes takes hours; moving petabytes can take days, and some
   organizations still physically ship storage appliances for the
   largest one-time migrations because that's faster than the network.
   A compute job, by contrast, can be redeployed to a new region or
   cloud in minutes.
3. **Operational inertia.** Once a dataset has a working pipeline,
   access controls, backup schedule, and downstream consumers built
   around its current location, every one of those has to be
   re-validated after a move. The data doesn't just have to move — the
   whole operational surface around it does too.

Put those together, and the cheapest, fastest, least risky option for
almost any new workload that needs that data is to run the workload
next to the data, in whichever cloud the data already lives in.

## Data gravity decides architecture more than preference does

This is the core lesson: **data gravity is frequently the real decision
driver behind where a workload runs — more than the architecture
team's stated cloud preference, cost-optimization goals, or desire for
a clean multi-cloud story.** A team can prefer Azure for its tooling,
its existing Azure DevOps pipelines, and its staff's familiarity — and
still end up running a new Spark cluster in AWS, because that's where
the 40 TB dataset it needs to join against has lived since before the
multi-cloud strategy existed.

Recognizing this early changes how you plan. Instead of being
surprised when gravity "wins," an architect treats the question
**"where will this data's gravity actually be in two years?"** as a
first-order decision at the moment data first lands somewhere — not
an afterthought once a workload is already struggling against it.

## Working with gravity instead of against it

A few practical implications follow directly from this:

- **Decide landing zones deliberately.** When a new large data source
  is onboarded, treat its initial storage location as a long-lived
  architectural commitment, not an incidental choice made by whichever
  team happened to provision the bucket first.
- **Bring compute to data, not the reverse, as the default.** When a
  new analytics or ML workload needs a large existing dataset, the
  default design should colocate the workload with the data unless
  there's a specific, costed reason to do otherwise.
- **Replicate selectively, not wholesale.** When a second cloud
  genuinely needs access to the data — for redundancy, latency, or
  compliance — replicate only the subset that's actually needed there,
  rather than mirroring the entire dataset to preserve an abstract
  "cloud-agnostic" ideal. Lesson 22 covers how that replication is
  actually done.
- **Expect gravity to compound.** The longer a dataset sits somewhere
  and accumulates downstream consumers, the stronger its pull becomes,
  and the more expensive any future move is. Early decisions about
  data placement are disproportionately expensive to reverse.

## Key terms

| Term | Meaning |
|---|---|
| Data gravity | The tendency for applications and compute to be pulled toward the location of a large, existing dataset, because moving the data is far more expensive and slower than moving the compute |
| Egress cost | The per-gigabyte fee a cloud provider charges to move data out of its network toward another cloud or the public internet |
| Landing zone | The first storage location a new data source is provisioned into — an architecturally significant, long-lived decision because of data gravity |
| Colocation | Running compute in the same cloud/region as the data it operates on, to avoid egress cost and transfer latency |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
is moving compute to data almost always cheaper than moving data to
compute, and what does that imply about where you should decide a new
large dataset will first land?
