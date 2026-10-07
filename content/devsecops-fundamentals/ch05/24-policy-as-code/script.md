# Script — Policy as Code

## Segment 1 (title)

Across this chapter, Northbridge Retail enforced one rule at a time: scan this image, require this reviewer, drop these capabilities. Policy as code is what happens when those rules stop being wired into separate tools and become something written once and enforced automatically everywhere.

## Segment 2 (steps)

A checklist only works if every engineer remembers to apply it. Policy as code replaces that with a rule written in an actual language, evaluated the same way every time. Open Policy Agent is a general-purpose policy engine, Rego is the language it evaluates, and Gatekeeper applies that same model directly inside Kubernetes, as an admission controller that can reject a resource before it's ever scheduled.

## Segment 3 (code)

A ConstraintTemplate defines the reusable rule in Rego just once — here, that a set of labels must be present on a resource.

## Segment 4 (code)

A Constraint applies that same template with specific parameters — Northbridge Retail requires every namespace to carry a cost-center label, and the identical template could back a dozen other constraints without rewriting any Rego.

## Segment 5 (outro)

Everything from image scanning through runtime security was a specific rule enforced by a specific tool — policy as code is the generalization underneath all of them. That closes Chapter 5. Next up, Chapter 6: compliance and response.
