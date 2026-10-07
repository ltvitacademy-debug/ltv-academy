# Script — Capstone Kickoff: Secure a Pipeline End to End

## Segment 1 (title)

Every chapter in this course handed you one piece — a least-privilege identity, a vault, a scanner, a hardened container. The capstone asks you to stop learning pieces and assemble one real pipeline. This lesson sets the requirements; the next lesson is the build.

## Segment 2 (steps)

Here's the scenario. Northbridge Retail's order-service currently ships with no security checks at all — it builds, pushes a container, and deploys with a broadly-scoped identity nobody's revisited since it was created. Your job is to redesign that pipeline so every automatable SSDLC stage actually runs.

## Segment 3 (steps)

A finished pipeline needs all six controls, not five. SAST scans order-service's own code on every pull request. Dependency scanning checks its third-party packages. Secrets scanning blocks a commit if a credential shows up where it shouldn't. Image scanning checks the built container before it's allowed to deploy.

## Segment 4 (steps)

The last two tie it together. A policy gate is the single checkpoint that blocks the pipeline if any scan reports a finding above an agreed severity. And the identity that actually deploys and runs the service gets scoped to exactly what it needs — nothing broader left over from how it used to be set up.

## Segment 5 (outro)

Skipping any one of the six isn't a smaller project — each catches something none of the others do. Next up: the hands-on build, putting all six into an actual pipeline definition.
