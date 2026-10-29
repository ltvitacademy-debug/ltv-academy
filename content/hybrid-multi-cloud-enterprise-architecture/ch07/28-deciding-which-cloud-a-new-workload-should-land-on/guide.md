# Lesson 28 — Deciding Which Cloud a New Workload Should Land On

**Chapter 7 · Multi-Cloud Cost and Governance · Lesson 4 of 4**

## What you'll learn

- Why "which cloud should this run on" needs a repeatable decision
  order, not a case-by-case argument every time
- Why compliance and data-residency requirements from Chapter 6 should
  be checked first, before cost or preference ever enter the
  conversation
- How required services, existing team skill, and real (not sticker)
  cost narrow what's left after the hard constraints are applied
- Why most new workloads should land where similar workloads already
  run, and multi-cloud placement should be the deliberate exception

## Why this needs an order, not a debate

Every new workload in a hybrid, multi-cloud estate raises the same
question, and without a fixed order to answer it in, the same argument
happens from scratch every time — cost people arguing for the cheapest
option, platform teams arguing for whatever they already run well,
and nobody checking the one thing that should have ended the debate
immediately: can this even run where everyone's arguing it should run.

## Step 1: Hard constraints first

Data residency and sovereignty requirements, covered in Chapter 6,
come first because they're not negotiable the way cost or preference
are. If a workload's data has to remain in a specific jurisdiction, or
is already governed by a data-gravity decision made for a related
system, that fact eliminates options before anything else gets
discussed. A cloud that's cheaper or more familiar is irrelevant if it
can't legally or physically host the data in the first place.

## Step 2: Can it actually run there

After the hard constraints narrow the field, check whether the
workload's required services actually exist on each remaining
candidate. A workload built around a specific first-party managed
service — a particular database engine, a particular AI platform
capability — may simply not exist, or not exist in equivalent form, on
the other cloud. A workload built from portable, generic building
blocks (containers, standard VMs, object storage) stays viable
anywhere the hard constraints allow. This step is a yes/no filter, not
a scoring exercise: if the service doesn't exist where you'd otherwise
prefer to put it, that candidate is gone.

## Step 3: Skill and real cost, among what's left

Only once you have a shortlist of clouds that both satisfy the
compliance constraints and can actually run the workload do skill and
cost become the deciding factors — and in that order. Landing a new
workload on a cloud nobody on the team operates well is a real
operational risk, independent of what the invoice says; a team that
runs Azure confidently every day will ship and operate an Azure-native
version of a generic workload faster and more safely than the same
team's first attempt on an unfamiliar platform. Cost should be
evaluated using the organization's actual effective pricing — existing
Azure or AWS commitments and discounts the org already holds, the way
Lesson 25 covered amortized cost — not the published list price, which
rarely reflects what either option would really cost this
organization.

## The default should be "where it already lives"

The honest default, covered back in Chapter 2, still applies here:
most new workloads should land on the cloud the organization already
runs similar workloads on. Multi-cloud placement is a deliberate
exception you choose for a specific reason — a hard compliance
constraint, a service that genuinely only exists elsewhere, a true
best-of-breed case — not a default stance applied to every new
workload "just in case." A workload sent to a second cloud for no
reason beyond variety inherits all of that cloud's unfamiliarity and
connectivity cost with none of the benefit.

## Key terms

| Term | Meaning |
|---|---|
| Hard constraint | A compliance or data-residency requirement that eliminates cloud options before cost or preference is considered |
| Yes/no service filter | Checking whether a workload's required services exist on a candidate cloud at all, before ranking the remaining options |
| Effective cost | The org's real, discount-adjusted unit price for a given cloud, as opposed to published list pricing |
| Deliberate multi-cloud exception | Placing a workload on a second cloud for a specific, named reason, rather than as a default habit |

## Check yourself

You're ready to move on when you can explain, without looking: why
should compliance and data-residency requirements be checked before
cost or team skill, and why is "the cloud we already run similar
workloads on" the right default rather than an afterthought?
