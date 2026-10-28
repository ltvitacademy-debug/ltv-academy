# Lesson 31 — Case Study: Troubleshooting an Unreachable Instance

**Chapter 8 · Capstone: Deploying and Administering an AWS Environment · Lesson 31 of 32**

## What you'll learn

- The standard four-question diagnostic sequence for "I can't SSH into my instance"
- How to read `describe-instances`, `describe-security-groups`, and `describe-route-tables` output for a real answer, not a guess
- Why the same CLI (Chapter 5) that builds an environment is also the fastest way to debug one
- How a single copy-pasted subnet ID becomes a reachability problem two chapters later

## The incident

Three weeks after Lesson 30's guardrails went in, Meridian's ops team launches a third instance, `meridian-web2`, to handle a traffic bump — and nobody can SSH into it. The AWS Budget alert from Lesson 30 isn't involved this time; this is a plain connectivity problem, and it gets worked the same methodical way every time: instance state, then public IP, then security group, then route table. Skipping ahead to a guess almost always costs more time than just running the four commands in order.

## Question 1: Is the instance even running?

```
aws ec2 describe-instances --instance-ids i-0meridianweb2 \
  --query "Reservations[].Instances[].State.Name"
```

Output: `"running"`. The instance itself is healthy — this isn't a crashed-boot problem, which rules out an entire category of causes before anyone touches a security group.

## Question 2: Does it actually have a public IP?

```
aws ec2 describe-instances --instance-ids i-0meridianweb2 \
  --query "Reservations[].Instances[].PublicIpAddress"
```

Output: `null`. There it is — `meridian-web2` has no public IP address at all, which means no amount of security group tuning will ever make SSH reach it from the office. That single empty field is worth more than ten minutes of staring at rules.

## Question 3: Which subnet is it actually in?

```
aws ec2 describe-instances --instance-ids i-0meridianweb2 \
  --query "Reservations[].Instances[].SubnetId"
```

Output: `subnet-0meridianpriv` — `meridian-private-subnet`, from Lesson 29. The ops team meant to launch a second web-tier instance into `meridian-public-subnet`, and instead copy-pasted the app tier's subnet ID from an old command in their shell history. `meridian-web2` is sitting in the private subnet, which never had `map-public-ip-on-launch` turned on and has no route to the internet gateway — exactly the two things Lesson 29 pointed out make a subnet actually public.

## Question 4: Confirm the route table has nothing to do with it

```
aws ec2 describe-route-tables \
  --filters Name=association.subnet-id,Values=subnet-0meridianpriv
```

The result shows only a local route and the outbound-only NAT path — no `0.0.0.0/0 → igw-...` entry, confirming the private subnet's route table was never the issue to fix. The root cause isn't a missing route or a misconfigured security group; it's that the instance is in the wrong subnet entirely.

## The fix

An EC2 instance can't be moved between subnets after launch — the fix is to terminate the misplaced instance and relaunch it correctly:

```
aws ec2 terminate-instances --instance-ids i-0meridianweb2

aws ec2 run-instances --image-id ami-0abcd1234efgh5678 --instance-type t3.micro \
  --subnet-id subnet-0meridianpub --security-group-ids sg-0meridianweb \
  --associate-public-ip-address --key-name meridian-key \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=meridian-web2}]'
```

This time the subnet ID matches the public subnet from Lesson 29, and the new `meridian-web2` gets a public IP immediately. Longer term, Meridian's ops team also starts using AWS Systems Manager Session Manager for admin access instead of direct SSH — it works over the AWS API with no open port 22 and no public IP required at all, removing this entire category of mistake going forward.

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic sequence | A fixed order of checks (state, IP, security group, route table) run before guessing at a cause |
| `describe-instances` | The CLI call that reports an instance's state, IP addresses, and subnet placement |
| Root cause vs. symptom | "Can't SSH in" is the symptom; "launched into the wrong subnet" is the root cause |
| Session Manager | An AWS service that provides shell access without SSH, an open port, or a public IP |

## Check yourself

The route table check in Question 4 came back clean — no missing route, nothing to fix there. Why was it still worth running, instead of skipping straight from "no public IP" to the fix?
