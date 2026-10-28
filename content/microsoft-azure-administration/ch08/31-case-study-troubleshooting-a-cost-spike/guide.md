# Lesson 31 — Case Study: Troubleshooting a Cost Spike

**Chapter 8 · Capstone: Deploying and Administering an Azure Environment · Lesson 31 of 32**

## What you'll learn

- How to read Cost Management's cost-by-resource breakdown to find which resource is actually driving a spend problem (Chapter 7)
- Why a budget alert tells you *that* spending is high but not *why* — and what to check next
- How a VM left running after a one-off task, and a disk provisioned at the wrong tier, both show up as cost problems with different fixes
- How to apply the fix with the same `az` commands this course has used for everything else (Chapter 6)

## The incident

Three weeks into November, the budget alert from Lesson 30 fires: Briarcliff's `briarcliff-rg` resource group has crossed 80% of its $150 monthly budget — on day 19. That's not a bill arriving at month-end; it's a warning with time left to act on it. The alert says *how much*, not *what*. Finding *what* is this lesson.

## Step 1 — Confirm the budget, then look at cost by resource

The budget itself just confirms what the alert already said:

```
az consumption budget list --resource-group briarcliff-rg -o table
```

To find the cause, you need spend broken down by resource, not just a resource-group total:

```
az costmanagement query \
  --type ActualCost --timeframe MonthToDate \
  --dataset-aggregation '{"totalCost":{"name":"PreTaxCost","function":"Sum"}}' \
  --dataset-grouping name=ResourceId type=Dimension \
  --scope "subscriptions/<sub-id>/resourceGroups/briarcliff-rg"
```

The output ranks every resource in the group by actual cost this month. One line sits far above the rest: a VM called `loadtest-vm1` — a resource nobody on the current ticket even remembers creating.

## Step 2 — What is loadtest-vm1, and why is it still running?

```
az vm show --resource-group briarcliff-rg --name loadtest-vm1 \
  --query "{size:hardwareProfile.vmSize, state:instanceView.statuses[1].displayStatus}" \
  -d -o table
```

The output: `Standard_D4s_v3`, `PowerState/running`. That's a 4-vCPU, 16 GB general-purpose size — far bigger than anything else in this environment — and it's been running continuously since a load test two weeks ago that nobody deallocated afterward. A stopped-but-not-deallocated VM still bills for compute; this one was never even stopped.

## Step 3 — The disk, too

While you're looking at `loadtest-vm1`, you check its disk tier as well:

```
az disk list --resource-group briarcliff-rg \
  --query "[?name=='loadtest-vm1_OsDisk']" -o table
```

The disk is `Premium_LRS` — premium SSD performance, priced for latency-sensitive production workloads — attached to a VM that was only ever meant for a one-off load test. The VM size and the disk tier are two separate cost problems with the same root cause: a dev/test resource provisioned like a production one and never cleaned up.

## Step 4 — The fix

The load test is over and nobody needs this VM running continuously, so the fix stops the bleeding and brings the resource in line with what it's actually for:

```
az vm deallocate --resource-group briarcliff-rg --name loadtest-vm1
az vm resize --resource-group briarcliff-rg --name loadtest-vm1 --size Standard_B2s
az disk update --resource-group briarcliff-rg --name loadtest-vm1_OsDisk --sku StandardSSD_LRS
```

Deallocating stops compute billing immediately. Resizing down to `Standard_B2s` and dropping the disk to `StandardSSD_LRS` means that the next time this VM is actually needed for a load test, it starts up costing a fraction of what it was quietly costing for two unattended weeks.

## Why the budget alert alone wasn't enough

The alert told the ops team *that* something was wrong on day 19, which is already better than finding out at month-end. But it couldn't say *what* — that took the cost-by-resource breakdown, which is the same kind of narrowing-down discipline Chapter 7 teaches for Log Analytics queries and metric alerts: don't stop at "something's wrong," keep narrowing until you've found the one resource actually responsible.

## Key terms

| Term | Meaning |
|---|---|
| Cost by resource | A Cost Management view that breaks total spend down per individual resource, not just per resource group |
| Deallocate | Stopping a VM's compute billing while keeping its disks and configuration intact |
| Premium_LRS / StandardSSD_LRS | Managed disk SKUs — premium is priced for low-latency production workloads, standard SSD for everything else |
| Dev/test leftover | A resource provisioned for a temporary task and never resized down or removed once that task ended |

## Check yourself

The fix resizes `loadtest-vm1` down and deallocates it rather than deleting it outright. What would have to be true about this VM for deleting it entirely to be the better call instead?
