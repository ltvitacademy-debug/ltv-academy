# Lesson 32 — Chapter Capstone: Container Platforms Review

**Chapter 8 · Capstone: Running a Real Application on Kubernetes · Lesson 4 of 4**

## What you'll learn

- How Harrow Creek Goods' three-lesson capstone pulled on every one of this course's seven earlier
  chapters, not just the Kubernetes-objects chapter
- What each chapter actually contributed, as a decision you watched play out, not a list of
  chapter titles
- Why the skills in this course — containerizing, orchestrating, networking, storing state,
  templating, and securing a cluster — are a different job than the declarative infrastructure
  work from the previous course in this path
- What comes next in the Advanced Specialization stage, and why it follows naturally from here

## The whole course, not just this chapter

This capstone used every chapter that came before it. **Chapter 1** is why a multi-stage Dockerfile
and the layer/union-filesystem model needed no introduction when Lesson 29 containerized `order-api`
and `order-worker` — that vocabulary was already settled before the lab started. **Chapter 2** is
why the runtime stage reached for a distroless base image, ran as a non-root user, and got tagged
`1.0.0` instead of `latest` without a second thought; production-image discipline was already
practiced work by the time this capstone needed it.

## Orchestration, networking, and storage, doing the real work

**Chapter 3** is the reason `order-api` and `order-worker` became Deployments with ReplicaSets
underneath rather than bare Pods, and why `kubectl get pods` with a label selector was the obvious
way to verify them. **Chapter 4** is the backbone of Lesson 30's Ingress: routing
`orders.harrowcreek.dev` to the `order-api` Service, on top of the ClusterIP/Service model Chapter
4 already explained, without re-deriving what a Service does from scratch. **Chapter 5** is exactly
what made `order-worker`'s PersistentVolumeClaim possible — dynamic provisioning from a
StorageClass instead of a hand-created PersistentVolume, the same mechanism Chapter 5 walked
through on its own.

## Helm, security, and the incident that tied it together

**Chapter 6** is the reason Lesson 30 didn't leave four separate YAML files lying around —
`helm create`, a templated `values.yaml`, and two differently sized releases from the same chart
are Chapter 6's templating lesson, applied to a real two-service app instead of an example.
**Chapter 7** is the lens Lesson 31's incident has to be read through: `BestEffort` QoS, the
difference between an OOMKilled container and an Evicted pod, and a `LimitRange` as a
namespace-wide safety net are the resource-governance and hardening ideas Chapter 7 introduced,
now shown causing a real (if illustrative) outage instead of staying abstract.

## What this capstone proved

Across three lessons, Harrow Creek Goods containerized and deployed a real two-service application
with Deployments and Services; added Ingress routing, persistent storage, and a Helm chart instead
of hand-applied YAML; and worked through what happens when one pod ships without a resource limit —
why its healthy, correctly-configured neighbors failed anyway, and what fixes the problem at both
the pod level and the namespace level. That is the actual job of running containers in production:
not just getting a Deployment to reach `Running`, but understanding every object around it well
enough to explain why a neighbor's mistake became everyone's incident.

## What's next

This course — Docker, Kubernetes & Container Platforms — is complete. The Advanced Specialization
stage continues with **Cloud Reliability, Monitoring & FinOps**, the next course in the Cloud
Engineer → Cloud Architect path: once an application like Harrow Creek's is deployed, the next
questions are whether it stays healthy, whether an incident like Lesson 31's gets caught before it
becomes an outage, and what it actually costs to run.

## Key terms

| Term | Meaning |
|---|---|
| Container platform | The combined stack of image build, registry, orchestration, networking, storage, and governance a real application runs on |
| Templated deployment | Packaging Kubernetes manifests into a Helm chart so one versioned release replaces several hand-applied YAML files |
| Resource governance | Requests, limits, and namespace-wide defaults like a LimitRange that keep one workload from destabilizing its neighbors |
| Advanced Specialization | This path's current stage; continues next with Cloud Reliability, Monitoring & FinOps |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an **earlier
chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter made it
possible?

## Course complete

Docker, Kubernetes & Container Platforms is done: eight chapters covering Docker fundamentals,
production-grade images, Kubernetes core objects, networking, storage, Helm, and security/RBAC,
proven on one real two-service application, including an illustrative incident recovered start to
finish. Next up in this path: **Cloud Reliability, Monitoring & FinOps.**
