# Lesson 29 — Lab: Provisioning a GPU Training Cluster with Terraform

**Chapter 8 · Capstone: Building Production AI Infrastructure · Lesson 29 of 32**

## What you'll learn

- How to turn the separate pieces from Chapters 1–2 — instance family selection, Terraform
  provisioning, driver/CUDA setup, and Kubernetes GPU scheduling — into one coherent, working
  GPU training cluster, start to finish
- How to provision a small fleet of real GPU VMs with Terraform and bootstrap each one into a
  working Kubernetes GPU node, rather than treating infrastructure and cluster-join as separate
  manual steps
- How to deploy the NVIDIA device plugin and confirm the cluster actually advertises
  `nvidia.com/gpu` as a schedulable resource
- How to prove the whole thing works by submitting a real multi-GPU training Job, instead of
  trusting that "terraform apply succeeded" means the cluster is ready for training

## The scenario

Solari Vision Labs trains a computer-vision defect-detection model for manufacturing customers,
and the model needs a materially larger retrain this quarter — more training images, a bigger
backbone network, multiple GPUs working together. The platform team has a kubeadm-based
Kubernetes cluster already running for everything else, but zero GPU nodes in it. This lab builds
that GPU training cluster from nothing: six numbered steps, each one pulling directly on a chapter
you've already done, ending with a real training Job scheduled and running on real GPUs.

## Step 1 — Confirm GPU quota before writing a single resource block

Exactly as Chapter 2, Lesson 5 warned: check the `Standard_NCADSA100v4` family quota in the target
region before anything else.

```
az vm list-usage --location eastus2 -o table
```

If the fleet below (six GPU VMs) would exceed the current quota, request an increase scoped to
`eastus2` and this exact family now — not after `terraform apply` fails partway through building
six VMs.

## Step 2 — Terraform: provision the GPU VMs as Kubernetes worker nodes

Six `Standard_NC24ads_A100_v4` VMs, each bootstrapped by `custom_data` into both the driver/CUDA
layer from Chapter 2, Lesson 6 and a join into the existing kubeadm cluster — infrastructure and
cluster membership happen in the same `terraform apply`, not as two separate manual chores:

```hcl
# gpu-cluster/main.tf

resource "azurerm_linux_virtual_machine" "gpu_worker" {
  count               = 6
  name                = "gpu-worker-${count.index}"
  resource_group_name = azurerm_resource_group.training.name
  location            = azurerm_resource_group.training.location
  size                = "Standard_NC24ads_A100_v4"
  admin_username      = "mladmin"

  network_interface_ids = [azurerm_network_interface.gpu[count.index].id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Premium_LRS"
    disk_size_gb         = 256
  }

  source_image_reference {
    publisher = "canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  admin_ssh_key {
    username   = "mladmin"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  custom_data = base64encode(templatefile("${path.module}/bootstrap-gpu-node.sh.tftpl", {
    kubeadm_join_command = var.kubeadm_join_command
  }))

  tags = {
    role        = "gpu-training"
    accelerator = "nvidia-a100"
  }
}
```

`bootstrap-gpu-node.sh.tftpl` runs the exact driver install and NVIDIA Container Toolkit setup
from Chapter 2, Lesson 6 (`nvidia-driver-550`, then `nvidia-ctk runtime configure`), then runs the
templated `kubeadm_join_command` as its last step — so a VM only finishes booting once it's
actually driver-ready *and* a member of the cluster, in one pass.

## Step 3 — Verify the driver layer landed correctly, per node

Before trusting any node with a training job, run the Lesson 6 smoke test on each one:

```
ssh mladmin@gpu-worker-0 -- nvidia-smi
ssh mladmin@gpu-worker-0 -- docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

A clean GPU table from both commands means the driver and the Container Toolkit are correctly
lined up on that node — the exact two-layer check from Chapter 2, Lesson 6, now run against real
infrastructure this Terraform config just created, not a pre-built DSVM image.

## Step 4 — Deploy the NVIDIA device plugin, label and taint applied

With six GPU nodes now in the cluster, the device plugin from Chapter 2, Lesson 7 makes
`nvidia.com/gpu` an actual schedulable resource:

```
kubectl label nodes gpu-worker-0 gpu-worker-1 gpu-worker-2 \
  gpu-worker-3 gpu-worker-4 gpu-worker-5 accelerator=nvidia-a100

kubectl taint nodes gpu-worker-0 gpu-worker-1 gpu-worker-2 \
  gpu-worker-3 gpu-worker-4 gpu-worker-5 nvidia.com/gpu=present:NoSchedule

kubectl apply -f nvidia-device-plugin-daemonset.yaml
```

The label is what a training Job's `nodeSelector` will target; the taint is what keeps Solari's
ordinary web and API pods from ever accidentally landing on a $30-an-hour GPU node. Both have to
be applied before the device plugin DaemonSet schedules, since its own pod spec carries the
matching toleration from Lesson 7.

## Step 5 — Confirm the cluster actually sees the GPUs

```
kubectl get nodes -o wide
kubectl describe node gpu-worker-0 | grep -A3 "Capacity:"
```

Each `gpu-worker-*` node should report `nvidia.com/gpu: 1` under both `Capacity` and
`Allocatable`. If a node shows `0`, the device plugin pod on that node didn't start cleanly — check
`kubectl logs` on that pod before moving on; a cluster that can't see its own GPUs will schedule a
training Job anyway and fail it with a confusing "insufficient nvidia.com/gpu" error instead.

## Step 6 — Prove it with a real training Job

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: defect-model-training-run-42
spec:
  completions: 1
  parallelism: 1
  template:
    spec:
      nodeSelector:
        accelerator: nvidia-a100
      tolerations:
        - key: nvidia.com/gpu
          operator: Exists
          effect: NoSchedule
      containers:
        - name: trainer
          image: registry.solarivision.ai/defect-trainer:v12
          command: ["python", "train.py", "--gpus", "4", "--epochs", "40"]
          resources:
            limits:
              nvidia.com/gpu: 4
      restartPolicy: Never
```

`kubectl apply -f training-job.yaml`, then `kubectl get pods -w` until it reaches `Running`. A Job
that schedules and starts pulling images on a real GPU node is the end-to-end proof this lab was
after: not that each layer works in isolation, but that quota, Terraform, drivers, and Kubernetes
scheduling all line up on one real cluster.

## Key terms

| Term | Meaning |
|---|---|
| Bootstrap script (`custom_data`) | A cloud-init script run on first boot that installs drivers and joins the node to Kubernetes in one pass |
| Node label + taint | Together, they pull GPU workloads onto GPU nodes and keep everything else off |
| `nvidia.com/gpu` capacity | The extended resource the device plugin reports once it's running correctly on a node |
| End-to-end proof | A real workload actually scheduling and running, not just each setup step succeeding in isolation |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does this lab's bootstrap
script run the driver install *and* the `kubeadm join` command in the same `custom_data`, and what
would you check first if `kubectl describe node` showed `nvidia.com/gpu: 0` on a newly joined node?
