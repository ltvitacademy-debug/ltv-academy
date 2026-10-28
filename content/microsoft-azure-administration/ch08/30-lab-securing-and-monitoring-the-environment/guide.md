# Lesson 30 — Lab: Securing and Monitoring the Environment

**Chapter 8 · Capstone: Deploying and Administering an Azure Environment · Lesson 30 of 32**

## What you'll learn

- How to scope NSG rules so the web subnet accepts internet traffic but the app subnet only accepts traffic from the web subnet (Chapter 5)
- How to assign RBAC roles to an ops team at resource-group and resource scope instead of handing out subscription-wide access (Chapter 2)
- How to build an Azure Monitor alert, with an action group, that fires on high CPU before anyone has to notice by hand (Chapter 7)
- How to set a budget with an alert threshold so a cost problem gets flagged automatically instead of discovered at month-end (Chapter 7)

## The scenario

Lesson 29 left Briarcliff Systems' environment standing but wide open: no security rules on either subnet, no scoped access for the ops team, and nobody watching it. Before this goes anywhere near real traffic, it needs all four of those closed.

## Step 1 — NSGs that enforce the tier boundary

Each subnet gets its own network security group, and the rules on each one say something different:

```
az network nsg create --resource-group briarcliff-rg --name web-nsg
az network nsg rule create \
  --resource-group briarcliff-rg --nsg-name web-nsg \
  --name Allow-Web --priority 100 --access Allow --protocol Tcp \
  --destination-port-ranges 80 443 --source-address-prefixes Internet

az network nsg create --resource-group briarcliff-rg --name app-nsg
az network nsg rule create \
  --resource-group briarcliff-rg --nsg-name app-nsg \
  --name Allow-From-Web --priority 100 --access Allow --protocol Tcp \
  --destination-port-ranges 8080 --source-address-prefixes 10.20.1.0/24
az network nsg rule create \
  --resource-group briarcliff-rg --nsg-name app-nsg \
  --name Deny-Internet-Inbound --priority 200 --access Deny \
  --protocol '*' --destination-port-ranges '*' --source-address-prefixes Internet

az network vnet subnet update --resource-group briarcliff-rg \
  --vnet-name briarcliff-vnet --name web-subnet --network-security-group web-nsg
az network vnet subnet update --resource-group briarcliff-rg \
  --vnet-name briarcliff-vnet --name app-subnet --network-security-group app-nsg
```

Notice the source on `app-nsg`'s allow rule: `10.20.1.0/24`, the web subnet's own address range — not `Internet`, not `*`. The app subnet only trusts traffic that's already inside the web subnet. That's the tier boundary Lesson 29's missing public IP started; this finishes it in the network layer itself.

## Step 2 — RBAC, scoped to what the ops team actually needs

The ops team gets access to manage VMs in this resource group — not the whole subscription:

```
az role assignment create \
  --assignee-object-id <briarcliff-ops-group-id> --assignee-principal-type Group \
  --role "Virtual Machine Contributor" \
  --scope "/subscriptions/<sub-id>/resourceGroups/briarcliff-rg"
```

Chapter 2's point about RBAC was scope: this grants exactly the permissions needed on exactly this resource group, nothing wider.

## Step 3 — An alert for high CPU

An action group defines who gets notified, and a metric alert defines what triggers it:

```
az monitor action-group create --resource-group briarcliff-rg \
  --name ops-email-ag --short-name opsAG \
  --email-receivers name=OpsTeam email=ops@briarcliffsystems.com

az monitor metrics alert create --resource-group briarcliff-rg \
  --name high-cpu-web-vm1 \
  --scopes "/subscriptions/<sub-id>/resourceGroups/briarcliff-rg/providers/Microsoft.Compute/virtualMachines/web-vm1" \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m --evaluation-frequency 1m \
  --action ops-email-ag
```

If `web-vm1` ever sits above 80% CPU for five straight minutes, the ops team gets an email — not a ticket raised three days later when someone finally checks.

## Step 4 — A budget, with an alert before it's exceeded

The last piece isn't about compute or security at all — it's a spending guardrail on the resource group itself:

```
az consumption budget create \
  --budget-name briarcliff-monthly-budget --amount 150 \
  --resource-group briarcliff-rg --time-grain Monthly \
  --start-date 2026-11-01 --end-date 2027-10-31 \
  --notifications '{"Actual_GreaterThan_80_Percent":{"enabled":true,"operator":"GreaterThan","threshold":80,"contactEmails":["ops@briarcliffsystems.com"]}}'
```

Eighty percent of a $150 monthly budget, $120, is the line that triggers a notification. That alert is exactly what fires at the start of Lesson 31.

## Key terms

| Term | Meaning |
|---|---|
| Network security group (NSG) | A set of allow/deny rules attached to a subnet or NIC, evaluated by priority |
| RBAC role assignment | Binding a role (like Virtual Machine Contributor) to a principal at a specific scope |
| Action group | A reusable notification target (email, SMS, webhook) that alerts can point to |
| Budget | A spending threshold on a scope, with configurable percent-of-threshold notifications |

## Check yourself

Why does `app-nsg`'s allow rule use `10.20.1.0/24` as its source instead of `Internet`? If that rule's source were changed to `Internet`, what would Lesson 29's decision to give `app-vm1` no public IP no longer fully protect against?
