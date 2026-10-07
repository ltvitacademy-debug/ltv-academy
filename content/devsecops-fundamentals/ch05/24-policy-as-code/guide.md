# Policy as Code

Across this chapter, Northbridge Retail's platform team has enforced one rule at a time: scan this image, require this reviewer, drop these capabilities. Policy as code is what happens when those rules stop being individually wired into separate tools and become something written once, versioned like any other code, and enforced automatically everywhere it applies.

## What you'll learn

- What "policy as code" means in concrete terms, versus a checklist or a wiki page
- How Open Policy Agent (OPA) and Rego express a policy as a general-purpose, evaluatable rule
- How Gatekeeper applies that same idea as a live admission controller inside a Kubernetes cluster
- Why this lesson is the natural closing point for everything Chapters 4 and 5 covered

## A policy that's code, not a document

A security checklist in a wiki page only works if every engineer reads it, remembers it, and applies it correctly, every time, forever. **Policy as code** replaces that with a rule expressed in an actual language — evaluated automatically, the same way every time, against every resource it applies to. **Open Policy Agent (OPA)** is a general-purpose policy engine, and **Rego** is the language it evaluates policies in.

## Gatekeeper: OPA, wired into the Kubernetes API

**Gatekeeper** applies OPA's model directly to Kubernetes, as an **admission controller** — it evaluates every resource a cluster tries to create, and can reject one outright if it violates policy, before it's ever scheduled. Gatekeeper separates the reusable rule from its specific parameters using two objects:

```yaml
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
        violation[{"msg": msg}] {
          provided := {l | input.review.object.metadata.labels[l]}
          required := {l | l := input.parameters.labels[_]}
          missing := required - provided
          count(missing) > 0
          msg := sprintf("missing labels: %v", [missing])
        }
```

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: ns-must-have-cost-center
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Namespace"]
  parameters:
    labels: ["cost-center"]
```

The **ConstraintTemplate** defines the reusable rule in Rego — "these labels must be present" — once. The **Constraint** applies that template with specific parameters — in Northbridge Retail's case, requiring every namespace to carry a `cost-center` label. The same template could be reused by a dozen different constraints, each requiring different labels on different resource kinds, without rewriting any Rego.

## Why this is the right place to close this chapter

Everything from Lesson 20 through Lesson 23 was a specific rule enforced by a specific tool: Trivy for images, Pod Security Standards for pod specs, required reviewers for deploys, Falco for runtime behavior. Policy as code is the generalization underneath all of them — the same idea of "write the rule once, evaluate it automatically, every time" that made every earlier lesson work, now made explicit as its own discipline. Chapter 6 picks this up directly: compliance as code (Lesson 25) is this exact pattern applied to regulatory and audit requirements instead of Kubernetes labels.

## Key terms

- **Policy as code** — expressing a rule in an evaluatable language, enforced automatically and consistently, rather than relying on a checklist or manual review
- **OPA (Open Policy Agent)** — a general-purpose policy engine that evaluates rules written in Rego
- **Gatekeeper** — an admission controller that applies OPA policies directly inside a Kubernetes cluster
- **ConstraintTemplate / Constraint** — Gatekeeper's split between a reusable policy rule (the template) and its specific applied parameters (the constraint)
