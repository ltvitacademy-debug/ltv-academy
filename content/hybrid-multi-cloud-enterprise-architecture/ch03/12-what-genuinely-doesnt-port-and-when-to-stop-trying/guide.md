# Lesson 12 — What Genuinely Doesn't Port, and When to Stop Trying

**Chapter 3 · Workload Portability Across Clouds · Lesson 4 of 4**

## What you'll learn

- An honest list of real services and capabilities that have no
  meaningful equivalent across clouds, so abstracting them is
  theater, not engineering
- Why deep PaaS integrations — not just "a different API," but
  genuinely different semantics — are where the count-per-cloud and
  adapter patterns from this chapter stop paying off
- How to tell, before you start building an abstraction layer, whether
  the portability you're chasing is realistic or self-deception
- A practical rule for deciding what fraction of a real system is
  worth making portable at all

## Services with no honest equivalent

Lessons 9–11 showed real, working patterns for portability: the
Kubernetes API surface, an application-level interface over a queue
or a database, and a Terraform module that branches by cloud. Each of
those works because the underlying capability — run a container,
send a message, store a row — genuinely exists on every cloud in a
comparable form. That stops being true for a meaningful slice of what
clouds actually sell.

- **Azure Cognitive Services' prebuilt models** — specific
  Document Intelligence layouts, specific Custom Vision training
  workflows, specific Azure OpenAI Service deployment and content-
  filtering behavior — don't have a drop-in AWS equivalent at the same
  feature granularity. Amazon Textract and Amazon Rekognition solve
  adjacent problems with different APIs, different accuracy
  characteristics, and different configuration models. "Abstracting"
  between them means building and maintaining two genuinely different
  integrations, not one interface with two thin adapters.
- **DynamoDB's single-digit-millisecond global tables and its
  specific consistency model** have no AWS-for-Azure substitute that
  behaves the same way; Cosmos DB is a comparably capable
  globally-distributed database, but its consistency levels, request-
  unit pricing model, and partition-key behavior are different enough
  that code tuned against one will not perform the same way, or cost
  the same, against the other.
- **AWS Step Functions and Azure Logic Apps** both orchestrate
  multi-step workflows, but their state-machine definition languages,
  retry semantics, and built-in connector catalogs are not
  interchangeable — a workflow built against one is a rewrite, not a
  config change, to run on the other.
- **Managed Kubernetes add-ons** are a subtler case: AKS's native
  integration with Azure Monitor and Microsoft Entra ID, versus EKS's
  integration with CloudWatch and IAM, both sit *inside* the
  "portable" Kubernetes layer from Lesson 9 — but the moment your
  workload depends on either integration directly, that specific piece
  is no longer part of the portable core at all.

None of this is a knock on any of these services — they're often the
single best tool for the job precisely *because* they're deeply
integrated with one cloud's ecosystem. That depth is the product.

## When chasing portability costs more than it saves

The honest failure mode isn't using these services — it's building an
abstraction layer around them anyway, out of a general commitment to
"staying portable," without a real plan to actually run on a second
cloud. That abstraction layer still has to be designed, built, kept
in sync with two SDKs' breaking changes, and tested against both
backends — real, ongoing engineering cost — in exchange for optionality
that, for most organizations, is never exercised. The migration that
justified the investment often simply never happens.

A useful gut check before building a portability layer for any
specific service: would you actually tolerate a rewrite of this one
integration if you switched clouds, or are you trying to avoid ever
having to think about that question again? If the honest answer is
"we'd rewrite this specific piece and that's fine," stop there — the
one-time cost of a future, possibly-never-needed rewrite is smaller
than the recurring cost of maintaining an abstraction today.

## A practical portability budget

Rather than deciding "everything should be portable" or "nothing
should," decide deliberately, per service, which fraction of the
system genuinely needs the discipline from this chapter:

- **Spend portability effort on the core** — the actual application
  workload (Kubernetes, Lesson 9) and the handful of commodity
  services it depends on that have real equivalents everywhere
  (object storage, a relational database, a basic message queue,
  Lesson 10) — because that's where you have a real choice and a real
  reason to keep it open.
- **Don't spend it on deep, differentiated platform services** —
  Cognitive Services, DynamoDB's specific global-table behavior, Step
  Functions/Logic Apps, cloud-native observability integrations —
  because there's no honest equivalent to abstract toward, and the
  "abstraction" would just be a worse, generic version of a feature
  you picked that service for in the first place.

This is the same judgment call this whole chapter has been building
toward: Kubernetes and application-level interfaces earn their keep
because the portability they buy is real. Chasing portability past
that point spends engineering time manufacturing an option nobody
ends up using.

## Key terms

| Term | Meaning |
|---|---|
| Deep PaaS integration | A managed service feature (specific AI model, workflow engine, database consistency model) with genuinely different semantics per cloud, not just a different API |
| Abstraction theater | Building an interface or adapter layer around a service with no honest equivalent, producing the appearance of portability without the substance |
| Portability budget | A deliberate decision about which fraction of a system is worth the ongoing cost of multi-cloud abstraction, versus which should use the best-fit service directly |
| Migration cost vs. maintenance cost | The one-time cost of rewriting an integration if you actually switch clouds, compared against the recurring cost of maintaining an abstraction layer today |

## Check yourself

This chapter is complete when you can take a real service your
organization depends on and make the call explicitly: is this part of
the portable core worth the discipline from Lessons 9–11, or is it a
deep, differentiated integration where chasing portability would cost
more than the option is worth — and can you say specifically why?
