# Lesson 25 — The Shared Responsibility Model, Revisited for Compliance

**Chapter 7 · Compliance in the Cloud · Lesson 25 of 32**

## What you'll learn

- A quick recap of security OF the cloud vs. security IN the cloud, and why this chapter revisits that split through a compliance lens instead of a technical one
- Why a cloud provider's own SOC 2 or ISO 27001 certification does not, by itself, make your account or application compliant
- What "compliance inheritance" actually covers — and the hard line where it stops
- Where to actually pull a provider's own compliance documents when an auditor asks to see them

## The same line, read for compliance instead of configuration

Earlier in this path you learned the shared responsibility model: the provider owns **security OF
the cloud** — the physical datacenters, the host hardware, the hypervisor, the network backbone —
and you own **security IN the cloud** — your data, your identity and access controls, and however
you've configured the services you're renting. That split doesn't change for compliance. It just
gets read differently: it tells you exactly which half of any audit belongs to AWS or Microsoft,
and which half belongs entirely to you.

## A provider's certificate doesn't certify you

Both AWS and Microsoft Azure hold real, independently audited credentials — SOC 2 Type II reports
and ISO 27001 certification among them — covering their own infrastructure. It's tempting to treat
that as the whole answer: "we're compliant because we run on Azure." An auditor won't accept that.
Azure's ISO 27001 certificate attests to Microsoft's own controls over the datacenter, the
hypervisor, and the network — the "OF" layer. It says nothing about whether *your* storage account
is publicly readable, whether *your* access policies are too permissive, or whether *your* logging
is even turned on. Those are configuration decisions nobody but you made, and no provider
certificate covers them.

## Compliance inheritance — what it actually buys you

The legitimate shortcut here is called **compliance inheritance**: when your own auditor is
reviewing your organization, they typically don't re-test AWS's or Azure's physical security
themselves — they accept the provider's own audited report as proof for that slice of the
environment, treating the cloud provider as what SOC 2 language calls a **sub-service
organization**. That's a real, standard practice, and it saves everyone from re-auditing a
hyperscaler's datacenter floor. But it only ever covers the infrastructure layer the provider
controls. The access controls, encryption settings, and logging you configured are still entirely
your own audit scope, inherited from no one.

## Where to actually get the provider's documents

When an auditor asks for proof of the provider's own certification, you don't file a support
ticket and wait. AWS publishes its compliance reports and certificates through **AWS Artifact**, a
self-service portal built into the AWS console. Microsoft publishes the Azure equivalent through
the **Microsoft Service Trust Portal**. Both exist specifically so a customer can pull the
provider's SOC 2 report or ISO 27001 certificate on demand and hand it straight to an auditor.

## Key terms

| Term | Meaning |
|---|---|
| Compliance inheritance | Relying on a cloud provider's own independently audited controls to satisfy the infrastructure portion of your own compliance audit |
| Sub-service organization | SOC 2 terminology for a vendor, such as a cloud provider, whose controls a service organization's audit relies on |
| AWS Artifact | AWS's self-service console portal for downloading its own compliance reports and certificates |
| Microsoft Service Trust Portal | Microsoft's equivalent portal for Azure's own audit reports and compliance documentation |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why doesn't Azure's ISO 27001
certificate, by itself, make a company's Azure-hosted application compliant with ISO 27001?
