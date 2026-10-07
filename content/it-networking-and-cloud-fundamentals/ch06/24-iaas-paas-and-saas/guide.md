# IaaS, PaaS & SaaS

The last lesson established that cloud providers rent out computing resources instead of selling hardware — but "cloud" isn't one single product. A provider can hand you anything from a bare virtual machine to a finished application you just log into, and how much control you keep (and how much work you still have to do) depends entirely on which of these three service models you're buying.

## What you'll learn

- The three cloud service models and the one axis — how much you manage versus how much the provider manages — that separates them
- Concrete examples of each model, using services you've already encountered in this course
- How to decide which model fits a given workload
- Why this distinction sets up the next lesson's conversation about security responsibility

## The sliding scale of control

Every cloud service sits somewhere on a line between "you manage almost everything above the physical hardware" and "you manage almost nothing." The three common stopping points on that line are:

- **IaaS (Infrastructure as a Service)** — the provider hands you raw compute, storage, and networking: virtual machines, virtual networks, disks. You install and manage the OS, runtime, and application yourself, exactly like the VMs from Chapter 1, just running on someone else's hypervisor instead of your own.
- **PaaS (Platform as a Service)** — the provider also manages the OS, runtime, and patching. You just deploy your application code and the platform runs it. There's no server to log into or patch.
- **SaaS (Software as a Service)** — the provider manages everything, including the application itself. You just use it through a browser or an app, with a login and a subscription.

## Northbridge Retail's mix of all three

Few real organizations pick just one model — most run a mix, matched to each workload's needs. Northbridge Retail's setup is typical:

- Their custom checkout service, with specific OS-level tuning the team depends on, runs on **IaaS** virtual machines they configure and patch themselves.
- Their public marketing website, a fairly standard web app with no unusual infrastructure needs, runs on a **PaaS** web app service — they push code, the platform handles the server underneath.
- Their email and CRM run entirely on **SaaS** products like Microsoft 365 and Salesforce — nobody at Northbridge Retail manages a server for either one; they just log in.

## Choosing a model for a given workload

More control (IaaS) means more operational work — patching, scaling, securing the OS — but also more flexibility when an application needs something nonstandard. Less control (PaaS, SaaS) means less work, faster deployment, and a smaller team needed to run it, but also less ability to customize what's under the hood. The right choice usually comes down to whether the workload needs that extra flexibility badly enough to justify managing it.

## Key terms

| Term | Meaning |
|---|---|
| IaaS | Infrastructure as a Service — rented VMs, storage, and networking; you manage the OS up |
| PaaS | Platform as a Service — the provider manages the OS and runtime; you deploy code only |
| SaaS | Software as a Service — a finished application you use, with the provider managing everything |
| Control vs. effort tradeoff | More control (IaaS) means more management work; less control (SaaS) means less |
