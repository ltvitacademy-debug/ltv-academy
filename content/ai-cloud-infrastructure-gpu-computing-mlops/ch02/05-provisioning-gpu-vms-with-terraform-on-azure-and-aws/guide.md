# Lesson 5 — Provisioning GPU VMs with Terraform on Azure and AWS

**Chapter 2 · Provisioning GPU Infrastructure · Lesson 1 of 4**

## What you'll learn

- Why GPU capacity behaves differently from ordinary compute quota, and
  why you request it *before* you need it, not when a training run is
  blocked on it
- How to write a real Terraform resource block for an Azure NC-series
  GPU VM
- How to write a real Terraform resource block for an AWS P-series GPU
  instance
- What actually changes in your Terraform workflow versus the
  non-GPU VMs you provisioned in the Terraform course — same
  `azurerm_linux_virtual_machine` and `aws_instance` resources, a
  different `size`/`instance_type` and a few GPU-specific gotchas

## GPU capacity is a quota problem before it's a Terraform problem

Every Azure subscription and AWS account ships with a default vCPU
quota per VM family, and GPU families are usually the stingiest ones —
sometimes a fresh subscription has a **zero** quota for GPU families
until you explicitly request an increase. This isn't a Terraform
concern at all, but it bites people at the worst time: `terraform
apply` fails with a quota or capacity error after everything else was
already correct.

On Azure, check current GPU family quota with:

```
az vm list-usage --location eastus -o table
```

Look for a line like `Standard NCADSA100v4 Family vCPUs`. If the
current count is at the limit, request an increase in the Azure
Portal under **Quotas**, scoped to the exact VM family and region
you're deploying into — quota is regional, so passing on `eastus` and
getting approved in `westus2` doesn't help if your Terraform config
targets `eastus`.

On AWS, GPU instance quota is tracked under **Service Quotas** →
Amazon EC2, as a running-instance vCPU quota per instance family (for
example, the quota governing P-series on-demand instances). Request an
increase from the Service Quotas console before you plan a training
run, since approval can take anywhere from minutes to a couple of
business days depending on the size of the request.

## An Azure NC-series GPU VM in Terraform

The resource type is the same `azurerm_linux_virtual_machine` you've
already used — the GPU-specific decision is entirely in `size`:

```hcl
resource "azurerm_linux_virtual_machine" "gpu_train" {
  name                = "gpu-train-01"
  resource_group_name = azurerm_resource_group.ml.name
  location            = azurerm_resource_group.ml.location
  size                = "Standard_NC24ads_A100_v4"
  admin_username      = "mladmin"

  network_interface_ids = [azurerm_network_interface.gpu.id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
    disk_size_gb          = 256
  }

  source_image_reference {
    publisher = "microsoft-dsvm"
    offer     = "ubuntu-hpc"
    sku       = "2204"
    version   = "latest"
  }

  admin_ssh_key {
    username   = "mladmin"
    public_key = file("~/.ssh/id_rsa.pub")
  }
}
```

`Standard_NC24ads_A100_v4` is one NVIDIA A100 GPU with 24 vCPUs and 220
GiB of RAM attached — the NC A100 v4 family is Azure's mainstream
single/multi-GPU A100 tier. The `microsoft-dsvm`/`ubuntu-hpc` image is
a real Azure Marketplace image that ships with NVIDIA drivers and CUDA
pre-installed, which saves you the driver bootstrap work you'll see in
the next lesson — useful for getting started, though plenty of
production pipelines still build their own image to pin an exact
driver/CUDA version.

## An AWS P-series GPU instance in Terraform

Same pattern with `aws_instance`:

```hcl
data "aws_ami" "deep_learning" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["Deep Learning AMI GPU PyTorch*"]
  }
}

resource "aws_instance" "gpu_train" {
  ami                    = data.aws_ami.deep_learning.id
  instance_type          = "p4d.24xlarge"
  subnet_id              = aws_subnet.training.id
  key_name               = aws_key_pair.ml.key_name
  vpc_security_group_ids = [aws_security_group.gpu.id]

  root_block_device {
    volume_size = 500
    volume_type = "gp3"
  }

  tags = {
    Name = "gpu-train-01"
  }
}
```

`p4d.24xlarge` gives you 8 NVIDIA A100 GPUs with NVLink between them —
AWS's workhorse multi-GPU training instance, sitting above `p3.2xlarge`
(a single older V100, fine for smaller jobs) and below `p5.48xlarge`
(8 H100s, AWS's current flagship). The `data.aws_ami` lookup finds
AWS's own Deep Learning AMI, which — like the Azure DSVM image — comes
with drivers and CUDA already installed, so you can skip straight to
running a workload rather than bootstrapping the GPU stack yourself.

## Gotchas specific to GPU VMs

A few things that don't come up with ordinary compute:

- **Not every region has every GPU family.** Check availability with
  `az vm list-skus --location <region> --size Standard_NC --output
  table` or the AWS region table before writing a config that assumes
  a family exists where you're deploying.
- **Spot/low-priority capacity for GPUs is especially volatile** —
  a GPU spot instance can be reclaimed much more aggressively than a
  general-purpose one, since GPU capacity is scarcer overall.
- **Placement matters for multi-VM training.** A cluster of GPU VMs
  that need low-latency interconnect between them should land in the
  same Azure proximity placement group or AWS cluster placement group
  — a concern this course picks back up when it covers distributed
  training infrastructure.

## Key terms

| Term | Meaning |
|---|---|
| GPU quota | A per-family, per-region limit on how many GPU vCPUs a subscription/account can run at once; often zero by default and must be explicitly raised |
| NC-series (Azure) | Azure's GPU VM family line; `NC A100 v4` is the current A100 tier, sized like `Standard_NC24ads_A100_v4` |
| P-series (AWS) | AWS's GPU instance family line; `p4d.24xlarge` (8x A100) and `p5.48xlarge` (8x H100) are the multi-GPU training workhorses |
| Deep learning VM image | A Marketplace/AMI image (Azure DSVM, AWS Deep Learning AMI) that ships with GPU drivers and CUDA pre-installed |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
is GPU quota something you check *before* writing Terraform at all,
and what's the one line that actually changes between a GPU VM
resource block and a regular compute VM resource block on both Azure
and AWS?
