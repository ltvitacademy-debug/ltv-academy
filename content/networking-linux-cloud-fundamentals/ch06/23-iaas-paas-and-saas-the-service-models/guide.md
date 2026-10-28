# Lesson 23 — IaaS, PaaS & SaaS: The Cloud Service Models

**Chapter 6 · Cloud Computing Fundamentals · Lesson 23 of 32**

## What you'll learn

- What "as a service" actually means, and the three core cloud service models built on it: IaaS, PaaS, and SaaS
- Real examples of each — AWS EC2 and Azure Virtual Machines (IaaS), Azure App Service and AWS Elastic Beanstalk (PaaS), Microsoft 365 and Salesforce (SaaS)
- Exactly which layer of the stack you manage versus which layer the provider manages, in each model
- How to recognize which model a cloud product falls into, just from what you're asked to configure

## IaaS: the provider stops at the hardware

**Infrastructure as a Service** is the model closest to running your own server, minus owning the
hardware. The provider manages the physical datacenter, the physical servers, the storage, the
network backbone, and the hypervisor that carves physical machines into virtual ones. You get a
virtual machine, and from there up, it's yours: you install and patch the operating system, you
install your runtime and your application, you manage your own data, and you configure its
network and firewall rules.

**AWS EC2** and **Azure Virtual Machines** are the textbook examples. If you've ever had to decide
which Windows Server or Linux version to install, or run `apt update` on a cloud server yourself,
you were working at the IaaS layer.

## PaaS: the provider manages the OS too

**Platform as a Service** removes the operating system and runtime from your responsibility
entirely. You deploy your application code — not a whole server image — and the provider handles
the OS, the runtime (like .NET, Node.js, or Python), patching, and scaling the VMs underneath it.

**Azure App Service** and **AWS Elastic Beanstalk** are real PaaS products: you push your code,
pick a runtime version, and the platform runs it. You manage your application and your data; you
never SSH into a server to patch it, because there usually isn't one you can reach.

## SaaS: everything is managed, you just use it

**Software as a Service** is fully managed, ready-to-use software. **Microsoft 365**,
**Salesforce**, Google Workspace, and Slack are all SaaS. The provider manages the entire stack,
including the application itself. You don't manage infrastructure, an OS, a runtime, or even the
application's code — you manage your usage of it: user accounts, settings, and the data you put
into it.

## Layer by layer: who manages what

A single mental model makes all three click at once. Picture the stack as six layers: datacenter
hardware, virtualization, operating system, runtime, application, and data.

```
Layer           On-prem   IaaS        PaaS        SaaS
Datacenter      You       Provider    Provider    Provider
Virtualization  You       Provider    Provider    Provider
Operating Sys   You       You         Provider    Provider
Runtime         You       You         Provider    Provider
Application     You       You         You         Provider
Data            You       You         You         You
```

Notice the pattern: the line between "provider" and "you" simply slides upward as you move from
IaaS to PaaS to SaaS. Data stays your responsibility in every model — that detail matters enough
that the next lesson is built entirely around it.

## Choosing between them

A team running a legacy application that needs a specific, unusual Windows Server configuration
needs the full control of **IaaS**. A team building a new web app that just wants to deploy code
without managing servers reaches for **PaaS**. A team that just needs email and a CRM, with no
custom software to build at all, buys **SaaS** and is done.

## Key terms

| Term | Meaning |
|---|---|
| IaaS | Infrastructure as a Service — provider manages hardware and virtualization; you manage the OS up |
| PaaS | Platform as a Service — provider manages the OS and runtime too; you manage your app and data |
| SaaS | Software as a Service — provider manages the entire stack; you just use the application |
| Hypervisor | The virtualization layer that carves physical hardware into isolated virtual machines |

## Check yourself

Azure App Service is PaaS, not IaaS. Looking at the layer-by-layer breakdown above, what's the one
thing you'd have to manage on a plain Azure Virtual Machine that you don't have to manage on
Azure App Service?
