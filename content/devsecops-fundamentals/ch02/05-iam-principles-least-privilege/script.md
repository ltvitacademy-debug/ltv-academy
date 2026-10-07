# Script — IAM Principles: Least Privilege

## Segment 1 (title)

Chapter 1 established why security has to move earlier in the pipeline. Chapter 2 asks what sits underneath almost every other control: who, or what, is allowed to do anything at all. This lesson introduces IAM and the principle that should guide every access decision at Northbridge Retail — least privilege.

## Segment 2 (steps)

IAM governs every kind of principal, not just people. An engineer signing into the Azure portal, the checkout service calling the payments API, and the CI/CD pipeline deploying a new image are all principals, and each one needs an explicit access decision — not broad access granted by default because it's convenient.

## Segment 3 (steps)

Least privilege means a principal gets exactly what its job requires, and nothing more. Not access that seems close enough, not admin because it's simpler, and not whatever the last person in this role had. It's added later, deliberately, only when a real need shows up.

## Segment 4 (steps)

Privilege level sets blast radius. A leaked read-only credential is a bounded problem. A leaked admin credential can mean deleted infrastructure or exfiltrated customer data. Most breaches don't start with broken encryption — they start with a credential that had more access than its job needed.

## Segment 5 (outro)

Every identity technology the rest of this chapter covers — Azure RBAC, AWS IAM, Kubernetes RBAC, workload identity — is a mechanism for putting least privilege into practice. Next up: Azure Entra ID and Azure RBAC.
