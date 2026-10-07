## Segment 1 (title)

Docker's installed and verified. Now let's actually use it -- the two commands nearly every new Docker user runs first.

## Segment 2 (code)

You already ran hello-world once in the last lesson, so here's what each line meant. Docker checked locally for the image, didn't find it, and pulled it from Docker Hub, the default public registry. Once it downloaded, Docker created a container -- a running instance of that image -- ran the one thing it does, printed that message, and exited. Pull, create, run, exit: that's the lifecycle every image goes through the first time.

## Segment 3 (code)

hello-world runs once and exits. To actually work inside a container, add two flags and a command: docker run dash i t ubuntu bash. The i keeps input open, the t allocates a terminal, ubuntu is the image, and bash is what runs inside it instead of some default. That prompt is a real shell, running inside an isolated Ubuntu filesystem.

## Segment 4 (code)

From there, standard Linux commands work exactly like you'd expect -- that's the container's own view of the filesystem, the mount namespace from Lesson Three doing its job. Type exit to leave the shell, and since running that shell was the container's only job, the container stops the moment you do.

## Segment 5 (steps)

Every time you ran that command, Docker reused the same downloaded ubuntu image but created a brand new container from it. The image is the read-only template; the container is a live instance of it. docker ps dash a lists every container you've created, running or stopped, and docker images lists every image you've pulled.

## Segment 6 (outro)

That's Chapter One. You know why containers exist, how they differ from VMs, what namespaces and cgroups actually do, and how to install Docker and run your first container. Chapter Two picks up from here: building your own images.
