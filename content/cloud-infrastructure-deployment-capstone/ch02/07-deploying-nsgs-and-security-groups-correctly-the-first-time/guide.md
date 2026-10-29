# Lesson 7 — Deploying NSGs and Security Groups Correctly the First Time

**Chapter 2 · Deploying the Network Layer · Lesson 7 of 32**

## What you'll learn

- The real, common deployment mistake: opening rules wide ("allow everything, I'll lock it down
  later") because it's faster during setup, and why that "later" rarely happens
- How to write least-privilege NSG/security group rules at deployment time, using real `az` and
  `aws` syntax
- Why a rule scoped to `0.0.0.0/0` is fundamentally different from one scoped to a specific CIDR
  range, even when both "work"
- How to attach the right rule to the right subnet from Lesson 6, instead of one blanket rule for
  everything

## The mistake: "temporarily" open, permanently open

The single most common real-world security mistake in a new deployment isn't a sophisticated
attack — it's a rule like this, written during setup to get something working fast:

```bash
# The common mistake — written "temporarily" during setup
az network nsg rule create \
  --resource-group rg-prod --nsg-name nsg-web \
  --name allow-everything --priority 100 \
  --source-address-prefixes '*' --destination-port-ranges '*' \
  --access Allow --protocol '*'
```

That rule allows any protocol, on any port, from any source (`*` means "anywhere," the same as
`0.0.0.0/0`). It gets written because the engineer deploying the environment wants to stop
fighting connectivity errors and come back to tighten it "once everything's confirmed working."
In a real environment under real deadline pressure, that cleanup pass gets deprioritized,
forgotten, or assumed to be someone else's job — and the rule sits there, often for the life of
the deployment, as the single widest-open door into the network.

## Least privilege, written at deployment time

The fix isn't a cleanup step scheduled for later — it's writing the narrow rule in the first
place, before anything is allowed through:

```bash
# Least privilege — only what's actually needed, from the start
az network nsg rule create \
  --resource-group rg-prod --nsg-name nsg-web \
  --name allow-https-inbound --priority 100 \
  --source-address-prefixes '203.0.113.0/24' \
  --destination-port-ranges 443 \
  --access Allow --protocol Tcp
```

And the AWS equivalent:

```bash
aws ec2 authorize-security-group-ingress \
  --group-id sg-0abc123456789def0 \
  --protocol tcp --port 443 \
  --cidr 203.0.113.0/24
```

Both rules allow exactly one thing: HTTPS (port 443) from one known range (`203.0.113.0/24` — a
corporate office or a known client block, not the whole internet). Everything else stays denied
by default, because both Azure NSGs and AWS security groups deny all inbound traffic that no rule
explicitly allows. The difference between this and the "allow everything" rule above isn't effort
— it's the same number of commands, just with the real source and port filled in instead of a
wildcard.

## One rule set per tier, not one rule for everything

Lesson 6 built three subnets — web, app, and data — specifically so each tier can get its own NSG
or security group with its own least-privilege rules:

```text
nsg-web:  allow 443 from the internet (or a known range), nothing else inbound
nsg-app:  allow the app port ONLY from snet-web's range, nothing from the internet
nsg-data: allow the database port ONLY from snet-app's range, nothing from snet-web or the internet
```

A single wide-open NSG attached to every subnet collapses that whole design — it means a database
tier that was supposed to be reachable only from the app tier is, in practice, reachable from
anywhere, because the "allow everything" rule never got tightened back down.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Allowing only the specific access actually required, nothing broader, from the moment a rule is created |
| `0.0.0.0/0` / `*` | A rule scope meaning "any source" — the widest possible, and rarely what a production rule should use |
| Default deny | Both Azure NSGs and AWS security groups block all inbound traffic unless a rule explicitly allows it |
| Rule per tier | Scoping each subnet's NSG/security group to only the access that specific tier needs |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does an NSG rule scoped to
`203.0.113.0/24` on port 443 behave differently from one scoped to `*` on `*`, even on a day when
no attack happens and both rules "work fine"?
