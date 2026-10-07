# Script — The Shared Responsibility Model

## Segment 1 (title)

Moving to the cloud doesn't make security someone else's problem. It splits the problem, and exactly where the split falls depends on which service model is in use — misreading that line is one of the most common, and most expensive, mistakes an organization can make.

## Segment 2 (steps)

Two ends of this never move. The provider is always responsible for the physical layer — the data centers, the physical servers and networking hardware, and the hypervisor that carves machines into virtual ones. No customer ever patches a data center's HVAC system. On the other end, the customer always owns their own data, their identities, and their access control — no provider can know which files are confidential or who on staff should be allowed to see them.

## Segment 3 (code)

Everything between those two fixed ends shifts with the service model. Under IaaS, the customer manages the most: the OS, patches, network configuration, and the application itself. Under PaaS, the provider also takes on OS and runtime patching, leaving the customer mostly responsible for their application and how they configure the platform. Under SaaS, the provider manages nearly everything technical, and the customer is left responsible mainly for their own data and their users' accounts.

## Segment 4 (steps)

Here's why this matters in practice: study after study of real cloud security incidents finds the same pattern. The provider's infrastructure almost never fails. What fails is a customer-side setting — a storage container left open to the public internet, an access rule that's more permissive than it should be, a password with no multi-factor authentication behind it. The shared responsibility model exists to make that distinction clear before something goes wrong, not after.

## Segment 5 (outro)

Knowing who's responsible for what is one half of running cloud infrastructure well. The other half is knowing what you're actually being charged for — which is exactly where the next lesson goes.
