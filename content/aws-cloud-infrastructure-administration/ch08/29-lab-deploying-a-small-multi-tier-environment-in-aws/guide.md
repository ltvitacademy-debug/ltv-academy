# Lesson 29 — Lab: Deploying a Small Multi-Tier Environment in AWS

**Chapter 8 · Capstone: Deploying and Administering an AWS Environment · Lesson 29 of 32**

## What you'll learn

- How a VPC, a public subnet, and a private subnet (Chapter 4) combine into the standard web-tier/app-tier shape
- Where an internet gateway and a route table have to sit before a public subnet is actually public
- How to launch two EC2 instances (Chapter 2) into two different subnets with two different networking postures
- Why app data goes into an S3 bucket (Chapter 3) instead of onto either instance's local disk

## The scenario: Meridian Outfitters

Meridian Outfitters, a small online retailer, needs a first real AWS environment for a new order-lookup tool: a web tier the public can reach, an app tier that talks to the web tier but not to the internet directly, and a place to store the data both tiers touch. This lesson builds exactly that, using the same `aws` CLI (Chapter 5) you've used all course, in the same order a SysOps admin would actually run it.

## Step 1: The VPC and its two subnets

Everything else lives inside one VPC. Chapter 4's CIDR planning says carve it into a public slice and a private slice:

```
aws ec2 create-vpc --cidr-block 10.50.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=meridian-vpc}]'

aws ec2 create-subnet --vpc-id vpc-0meridian01 --cidr-block 10.50.1.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=meridian-public-subnet}]'

aws ec2 create-subnet --vpc-id vpc-0meridian01 --cidr-block 10.50.2.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=meridian-private-subnet}]'
```

`meridian-public-subnet` (10.50.1.0/24) will hold the web tier. `meridian-private-subnet` (10.50.2.0/24) will hold the app tier. Nothing about a subnet is public or private yet by itself — that's decided by what you attach to it next.

## Step 2: What actually makes a subnet "public"

A subnet is public only when three things are true: it has a route to an internet gateway, instances in it get a public IP, and its security group allows the traffic you want. Step one is the gateway and the route:

```
aws ec2 create-internet-gateway \
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=meridian-igw}]'

aws ec2 attach-internet-gateway --vpc-id vpc-0meridian01 --internet-gateway-id igw-0meridian01

aws ec2 create-route-table --vpc-id vpc-0meridian01 \
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=meridian-public-rt}]'

aws ec2 create-route --route-table-id rtb-0meridianpub \
  --destination-cidr-block 0.0.0.0/0 --gateway-id igw-0meridian01

aws ec2 associate-route-table --subnet-id subnet-0meridianpub --route-table-id rtb-0meridianpub

aws ec2 modify-subnet-attribute --subnet-id subnet-0meridianpub --map-public-ip-on-launch
```

That last command is easy to forget and is exactly why Lesson 31 exists — an instance can have a perfect route to the internet gateway and still be unreachable if it never got a public IP in the first place. `meridian-private-subnet` gets no route to the internet gateway at all; that's what makes it private, not a setting on the subnet itself.

## Step 3: Two security groups, two postures

Chapter 2's key pairs and security groups come back here, split by tier:

```
aws ec2 create-security-group --group-name meridian-web-sg \
  --description "Meridian web tier" --vpc-id vpc-0meridian01

aws ec2 create-security-group --group-name meridian-app-sg \
  --description "Meridian app tier" --vpc-id vpc-0meridian01
```

Both groups start locked down — no inbound rules yet. Lesson 30 is where each one gets scoped to exactly what it needs; this lesson just gets the environment standing.

## Step 4: Launching the web and app instances

```
aws ec2 run-instances --image-id ami-0abcd1234efgh5678 --instance-type t3.micro \
  --subnet-id subnet-0meridianpub --security-group-ids sg-0meridianweb \
  --associate-public-ip-address --key-name meridian-key \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=meridian-web1}]'

aws ec2 run-instances --image-id ami-0abcd1234efgh5678 --instance-type t3.micro \
  --subnet-id subnet-0meridianpriv --security-group-ids sg-0meridianapp \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=meridian-app1}]'
```

`meridian-web1` lands in the public subnet with a public IP; `meridian-app1` lands in the private subnet with none. Same AMI, same instance type, two completely different reachability stories — purely a function of which subnet and which flags you passed.

## Step 5: Shared storage for both tiers

Neither tier's local disk is the right place for order data both instances need. Chapter 3 says that's an S3 job:

```
aws s3api create-bucket --bucket meridian-outfitters-app-data --region us-east-1
```

Bucket names are global across all of AWS, which is why this one carries the company name, not just "app-data." Both `meridian-web1` and `meridian-app1` will read and write here — how they're allowed to, without anyone hardcoding a key, is Lesson 30's job.

## Key terms

| Term | Meaning |
|---|---|
| Public subnet | A subnet with a route to an internet gateway, used with instances that have a public IP |
| Private subnet | A subnet with no route to an internet gateway — reachable only from inside the VPC |
| Internet gateway | The VPC component that gives a route table a path to the public internet |
| `--associate-public-ip-address` | The `run-instances` flag that gives a new instance a public IP at launch |

## Check yourself

`meridian-web1` and `meridian-app1` were launched with the identical `run-instances` command except for `--subnet-id`, `--security-group-ids`, and `--associate-public-ip-address`. Which one of those three differences, by itself, is the reason `meridian-app1` has no public IP at all?
