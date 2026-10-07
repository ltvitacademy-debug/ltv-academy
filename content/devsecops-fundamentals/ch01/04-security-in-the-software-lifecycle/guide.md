# Security in the Software Lifecycle

You now have three building blocks: the shift-left mindset, the threat-modeling practice for finding risks specific to your system, and the OWASP Top 10 vocabulary for naming common risk categories. This lesson ties them together by walking across the full Secure Software Development Lifecycle (SSDLC) — the stage-by-stage map the rest of this course is organized around.

## What you'll learn

- The stages of the Secure Software Development Lifecycle (SSDLC)
- A concrete security activity that belongs at each stage
- How this maps onto Northbridge Retail's own pipeline, end to end
- Why security activities are cumulative, not a single gate near the end

## The SSDLC, stage by stage

The traditional SDLC — plan, design, develop, test, deploy, operate/maintain — describes how software gets built regardless of security. The *Secure* SDLC overlays a security activity onto every one of those stages, rather than appending one activity at the very end:

1. **Plan** — define security requirements alongside functional ones (e.g., "payment data must be encrypted at rest and in transit" becomes a requirement, not an afterthought).
2. **Design** — threat model the architecture (Lesson 2's STRIDE walkthrough happens here).
3. **Develop** — write code with secure coding practices, supported by editor-level static analysis and peer review.
4. **Build/Test** — automated security testing runs in the pipeline: SAST, dependency scanning, secrets detection, IaC scanning (all of Chapter 4).
5. **Release** — a final automated gate confirms required scans passed and policies are satisfied before a build is allowed to ship (Chapter 5's policy-as-code).
6. **Deploy** — the running environment itself is hardened: least-privilege identity, secrets pulled from a vault rather than baked into images, container and cluster hardening (Chapters 2, 3, and 5).
7. **Operate/Maintain** — runtime monitoring, audit logging, vulnerability management, and incident response keep watching the system after it's live (Chapter 6).

## Northbridge Retail's pipeline, mapped end to end

Picture Northbridge Retail's checkout service moving through this lifecycle: a product requirement specifies PCI-relevant data must never be logged in plaintext (Plan). The team threat models the payment flow and finds the trust boundary between checkout and the payment processor (Design). A developer writes the integration using a vetted payment SDK instead of handling card data directly (Develop). The CI pipeline runs a SAST scan, a dependency check, and a secrets scan on every pull request (Build/Test). A policy gate blocks the deploy if any scan reports a critical finding (Release). The service runs with a workload identity scoped to only the Key Vault secrets it needs, in a hardened container (Deploy). Azure Monitor logs every access to payment-related resources, and an on-call rotation reviews alerts (Operate).

## Why this is cumulative, not a single gate

Each stage's security activity catches a different kind of problem — a threat model won't catch a leaked dependency vulnerability, and a dependency scan won't catch an architectural flaw with no code to point to. Treating any single stage as "the" security gate leaves the others uncovered. The SSDLC isn't a checklist you complete once; it's a set of checks that recur on every change, because every pull request restarts the cycle at Develop and Build/Test, even if Plan and Design only happened once for the original feature.

## Key terms

- **SDLC** — Software Development Lifecycle: the stages software moves through from planning to operation
- **SSDLC** — Secure Software Development Lifecycle: the SDLC with a security activity layered onto every stage
- **Security gate** — an automated checkpoint (such as a policy check before release) that can block a build from progressing if it fails a security requirement
- **Cumulative security** — the principle that security activities at different stages catch different problems, so no single stage can substitute for the others
