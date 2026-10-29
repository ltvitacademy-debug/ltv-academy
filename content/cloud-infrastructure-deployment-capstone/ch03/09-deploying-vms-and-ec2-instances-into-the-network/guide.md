# Lesson 9 — Deploying VMs and EC2 Instances into the Network

**Chapter 3 · Deploying Compute & Storage · Lesson 9 of 32**

## What you'll learn

- Why deploying a VM or EC2 instance in a real environment means deploying it *into* the VNet/subnet and VPC/subnet Chapter 2 already built — not launching into whatever network the platform defaults to
- How to pass the exact subnet and NSG, or subnet and security group, at creation time so the instance lands on the tier you designed
- What happens, concretely, if you omit those flags and let Azure or AWS supply a default
- Why this step has to come after Lesson 8's connectivity verification, not before it

## Same commands, a different intent

You already know `az vm create` and `aws ec2 run-instances` from the Azure and AWS administration courses earlier in this path — the options, the size families, the image aliases, none of that changes here. What changes is intent. Earlier, you were learning what each flag does in isolation. Now you're deploying a real VM or EC2 instance into a network that already exists: the VNet or VPC, the subnet, and the NSG or security group that Chapter 2 built and Lesson 8 already confirmed is wired correctly. Every launch command in this lesson names those exact resources. None of them let the platform choose for you.

## Azure: naming the VNet, subnet, and NSG explicitly

```
az vm create \
  --resource-group rg-prod-eastus \
  --name vm-app01 \
  --image Ubuntu2204 \
  --size Standard_D2s_v5 \
  --vnet-name vnet-prod-eastus \
  --subnet snet-app-tier \
  --nsg nsg-app-tier \
  --public-ip-address "" \
  --admin-username azureuser \
  --generate-ssh-keys
```

`--vnet-name` and `--subnet` put the instance's NIC inside `snet-app-tier`, the subnet Chapter 2 built for this tier — not a new default VNet Azure would otherwise create for you. `--nsg` attaches the NSG Lesson 7 configured, instead of the default inbound rule `az vm create` generates on its own. `--public-ip-address ""` is the explicit override: an empty string tells Azure not to create the public IP it would otherwise provision automatically, because `snet-app-tier` is a private, internal subnet — this VM has no business being reachable from the internet directly.

## AWS: the same discipline with run-instances

```
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.medium \
  --subnet-id subnet-0a1b2c3d4e5f67890 \
  --security-group-ids sg-0123456789abcdef0 \
  --key-name app-tier-keypair \
  --count 1
```

`--subnet-id` places the instance's ENI inside the specific private subnet Chapter 2 built, and `--security-group-ids` attaches the security group Lesson 7 defined for this tier — not the account's default VPC and default security group. Because that subnet's route table has no route to an internet gateway (the private-subnet design from Lesson 6), this instance gets no public IP regardless of any auto-assign setting, the same public/private distinction covered back in the AWS compute chapter.

## What skipping these flags actually costs you

Omit `--subnet-id` on `run-instances`, or `--vnet-name`/`--subnet` on `az vm create`, and the platform doesn't fail the launch — it quietly substitutes a default: AWS's default VPC and its default subnet, or a brand-new VNet Azure creates on the fly. The instance boots successfully, which is exactly the problem. It's running, it looks fine, and it's sitting on a network nobody designed, with none of Chapter 2's NSG or security group rules applied to it. That gap usually surfaces later, as an unreachable instance or an unexpectedly open one, which is a worse time to find it than at launch.

## Key terms

| Term | Meaning |
|---|---|
| `--vnet-name` / `--subnet` / `--nsg` | `az vm create` flags that place a VM's NIC in a named VNet, subnet, and NSG instead of Azure's defaults |
| `--subnet-id` / `--security-group-ids` | `run-instances` flags that place an EC2 instance's ENI in a named subnet and attach named security groups |
| Default VPC / default VNet | The fallback network a platform silently uses when you don't specify one at launch |
| Private subnet | A subnet with no route to an internet gateway — the correct home for an internal application tier |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what does Azure or AWS actually do if you launch a VM or EC2 instance without specifying a subnet, and why is that the wrong outcome for a production deployment?
