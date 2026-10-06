# Script — What Is a Container, and Why?

## Segment 1 (title)

A virtual machine virtualizes hardware — it boots a full guest operating system on top of a hypervisor, kernel and all. A container virtualizes much less than that, and that difference is the whole story.

## Segment 2 (code: VM vs container)

A container is an isolated process that shares the host machine's kernel, with its own filesystem, process list, and network interface layered on top. Starting one is closer to starting a program than booting a computer — minutes and gigabytes become seconds and megabytes.

## Segment 3 (screenshot: Containers view)

Here's what that looks like for real: Docker Desktop's Containers view, listing several running processes side by side, each with its own image, ports, and CPU usage. None of these are virtual machines. Every one is sharing this same kernel, isolated from the others.

## Segment 4 (screenshot: sidebar and Builds view)

Docker Desktop organizes everything around two core ideas you'll spend this chapter on: Images and Containers, in the same left-hand sidebar as Volumes and Builds. Lesson 2 draws that line precisely — an image is the recipe, a container is the thing actually running.

## Segment 5 (screenshot: build log)

And here's where the isolation actually comes from: a build executing one instruction at a time, each one becoming its own layer on disk. Installing packages, fetching dependencies, line by line. Lesson 3 is where you write the file that produces exactly this.

## Segment 6 (outro)

A container starts in about a second and weighs megabytes, because it skips booting an entire operating system. Next up: drawing the exact line between an image and a container.
