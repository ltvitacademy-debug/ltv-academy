# Lesson 8 — Verifying Network Connectivity Before Moving On

**Chapter 2 · Deploying the Network Layer · Lesson 8 of 32**

## What you'll learn

- Why you verify the network before deploying anything else on top of it, instead of assuming
  Lessons 6 and 7 worked
- The real practice: deploy one test VM/instance, confirm it can reach what it's supposed to
  reach, and confirm it **cannot** reach what it isn't supposed to reach
- Real tools for checking this in Azure and AWS, plus simple ones that work in both
- Why catching a misconfiguration here is cheap, and why catching the same misconfiguration later
  — after Chapter 3's compute and storage are already deployed on top of it — is not

## Deploy one test resource, not the whole environment

The network from Lessons 6 and 7 looks correct — subnets sized right, NSG/security group rules
scoped to specific sources and ports. "Looks correct" and "is correct" aren't the same thing, and
the cheap way to close that gap is deploying a single, disposable test VM or EC2 instance into
each tier **before** deploying the real workload:

```bash
az vm create \
  --resource-group rg-prod --name vm-test-web \
  --vnet-name vnet-prod --subnet snet-web --nsg nsg-web \
  --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys
```

```bash
aws ec2 run-instances \
  --image-id ami-0abcd1234efgh5678 --instance-type t3.micro \
  --subnet-id subnet-0abc123456789def0 \
  --security-group-ids sg-0abc123456789def0
```

One small VM in `snet-web`, one in `snet-app`, one in `snet-data` — each using the real NSG or
security group from Lesson 7 — is enough to test the actual rules, not a theoretical reading of
them.

## Confirm what should work, and what shouldn't

Real verification checks **both** directions, not just "can I reach it":

```text
From vm-test-web, confirm:
  -> CAN reach the internet on 443          (the rule Lesson 7 wrote allows it)
  -> CANNOT reach vm-test-data on its DB port (nsg-data only allows snet-app's range)

From vm-test-app, confirm:
  -> CAN reach vm-test-data on the DB port   (nsg-data allows snet-app's range)
  -> CANNOT be reached directly from the internet (no public-facing rule exists)
```

Simple tools confirm each direction: `ping` for basic reachability, `Test-NetConnection
-ComputerName <ip> -Port 443` on Windows, `nc -vz <ip> <port>` or `curl` on Linux/macOS to test a
specific port. Both clouds also have purpose-built tools for this: **Azure Network Watcher**'s IP
flow verify and connection troubleshoot features, and **AWS Reachability Analyzer**, both of which
trace a specific path through the NSGs/security groups and route tables and report exactly which
rule allowed or blocked it — more useful than a plain connection test when something fails and you
need to know *why*.

## Why catching it here is cheap

If `vm-test-data` turns out to be reachable from the internet, the fix right now is: edit one NSG
rule, redeploy the test VM, verify again. Total cost: a few minutes, and nothing else was ever
exposed. If that same misconfiguration isn't caught until Chapter 3, after real compute, a real
database, and real data are deployed into `snet-data`, the fix is the same NSG edit — but now it
happens after a production database may have been reachable from the internet for however long it
took to notice, and the incident write-up, not just the fix, becomes part of the work. The
verification step doesn't make the network more correct than it already was; it makes finding out
*when* it's wrong a five-minute problem instead of an incident.

## Key terms

| Term | Meaning |
|---|---|
| Test VM / test instance | A disposable compute resource deployed into a subnet specifically to verify its network rules, before real workloads go there |
| Positive and negative verification | Confirming both that allowed traffic works and that disallowed traffic is actually blocked |
| Azure Network Watcher | Azure's tool for tracing a specific network path and reporting which NSG rule allowed or blocked it |
| AWS Reachability Analyzer | AWS's equivalent tool for tracing a path through security groups and route tables |

## Check yourself

You're ready for Lesson 9 (Chapter 3: **Deploying VMs and EC2 Instances into the Network**) when
you can explain, without looking: why does verifying that `vm-test-data` *cannot* be reached from
the internet matter just as much as verifying that `vm-test-web` *can* be reached on port 443?
