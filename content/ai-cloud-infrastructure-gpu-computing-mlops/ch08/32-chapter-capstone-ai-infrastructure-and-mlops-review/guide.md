# Lesson 32 — Chapter Capstone: AI Infrastructure and MLOps Review

**Chapter 8 · Capstone: Building Production AI Infrastructure · Lesson 32 of 32**

## What you'll learn

- How this capstone's three lessons — provisioning a GPU training cluster, deploying an
  autoscaling serving endpoint, and a wasted-GPU-spend case study — pulled on every one of this
  course's seven earlier chapters, not just the chapters that sound most directly related
- What each chapter actually contributed, as a decision you watched play out, not a list of
  chapter titles
- Where this course sits in the Cloud Engineer → Cloud Architect path, and why it has no single
  "next course" the way earlier stages of this path did
- What finishing this course actually proves you can do

## The whole course, not just this chapter

**Chapter 1** is why Lesson 29 could pick `Standard_NC24ads_A100_v4` for Solari's training fleet
without re-deriving GPU fundamentals from scratch — knowing why GPUs are fast for this workload,
why GPU memory is usually the real bottleneck, and what Azure and AWS actually offer for GPU
families was already settled vocabulary by the time it mattered. **Chapter 2** is the backbone of
Lesson 29 directly: provisioning real GPU VMs with Terraform, bootstrapping the driver and CUDA
layer, joining them to Kubernetes, and getting `nvidia.com/gpu` recognized as a schedulable
resource — four separate lessons, combined into one working cluster instead of four isolated
skills.

## Distributed training, serving, and the pipeline around both

**Chapter 3**'s distributed-training material doesn't appear as its own lesson in this capstone,
but it's the reason Lesson 29's cluster was built as six GPU nodes rather than one — and the reason
the training job in Lesson 31 could save a final checkpoint successfully even while everything
else about that run went wrong. Checkpointing discipline from Chapter 3 is what kept that incident
a wasted-compute problem instead of a lost-training-progress problem. **Chapter 4** is Lesson 30 in
full: the Deployment/Service/Ingress architecture, the readiness-probe timing a GPU-backed model
server actually needs, and the GPU-utilization autoscaling metric — all three used exactly as
taught, combined for the first time with KEDA's scale-to-zero trigger into one real endpoint.
**Chapter 5**'s MLOps pipeline material — experiment tracking, CI/CD for models, drift monitoring —
is adjacent to Lesson 31's incident without being its direct cause: that lesson's gap was
infrastructure-level alerting, not model-quality monitoring, and the distinction between the two
is itself a Chapter 5 idea worth holding onto.

## Cost, reliability, and what finally broke

**Chapter 6** is Lesson 31, almost word for word. The abstract warning from Lesson 21 — that an
idle or stalled GPU is a categorically bigger budget problem than an idle CPU VM — is exactly what
played out when Solari's stuck training job held four A100s for four extra days. The two
Prometheus alert rules that lesson proposed are the concrete, specific version of the tagging,
budgeting, and anomaly-detection practice Lesson 24 described in general terms. **Chapter 7**
shows up quietly in Lesson 30's one deliberate tradeoff: choosing not to attach a
`PodDisruptionBudget` to a scale-to-zero endpoint is exactly the kind of availability-versus-cost
call Lesson 27's SLO framework asks you to make on purpose, rather than defaulting to "always
protect availability" without weighing what it costs.

## What this capstone proved

Across three lessons, Solari Vision Labs provisioned a real GPU training cluster from quota check
through a scheduled training Job; deployed a real inference endpoint that scales to zero when idle
and on GPU utilization when busy; and worked through — as an illustrative scenario — exactly how a
training job can keep burning GPU spend for days after the real work finished, and what two
specific alerts would have caught it. None of those three things is a new skill invented for this
capstone. Each one is this course's earlier chapters, used together on one continuous storyline
instead of seven separate exercises.

## Where this course sits in the path

AI Cloud Infrastructure, GPU Computing & MLOps is one of four Expert Specialization courses in the
Cloud Engineer → Cloud Architect path, alongside **Advanced Platform Engineering, GitOps & CI/CD**,
**Hybrid & Multi-Cloud Enterprise Architecture**, and **Advanced Site Reliability Engineering,
Disaster Recovery & Resilience**. All four build on the same Advanced Specialization foundation —
the Terraform, Kubernetes, and observability/FinOps skills this path already taught — but not on
each other, so there is no fixed order among them. A learner could take this course first, last, or
anywhere in between relative to the other three; nothing in it assumes any of the other three has
already been completed.

## Key terms

| Term | Meaning |
|---|---|
| Combined skill, not new skill | This capstone's three lessons each reuse earlier chapters together; nothing in it was taught here for the first time |
| Checkpointing discipline (Ch3) | Why Lesson 31's incident wasted compute rather than lost training progress |
| Infrastructure alerting vs. model-quality monitoring (Ch5) | Two distinct kinds of monitoring; Lesson 31's gap was the former |
| Availability-versus-cost tradeoff (Ch7) | The deliberate, SLO-framed call behind skipping a PodDisruptionBudget on a scale-to-zero endpoint |
| Expert Specialization (any order) | This path's current stage; its four courses build on Advanced Specialization but not on each other |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an **earlier
chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter made it
possible?

## Course complete

AI Cloud Infrastructure, GPU Computing & MLOps is done: GPU fundamentals, provisioning, distributed
training, model serving, MLOps pipelines, cost optimization, scaling and reliability, and this
three-lesson capstone proving all seven on one continuous project. This course is one of four
Expert Specialization courses in the Cloud Engineer → Cloud Architect path — Advanced Platform
Engineering, GitOps & CI/CD; Hybrid & Multi-Cloud Enterprise Architecture; this course; and Advanced
Site Reliability Engineering, Disaster Recovery & Resilience — and all four can be taken in any
order from here.
