# Cluster vs. Serverless

Lesson 23 covered what a Redshift cluster is made of. Now: the two ways AWS actually lets you
run one. A **provisioned cluster** is the original model — you pick node types and a node
count, and that capacity is yours until you resize it. **Redshift Serverless** is the newer
model — you don't pick nodes at all; you get automatically-scaling capacity billed by usage.
Choosing between them is a real architectural decision, not a preference.

## What you'll learn

- Provisioned clusters: node types and resizing
- Redshift Serverless: RPUs and auto-scaling
- The workload shape each one is actually built for
- A concrete business case for choosing Serverless

## Provisioned clusters

With a provisioned cluster, you choose a **node type** — RA3 nodes (which separate storage
from compute, backed by managed storage that scales independently) or DC2 nodes (which pair
compute with fixed local SSD storage) — and a **node count**. That capacity runs continuously
whether you're querying it or not, and you pay for it by the hour regardless of load. When
your data or query volume outgrows the cluster, you **resize**: a **classic resize**
provisions a new cluster in the background and cuts over (can take hours, but changes node
type); an **elastic resize** adds or removes nodes of the same type in minutes, with a short
read-only window. Provisioned clusters make sense when you have a steady, predictable, mostly
constant query workload — you know roughly how much compute you need most of the time.

## Redshift Serverless

**Redshift Serverless** removes node selection entirely. Capacity is measured in **RPUs**
(Redshift Processing Units) — a blend of compute and memory — and the service scales the RPUs
allocated to your workgroup up and down automatically based on query demand, billing per RPU-
second actually consumed. There's no cluster sitting idle burning cost when nobody is
querying, and no manual resize operation when a workload spikes.

## Choosing between them: a bursty-workload case

Picture a finance team that runs a heavy month-end close: three days of intense, complex
reporting queries, then near-silence for the rest of the month. A provisioned cluster sized
for month-end peak sits mostly idle — and expensively paid-for — the other 27 days. Sized for
the *quiet* days instead, it chokes during close. Redshift Serverless fits this shape exactly:
it scales RPUs up automatically when the close-week query volume hits, and scales back down
(billing drops accordingly) the rest of the month. The same logic applies to dev/test
environments and unpredictable ad hoc analytics — anywhere query volume is genuinely bursty
rather than steady, Serverless removes the sizing guesswork.

## Key terms

| Term | Meaning |
|---|---|
| Provisioned cluster | Fixed node type + node count you manage and pay for continuously |
| RA3 node | Provisioned node type with storage separated from compute |
| DC2 node | Provisioned node type with fixed local SSD storage |
| Elastic resize | Fast (minutes) node count change within the same node type |
| RPU | Redshift Processing Unit — the compute/memory unit Serverless bills by |

## Check yourself

A team's Redshift query volume is roughly flat, Monday through Friday, all year. Another
team's volume spikes hard for three days each quarter and is nearly silent otherwise. Which
team is the better fit for a provisioned cluster, and which for Redshift Serverless — and why?
