# Installing Docker

Time to get Docker actually running on your machine. Northbridge Retail's developers each install Docker once on their own laptop and never think about it again — but it's worth understanding what you're installing, not just clicking through a wizard. This lesson covers the two things people mean when they say "install Docker": **Docker Desktop** on Windows and Mac, and the **Docker Engine** directly on Linux.

## What you'll learn

- What Docker Desktop actually bundles (it's more than just the `docker` command)
- How to install it on Windows and on Mac
- How to install Docker Engine directly on Linux, without Desktop
- How to verify the install worked, on any platform

## Docker Desktop vs. Docker Engine

**Docker Engine** is the core piece: the background service (daemon) that actually builds images and runs containers, plus the `docker` command-line client that talks to it. On Linux, that's all you need, because Linux can run containers natively.

Windows and macOS can't run Linux containers natively, so **Docker Desktop** adds a lightweight Linux virtual machine under the hood (handled automatically — this isn't the VM-vs-container tradeoff from Lesson 2, it's just how Docker Desktop makes Linux containers possible on a non-Linux OS), along with a GUI for managing images, containers, and volumes, Docker Compose, and Kubernetes support. For nearly every new developer, Docker Desktop is the right starting point.

## Installing on Windows

Docker Desktop for Windows requires Windows 10/11 64-bit with the WSL 2 backend (the modern default — Hyper-V is still available but WSL 2 is recommended). Install it with `winget`, Windows' built-in package manager:

```powershell
winget install -e --id Docker.DockerDesktop
```

Or download the installer directly from docs.docker.com and run it — either way, Docker Desktop starts itself after installation and finishes setting up the WSL 2 backend automatically.

## Installing on Mac

On macOS, install Docker Desktop with Homebrew:

```bash
brew install --cask docker-desktop
```

Then launch **Docker.app** from Applications once — it needs to run at least once to finish setup and put the `docker` command on your `PATH`.

## Installing on Linux (Docker Engine directly)

On Linux, most developers skip Docker Desktop entirely and install Docker Engine straight from Docker's official apt repository. On Ubuntu:

```bash
# Add Docker's official GPG key and repository
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Install Docker Engine, the CLI, and the Compose plugin
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Verifying the install

On any platform, once Docker Desktop is running (or Docker Engine is installed on Linux), confirm it worked:

```bash
docker --version
docker run hello-world
```

`docker run hello-world` pulls a tiny test image, runs it in a container that prints a confirmation message, and exits. Seeing that message means the Docker daemon is running, your CLI can reach it, and you're ready to pull and run real images — which is exactly what the next lesson does.

## Key terms

- **Docker Engine** — the core daemon that builds images and runs containers, plus the `docker` CLI
- **Docker Desktop** — the Windows/Mac application that bundles Docker Engine (running inside a managed Linux VM), a GUI, Compose, and Kubernetes support
- **WSL 2** — Windows Subsystem for Linux version 2, the recommended backend Docker Desktop uses on Windows
- **`docker run hello-world`** — the standard one-line command used to verify a Docker installation is working
