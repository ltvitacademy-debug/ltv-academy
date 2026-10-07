# Your First Container

Docker is installed and verified. Now let's actually use it. This lesson walks through the two commands nearly every new Docker user runs first: `docker run hello-world`, to confirm everything works, and `docker run -it ubuntu bash`, to get an interactive shell inside a real, running container. We'll use real terminal output throughout this lesson rather than staged screenshots — the actual CLI output is more honest about what's happening than a mocked-up window ever could be.

## What you'll learn

- What actually happens, step by step, when you run `docker run hello-world`
- How to drop into an interactive shell inside a container with `-it`
- The difference between an image and a container, demonstrated instead of just defined
- How to list, stop, and remove containers once you're done with them

## `docker run hello-world`, line by line

You already ran this once in Lesson 4 to verify the install. Here's what each line actually means:

```text
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
a1cc2ec4ac7d: Pull complete
Digest: sha256:7d246653d0511db2a6b2e0436cfd0e52ac8c066000264b3ce63331ac66dca625
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Reading top to bottom: Docker checked locally for the `hello-world` image, didn't find it, and **pulled** it from Docker Hub (the default public registry). Once the image was downloaded, Docker created a **container** from it — a running instance of that image — ran the one thing that image does (print this message), and the container exited. That whole lifecycle — pull, create, run, exit — happens every time you run an image you don't already have locally.

## An interactive container: `docker run -it ubuntu bash`

`hello-world` runs once and exits. To actually work inside a container, add two flags and a command:

```text
$ docker run -it ubuntu bash
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
Status: Downloaded newer image for ubuntu:latest

root@3f2a9c1d4e5b:/#
```

- `-i` (interactive) keeps STDIN open so you can type into the container
- `-t` (tty) allocates a terminal, so what you type and see looks like a normal shell
- `ubuntu` is the image — a minimal Ubuntu Linux filesystem
- `bash` is the command to run inside the container, instead of some default

That prompt, `root@3f2a9c1d4e5b:/#`, is a real shell running inside an isolated Ubuntu filesystem — the container's own view of `/`, thanks to the mount namespace from Lesson 3. From here, standard Linux commands work exactly as you'd expect:

```bash
root@3f2a9c1d4e5b:/# cat /etc/os-release | head -1
PRETTY_NAME="Ubuntu 24.04.1 LTS"
root@3f2a9c1d4e5b:/# exit
```

Typing `exit` leaves the shell — and because the container's only job was running that shell, the container stops the moment you leave it.

## Image vs. container, demonstrated

Every time you ran `docker run ubuntu bash`, Docker reused the same downloaded **ubuntu image** but created a **new container** from it. The image is the read-only template; the container is a live, running (or stopped) instance of it — you can start several containers from one image, and each one gets its own isolated process space, filesystem changes, and lifecycle.

```bash
docker ps -a          # list every container, running or stopped
docker rm <container-id>   # remove a stopped container
docker images          # list every image you've pulled or built
```

## Key terms

- **`docker run`** — pulls an image if needed, creates a container from it, and starts it
- **`-it`** — the combined interactive-plus-terminal flags that make a shell inside a container usable
- **Image** — the read-only template a container is created from
- **Container** — a running (or stopped) instance created from an image
- **Docker Hub** — the default public registry Docker pulls images from
