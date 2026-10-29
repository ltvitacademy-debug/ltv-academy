# Lesson 1 — The Shared Responsibility Model in Practice, Not in Theory

**Chapter 1 · Cloud Security Posture at Scale · Lesson 1 of 4**

## What you'll learn

- Why "Microsoft secures the cloud, you secure what's in it" is true but
  not specific enough to act on
- How the responsibility line actually moves depending on whether a
  service is IaaS, PaaS, or SaaS — on both Azure and AWS
- Why almost every real-world cloud breach happens inside the
  customer's half of the line, not the provider's
- How to read a service's documentation and correctly place it on the
  responsibility boundary before you ever deploy it

## The model everyone can recite, and almost no one applies correctly

You already know the slogan from earlier courses in this path: the
cloud provider secures *of* the cloud, the customer secures *in* the
cloud. AWS literally uses that phrasing — "security of the cloud" vs.
"security in the cloud" — and Microsoft's version says the same thing
with different words. That's not news to you at this stage.

What trips up engineers who are otherwise technically strong is
treating the model as a fixed 50/50 split instead of what it actually
is: a line that slides along the stack depending on which service
you're looking at. Get that wrong and you'll either leave a gap
assuming "the provider handles that," or waste effort duplicating
controls the provider already owns.

## The line moves with the service model

**Infrastructure as a Service (IaaS)** — an Azure VM, an AWS EC2
instance — puts almost everything above the hypervisor on you. The
provider secures the physical datacenter, the host hardware, and the
hypervisor itself. You own the guest OS patching, the network
configuration (NSGs, security groups), identity and access to the
instance, and anything you install on it. If an EC2 instance gets
compromised because you left port 22 open to `0.0.0.0/0` or never
applied a kernel patch, that is squarely your responsibility — AWS
secured the infrastructure under it exactly as promised.

**Platform as a Service (PaaS)** — Azure SQL Database, Azure App
Service, AWS RDS, AWS Lambda — moves the line up. The provider now
patches the OS, manages the database engine or runtime, and handles
infrastructure-level availability. You're left with data, identity
and access configuration, network rules (firewall rules on Azure SQL,
security groups and VPC placement on RDS), and how you configure the
service itself. A publicly reachable Azure SQL Database with weak
firewall rules is still your fault, even though Microsoft patches the
engine underneath it.

**Software as a Service (SaaS)** — Microsoft 365, a SaaS app running
on AWS — pushes the line almost all the way to the top. The provider
owns the application, the infrastructure, and most platform security.
You're responsible for identity (who can sign in), data classification
and sharing settings, and how you configure the tenant. The 2017
Equifax breach and the long string of exposed-S3-bucket incidents over
the years share one thing in common: in every case, the infrastructure
the provider secured was never breached. The customer-side
configuration was.

## Why this matters for CIS Benchmarks and audits later in this chapter

This isn't an abstract distinction — it's the reason CIS Benchmarks
for Azure and AWS almost entirely test *customer-side* controls:
identity configuration, logging settings, storage access policies,
network exposure. A CIS Benchmark doesn't check whether Microsoft
patched the Azure Resource Manager control plane, because that's not
your job to verify or fix. It checks whether **you** enabled Entra ID
MFA for privileged roles, whether **you** disabled public blob access
on a storage account, whether **you** enabled Azure Policy to enforce
tagging and encryption. Every one of those checks exists because the
responsibility model put that specific control on your side of the
line.

The same logic drives what Microsoft Defender for Cloud's secure score
and AWS Security Hub's security score actually measure: not "is the
underlying platform secure" (assume it is — that's the provider's
contractual obligation) but "have you configured your half correctly."

## Reading a service correctly before you deploy it

In practice, do this for every new service you adopt: find its service
model (IaaS/PaaS/SaaS), then find the one or two places in its
documentation where the provider explicitly states what they manage
vs. what you manage. For Azure, this is usually in the service's
"security baseline" page under Microsoft Learn. For AWS, it's the
service's entry in the AWS shared responsibility documentation plus
its own security chapter. Don't assume based on the service category —
confirm it for that specific service, because the boundary for AWS
Lambda (you own code and IAM execution role permissions, AWS owns the
runtime) is meaningfully different from the boundary for EC2 (you own
the entire guest OS).

## Key terms

| Term | Meaning |
|---|---|
| Security *of* the cloud | The provider's responsibility: physical datacenters, host hardware, hypervisor, and (for PaaS/SaaS) increasing layers of the platform itself |
| Security *in* the cloud | The customer's responsibility: identity, data, network configuration, and workload-level settings — the portion that shifts by service model |
| IaaS | Infrastructure as a Service (Azure VMs, EC2) — customer owns the guest OS up through the application |
| PaaS | Platform as a Service (Azure SQL Database, App Service, RDS, Lambda) — provider manages the runtime/engine; customer manages data, access, and service configuration |
| SaaS | Software as a Service (Microsoft 365) — provider manages nearly everything; customer manages identity, data, and tenant configuration |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does the exact same responsibility model produce a different list of
"your job" items for an Azure VM versus an Azure SQL Database, and why
do CIS Benchmarks almost never test anything on the provider's side of
that line?
