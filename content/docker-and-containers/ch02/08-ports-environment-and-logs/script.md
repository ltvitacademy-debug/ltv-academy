## Segment 1 (title)

A container is only useful once it can be reached from outside, configured for its environment, and watched while it runs. This lesson covers the three things Northbridge's team touches every time they stand up a container.

## Segment 2 (code)

Dash p maps one specific host port to one specific container port -- predictable, and what Northbridge uses for anything other services depend on finding reliably. Dash capital P publishes every port the Dockerfile marked with EXPOSE, but to a random free host port each time -- fine for quick local testing, not for anything you need to find again. docker port shows you what actually got mapped.

## Segment 3 (code)

Dash e works for one or two environment variables. Northbridge's checkout service needs a dozen -- database URL, payment key, cache host -- so it uses env-file instead: one file with KEY equals value on each line, read into the container's environment at startup. One file to review and version, instead of a growing pile of dash e flags.

## Segment 4 (code)

docker logs prints everything the container has written to stdout and stderr since it started. Dash f follows the stream live, printing new lines as they arrive -- exactly what an on-call engineer runs the moment a container starts behaving oddly, before reaching for anything heavier.

## Segment 5 (steps)

So every real container needs the same three things: a published port to be reached from outside, environment variables to configure it, and logs to watch while it runs.

## Segment 6 (outro)

That covers reaching, configuring, and watching a container from the outside. Next up: getting a shell inside a running container and watching its resource usage live.
