# Lesson 20 — Why This Path Goes Deeper on Terraform Next

**Chapter 5 · Infrastructure as Code Previews · Lesson 20 of 32**

## What you'll learn

- The real limitation ARM/Bicep and CloudFormation share, despite both
  being genuinely good, officially supported tools
- Why Terraform's provider model removes that limitation
- Why Terraform has become the real industry-standard choice for
  teams running infrastructure across more than one cloud
- Where this course's path actually goes next — and why this lesson
  doesn't try to teach Terraform itself

## Two excellent tools, one shared catch

Lessons 18 and 19 weren't a detour. ARM/Bicep and AWS CloudFormation
are both real, mature, officially supported declarative tools, and
plenty of production infrastructure runs on each of them today. They
both solved the exact problem Lesson 17 raised — describing an end
state instead of a sequence of steps, with built-in idempotency and
drift detection.

But look at what they have in common: Bicep only compiles to ARM, and
ARM only exists inside Azure. CloudFormation only exists inside AWS.
Pick either one, and you've also picked a cloud. That's not a flaw in
either tool — Microsoft built Bicep to be tightly integrated with
Azure on purpose, and Amazon built CloudFormation the same way for
AWS — but it's a real constraint the moment an organization runs
workloads in more than one place.

## Terraform: the same idea, without the lock-in

**Terraform**, built by HashiCorp, is also a declarative IaC tool —
same core idea as Lesson 17: describe the end state, let the tool
compute the changes, get drift detection for free. What's different is
scope. Terraform doesn't talk to one cloud's API directly; it talks to
whichever **provider** plugin you load, and provider plugins exist for
Azure, AWS, Google Cloud, and hundreds of other platforms — even
non-cloud systems. The same `terraform` CLI, the same configuration
language (HCL), and the same workflow apply no matter which provider
is doing the actual work underneath.

That's the practical difference this chapter has been building
toward: a team running Azure alone can reasonably pick Bicep, and a
team running AWS alone can reasonably pick CloudFormation — both are
good, real choices. But a team running Azure *and* AWS, or planning to
add a third platform later, faces a harder question with either
native tool: do we maintain two completely separate declarative
skill sets, two syntaxes, two sets of tooling, forever? Terraform
answers that question by removing it — one skill set, one state model,
any provider.

## Why Terraform became the real industry standard

This isn't a theoretical preference. Across real infrastructure and
platform teams, Terraform has become the de facto standard specifically
in multi-cloud and hybrid environments, precisely because of that
provider model: a company doesn't have to pick a side the way it does
with Bicep versus CloudFormation. It also means a person's Terraform
skills transfer directly between employers, even when the employers
run on different clouds — which is a real, practical reason this path
dedicates an entire next course to it rather than squeezing it into
one more lesson here.

## Where this path goes next

This lesson deliberately doesn't teach Terraform syntax, HCL, state
files, or providers in depth — that's not previewing anymore, it's the
actual job of this path's next course, **Terraform & Bicep**, in the
Advanced Specialization stage. That course picks up exactly where this
chapter leaves off: what Terraform's state file tracks, how providers
work in practice, and how real teams choose between Terraform and
Bicep on a given project instead of defaulting to whichever tool they
learned first.

Before that, Chapter 6 of this course returns to familiar ground:
real, scripted automation for day-to-day operational tasks — starting
with scheduling VM start/stop windows to cut cloud spend.

## Key terms

| Term | Meaning |
|---|---|
| Provider | A Terraform plugin that knows how to talk to one platform's API (Azure, AWS, GCP, etc.) |
| Cloud lock-in | Being limited to one cloud platform because the IaC tool itself is built only for that platform (ARM/Bicep → Azure, CloudFormation → AWS) |
| Multi-cloud | Running production workloads across more than one cloud provider |
| HCL | HashiCorp Configuration Language — the language Terraform configuration files are written in |

## Check yourself

You're ready for Chapter 6 when you can explain, without looking: why
does a company running workloads on both Azure and AWS have a harder
decision with ARM/Bicep and CloudFormation than a company that only
ever uses one cloud — and how does Terraform's provider model change
that decision?
