# Script — Writing a Dockerfile

## Segment 1 (title)

A Dockerfile is a plain text file: one instruction per line, executed in order, each one producing a layer. Seven instructions cover the overwhelming majority of real images.

## Segment 2 (code: the seven instructions)

FROM sets the base image, and it always comes first. WORKDIR sets the working directory. COPY brings files in from your machine. RUN executes a command at build time. ENV sets an environment variable. EXPOSE documents which port the app expects — it doesn't open it, that happens later. And CMD is the command that runs when a container actually starts.

## Segment 3 (code: build cache ordering)

Docker caches each layer and reuses it if that instruction, and everything before it, hasn't changed. That's why you copy requirements and install dependencies before copying your application code — a one-line code fix shouldn't force a multi-minute dependency reinstall. Put what changes least at the top.

## Segment 4 (code: CMD vs ENTRYPOINT)

CMD is a default — easy to override entirely from the command line. ENTRYPOINT is fixed — arguments you pass get appended to it instead of replacing it. Most services only need CMD. Reach for ENTRYPOINT when the container should always run one specific program, no matter what.

## Segment 5 (code: complete Dockerfile)

Put it all together and you get eight lines: a base image, a working directory, dependencies installed before code is copied in, an environment variable, a documented port, and a start command. Every instruction doing exactly what its name says.

## Segment 6 (outro)

That's the file. Next up: actually building an image from it, and running it as a container.
