# Script — Building & Running Containers

## Segment 1 (title)

The Dockerfile from Lesson 3 is just a text file until you actually build it. Two commands cover the entire loop: docker build turns it into an image, and docker run starts that image as a container.

## Segment 2 (code: docker build)

The dash-t flag tags the image with a name and version. That trailing dot is the build context — the directory Docker sends along, which is why COPY can find your files. Watch the output as it runs: CACHED next to a step means Docker reused a previous layer instead of re-running it.

## Segment 3 (code: docker run flags)

A handful of flags cover almost every real run. Dash-d runs it detached, in the background. Dash-p publishes a port — that's what actually opens it, where EXPOSE only documented it. Dash-e sets an environment variable. Dash-v mounts a host folder in, so files survive a restart.

## Segment 4 (code: ps, logs, exec, stop)

Once it's running: docker ps lists it, docker logs streams its output, docker exec opens a shell inside it directly — the fastest way to check whether a file is actually there, or what a variable actually resolved to. And docker stop shuts it down cleanly.

## Segment 5 (code: --rm)

For short, disposable runs — checking a package version, say — add dash-dash-rm. It deletes the container the moment it exits, instead of leaving a stopped one lying around with nothing in it worth keeping.

## Segment 6 (outro)

Build, run, inspect, stop — that's the whole loop. Next up: doing this for more than one container at a time, with Docker Compose.
