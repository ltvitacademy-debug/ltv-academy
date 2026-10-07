# Cloud Cost Basics

Chapter 6 so far has covered what the cloud is, which service model fits a workload, where resources physically live, and who secures what. The piece that ties all of it together every month is the bill — and unlike an owned server, a cloud bill isn't one fixed number. It's a running total built from several independent meters, and understanding what drives it is what separates a predictable cloud budget from a surprise invoice.

## What you'll learn

- The three pricing models cloud providers use, and when each one makes sense
- The main cost drivers behind a typical cloud bill
- How to use a pricing calculator to estimate costs before deploying anything
- Why tagging resources matters once a bill needs to be broken down by team or project

## Three ways to pay

Cloud providers typically offer a few different pricing models for the same underlying resource:

- **Pay-as-you-go** — no upfront commitment, billed by actual usage; the most flexible, usually the most expensive per unit.
- **Reserved** — committing to a resource for one or three years in exchange for a significant discount, well suited to workloads you know will run continuously.
- **Spot (or low-priority)** — unused provider capacity sold at a steep discount, which the provider can reclaim with little notice; well suited to batch jobs that can tolerate interruption.

## What actually drives the bill

A cloud bill isn't one number — it's a sum of several independently metered things: compute (the VMs or app instances running), storage (the data sitting on disk, billed by GB per month), and data egress (traffic leaving the provider's network, which is often billed even though traffic coming in usually isn't). A workload that looks cheap on compute alone can still produce a large bill if it moves a lot of data out to the internet every month.

## Estimating costs before you deploy

Before committing to a design, most providers offer a pricing calculator — a tool where you pick the services and configuration you're planning to use and see an estimated monthly cost, without provisioning anything. Azure's version starts with a product picker, where you search for and add the services you're planning to use.

![The Azure pricing calculator's product picker, showing a search box, service categories, and product cards to add to an estimate.](/courses/it-networking-and-cloud-fundamentals/ch06/27-cloud-cost-basics/product-picker.png)

*Searching and adding services builds up an estimate without provisioning anything.*

Once services are added, the calculator breaks the estimate down into its individual elements — each service, its configuration, and its contribution to the total — so the pieces driving the cost are visible before a single resource goes live.

![The Azure pricing calculator's estimate view, with numbered callouts labeling the service list, configuration options, and running total.](/courses/it-networking-and-cloud-fundamentals/ch06/27-cloud-cost-basics/estimate-elements.png)

*Each numbered element maps to a part of the estimate — service, configuration, and running total.*

## Tagging for accountability

Once an organization has more than a handful of cloud resources, a single combined bill stops being useful on its own — nobody can tell which team or project is driving which cost. **Tags** are key-value labels attached to resources (`team: checkout`, `environment: production`) that let a provider's cost reports be broken down by whoever is actually responsible for each piece, turning one opaque bill into something a finance team can actually act on.

## Key terms

| Term | Meaning |
|---|---|
| Pay-as-you-go | Billing by actual usage with no upfront commitment |
| Reserved capacity | Committing to a resource for 1-3 years for a discount |
| Data egress | Traffic leaving the provider's network, often the hidden cost driver |
| Tag | A key-value label on a resource used to break down billing by team or project |
