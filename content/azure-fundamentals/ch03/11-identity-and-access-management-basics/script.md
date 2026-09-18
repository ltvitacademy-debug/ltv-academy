# Script — Identity & Access Management Basics

## Segment 1 (title)

Entra ID answers "who is this" — that's authentication. It doesn't say what that identity is allowed to do. That second question — authorization — is handled by a separate system: Role-Based Access Control, or RBAC.

## Segment 2 (code: role assignment shape)

Every RBAC role assignment has three parts: who — a user, group, or service; what role — a bundle of permissions like Reader, Contributor, or Owner; and at what scope — subscription, resource group, or a single resource.

## Segment 3 (steps: scope changes meaning)

The same "Contributor" role means something different depending on scope. At a subscription, it covers every resource group beneath it. At one resource group, it's contained there. At a single resource, it touches nothing else.

## Segment 4 (code: least privilege)

Least privilege means granting only the access an identity actually needs — not more, just in case. A reporting analyst who only views cost data gets Reader at the resource group scope, not Owner at the subscription scope.

## Segment 5 (outro)

Next up: Azure Pricing and Cost Management — how Azure actually bills for what you use, and the tools that keep that spending under control.
