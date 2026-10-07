# The Shared Responsibility Model

Moving to the cloud does not mean security becomes someone else's problem. It means the problem gets split, and exactly where the line falls depends on which service model — IaaS, PaaS, or SaaS, from two lessons ago — you're using. Misreading that line is one of the most common, and most expensive, mistakes an organization can make in the cloud.

## What you'll learn

- What the provider is always responsible for, no matter which service model you use
- What the customer is always responsible for, no matter which service model you use
- How the dividing line between those two shifts as you move from IaaS to PaaS to SaaS
- Why "the cloud got hacked" is almost always, on closer inspection, a customer-side misconfiguration

## What the provider always owns

Regardless of which service model a customer buys, the cloud provider is always responsible for the physical layer: the data centers themselves, the physical servers and networking hardware inside them, and the hypervisor layer that carves physical machines into virtual ones. A customer never patches a physical data center's HVAC system or replaces a failed hard drive in a provider's server rack — that work, and the security of it, belongs entirely to the provider, no matter what's deployed on top of it.

## What the customer always owns

On the other end, the customer is always responsible for their own data, their own identities and access control, and classifying what's sensitive versus what isn't — no provider can know which of a customer's files contain confidential information, or who among the customer's employees should be allowed to see them. Northbridge Retail, not their cloud provider, decides who on their staff can access customer payment data, and Northbridge Retail is the one that pays the price if an employee's compromised password leads to a breach.

## Where the line moves

Everything between those two fixed ends shifts depending on the service model:

- **IaaS** — the customer manages the most: the OS, patches, network configuration, and the application, on top of provider-managed hardware and hypervisors.
- **PaaS** — the provider also takes on OS and runtime patching, leaving the customer responsible mainly for their application code and how they configure the platform.
- **SaaS** — the provider manages nearly everything technical; the customer is left responsible mainly for their own data, their users' accounts, and how they configure the application's built-in settings.

More of the stack the provider manages, the less the customer has to worry about securing it directly — but configuration mistakes on the customer's remaining slice are still entirely the customer's problem.

## Why most cloud breaches are configuration mistakes

Study after study of real cloud security incidents finds the same pattern: the provider's infrastructure almost never failed. What failed was a customer-side setting — a storage container left open to the public internet, an overly permissive access rule, a password without multi-factor authentication. The shared responsibility model exists precisely to make that distinction clear before something goes wrong, not after.

## Key terms

| Term | Meaning |
|---|---|
| Shared responsibility model | The division of security duties between cloud provider and customer |
| Provider-managed | Always includes physical data centers, hardware, and the hypervisor layer |
| Customer-managed | Always includes data classification, identity, and access control |
| Misconfiguration | A customer-side setup mistake — the most common real cause of cloud breaches |
