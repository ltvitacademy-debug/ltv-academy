# Lesson 32 — Chapter Capstone: Infrastructure as Code Review

**Chapter 8 · Capstone: A Real Multi-Environment Terraform Project · Lesson 32 of 32**

## What you'll learn

- How Caldwell Ridge Analytics' four-lesson network project pulled on every one of this course's
  seven earlier chapters, not just the module chapter
- What each chapter actually contributed, as a decision you watched play out, not a list of
  chapter titles
- Why the skills in this course — declaring infrastructure, previewing it, versioning its state —
  are a different job than the operational deployment work from the previous course in this path
- What comes next in the Advanced Specialization stage, and why it follows naturally from here

## The whole course, not just this chapter

This capstone used every chapter that came before it. **Chapter 1** is why `required_providers`,
the state file concept, and a plain `terraform init / plan / apply` loop needed no introduction
when Lesson 29 wired the network module into a root config — that vocabulary was already settled.
**Chapter 2** is why reaching for `azurerm_resource_group`, `azurerm_virtual_network`, and
`azurerm_subnet` as real resource types felt ordinary rather than new; provisioning real
infrastructure with Terraform was already practiced work by the time the module needed writing.

## State management and modules, doing the real work

**Chapter 3** is the backbone of two full lessons here: the remote `azurerm` backend that kept
dev's and prod's state in Azure Storage instead of on anyone's laptop (Lesson 29), the locking that
keeps two engineers from applying at once, and — most directly — Lesson 31's entire recovery
process. `terraform state pull`, `terraform state list`, `terraform state rm`, and
`terraform import` aren't new tools invented for this capstone; they're Chapter 3's state
management toolkit, used on a real incident instead of a clean textbook example. **Chapter 4** is
the reason there was only ever one `modules/network` source to begin with — variables for
`vnet_address_space` and `subnet_count`, outputs for `vnet_id` and `subnet_ids`, and a module that
never once needed to know it would be called twice.

## Environments, Bicep, and the pipeline around all of it

**Chapter 5** is exactly what made Lesson 30 possible: `.tfvars` per environment, and the specific,
reasoned choice of directory-per-environment state over a shared workspace, grounded in Lesson 18's
tradeoff rather than picked at random. **Chapter 6**'s Bicep deep dive doesn't appear directly in
Caldwell Ridge's Azure network project, but it's why that project's provider choice was itself a
real decision — Terraform and Bicep solve overlapping problems with different tradeoffs, and
knowing both is what let this capstone pick Terraform on purpose rather than by default. **Chapter
7** is the part of this project that happens outside any single lesson's code: this network module
is exactly the kind of configuration that belongs behind a `terraform plan`-on-pull-request check,
an approval gate before prod's `apply`, secrets kept out of state and `.tfvars` entirely, and
periodic drift detection — so that a Lesson 31-style incident gets caught by CI before it ever
reaches a confusing Monday-morning error.

## What this capstone proved

Across four lessons, Caldwell Ridge built one real, reusable network module with variables instead
of hard-coded values; deployed it twice, at two different sizes, from two isolated state files
instead of one shared workspace; and recovered a production resource from a manual, out-of-band
deletion by backing up state first, reading `state list` carefully, and choosing correctly between
`state rm` and `terraform import`. That is the actual job: not writing HCL once, but writing it so
it survives being reused, re-run, and occasionally repaired.

## What's next

This course — Terraform, Bicep & Infrastructure as Code — is complete. The Advanced Specialization
stage continues with **Docker, Kubernetes & Container Platforms**, the next course in the Cloud
Engineer → Cloud Architect path: a different layer of the same infrastructure, run instead of just
declared.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure as Code | Declaring the desired state of infrastructure in version-controlled files, previewed before anything is created or changed |
| Module reuse | Writing one parameterized configuration and calling it multiple times for different environments, instead of duplicating resource blocks |
| State management | Backing up, inspecting, and reconciling the file that maps Terraform's configuration to real infrastructure, especially after manual out-of-band changes |
| Advanced Specialization | This path's current stage; continues next with Docker, Kubernetes & Container Platforms |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an **earlier
chapter** of this course, not Chapter 8 itself. What was the decision, and which chapter made it
possible?

## Course complete

Terraform, Bicep & Infrastructure as Code is done: seven chapters of fundamentals, provisioning,
state, modules, environments, Bicep, and CI/CD, proven on one real, reusable network project across
dev and prod, including a real incident recovered start to finish. Next up in this path: **Docker,
Kubernetes & Container Platforms.**
