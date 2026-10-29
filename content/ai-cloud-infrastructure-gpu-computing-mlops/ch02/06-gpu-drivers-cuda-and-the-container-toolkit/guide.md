# Lesson 6 — GPU Drivers, CUDA, and the Container Toolkit

**Chapter 2 · Provisioning GPU Infrastructure · Lesson 2 of 4**

## What you'll learn

- The three distinct layers that have to line up before a GPU is
  actually usable: the NVIDIA driver, the CUDA Toolkit, and the
  NVIDIA Container Toolkit
- Why a container can't see the host's GPU by default, and what the
  Container Toolkit actually does about it
- How to install and verify each layer on a freshly provisioned GPU VM
- How to confirm it all works with a real `docker run --gpus all`
  smoke test

## Three layers, three different jobs

It's tempting to think of "GPU support" as one thing you install. It's
actually three separate layers, each with its own version number, and
all three have to be compatible for anything to work:

1. **The NVIDIA driver** — a kernel-level module installed on the
   host OS. This is what actually talks to the physical GPU hardware.
   Without it, the OS doesn't know a GPU is attached at all.
2. **The CUDA Toolkit** — NVIDIA's compiler (`nvcc`), runtime
   libraries, and developer tools for writing and running GPU-
   accelerated code. This is a user-space layer, separate from the
   driver, and it's what frameworks like PyTorch and TensorFlow
   actually link against.
3. **The NVIDIA Container Toolkit** — the piece that lets a
   *container* reach through to the host's GPU and driver at all,
   since containers are isolated from the host by default.

If you used one of the pre-built images from the last lesson (Azure's
`ubuntu-hpc` DSVM image or AWS's Deep Learning AMI), the driver and
CUDA Toolkit are already there. This lesson covers what's actually
happening under that convenience, and how to do it by hand on a plain
Ubuntu image.

## Installing the driver and confirming it

On a plain Ubuntu VM:

```
sudo apt-get update
sudo apt-get install -y nvidia-driver-550
sudo reboot
```

After the reboot, confirm the driver sees the GPU with:

```
nvidia-smi
```

A working install prints a table with the GPU model, driver version,
and — critically — a **CUDA Version** field in the top-right corner.
That CUDA version is the *maximum* CUDA version this driver can
support, not necessarily the version installed; the driver and the
CUDA Toolkit are versioned independently, and NVIDIA's compatibility
guarantees are what let a newer driver run code built against an older
CUDA Toolkit release.

## Containers don't get the GPU for free

Here's the part that trips people up coming from ordinary Docker
workflows: a container is isolated from the host by design, and that
isolation includes the GPU device files and driver libraries. Running
a plain `docker run nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi`
on a GPU host fails — the container has no idea a GPU exists, even
though the host clearly does.

The **NVIDIA Container Toolkit** is what closes that gap. It installs
a container runtime hook that, at container start time, mounts the
host's GPU device files and the matching driver libraries into the
container. Install it like this:

```
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
  sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

`nvidia-ctk runtime configure` is the step that actually registers the
NVIDIA runtime hook with the Docker daemon — skip it and the toolkit
is installed but Docker doesn't know to use it.

## Verifying the whole stack

With the Container Toolkit configured, the GPU is now reachable from
inside a container:

```
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

If this prints the same GPU table you saw running `nvidia-smi`
directly on the host, all three layers — driver, CUDA, Container
Toolkit — are correctly lined up. This is the exact command worth
running as a smoke test any time you provision a new GPU node, before
you trust it with a real training or inference workload.

## Key terms

| Term | Meaning |
|---|---|
| NVIDIA driver | Kernel-level module that lets the OS and hardware talk to the physical GPU |
| CUDA Toolkit | NVIDIA's user-space compiler and runtime libraries (`nvcc` and friends) that GPU-accelerated frameworks link against |
| `nvidia-smi` | The command-line tool that reports GPU status, driver version, and max supported CUDA version |
| NVIDIA Container Toolkit | Installs the runtime hook that mounts the host's GPU devices and driver libraries into a container |
| `nvidia-ctk runtime configure` | Registers the NVIDIA runtime hook with a container engine (Docker, containerd) so `--gpus all` actually works |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does a plain `docker run` on a GPU host fail to see the GPU, and which
of the three layers — driver, CUDA Toolkit, Container Toolkit — is the
one that specifically fixes that?
