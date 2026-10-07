# Script — Pod Security

## Segment 1 (title)

RBAC and ServiceAccounts control who can talk to the Kubernetes API. Neither one stops a container from running as root or escalating privileges once it's actually started. That's Pod Security — settings on the container itself, plus a namespace-wide policy that enforces a baseline across every Pod.

## Segment 2 (code)

securityContext is where that gets locked down. runAsNonRoot refuses to start the container at all if its image tries to run as root. allowPrivilegeEscalation set to false blocks a process from gaining more privileges than it started with. readOnlyRootFilesystem stops anything from being written outside its explicit volumes, and dropping all capabilities strips every Linux privilege the container doesn't explicitly need back.

## Segment 3 (steps)

Kubernetes defines three built-in profiles. Privileged is effectively unrestricted, appropriate only for trusted system components. Baseline blocks the known privilege escalations while staying broadly compatible. Restricted enforces current hardening best practice — exactly the settings from the last slide.

## Segment 4 (code)

Rather than trust every Pod spec to get this right by hand, Pod Security Admission enforces a chosen standard at the namespace level with a label — enforce: restricted. A Pod that doesn't meet that profile gets rejected by the API server before it's ever scheduled, no matter who wrote its YAML.

## Segment 5 (steps)

Checkout handles customer payment flows. If that container were ever compromised through a dependency vulnerability, running non-root with a read-only filesystem and no extra capabilities caps the damage — and because enforcement sits on the namespace, no individual Pod spec can quietly opt back out.

## Segment 6 (outro)

That closes out security and access. Next up, chapter seven: Azure Kubernetes Service, where Northbridge hands the control plane itself over to a managed service.
