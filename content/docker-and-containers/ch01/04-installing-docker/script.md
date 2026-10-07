## Segment 1 (title)

Time to get Docker actually running on your machine. Every Northbridge developer installs it once on their laptop, but it's worth knowing what you're actually installing, not just clicking through a wizard.

## Segment 2 (steps)

"Docker" really means two things. Docker Engine is the core: the background daemon that builds images and runs containers, plus the docker command-line client. On Linux, that's all you need. Windows and Mac can't run Linux containers natively, so Docker Desktop adds a managed Linux VM under the hood, plus a GUI, Compose, and Kubernetes support.

## Segment 3 (code)

On Windows, install it with winget, which uses the modern WSL 2 backend by default. On Mac, install it with Homebrew. Either way, launch the app once afterward -- that's what finishes setup and, on Mac, puts the docker command on your path.

## Segment 4 (code)

On Linux, most developers skip Docker Desktop entirely. You add Docker's official apt repository and install Docker Engine, the CLI, and the Compose plugin directly -- no VM needed, since Linux runs containers natively.

## Segment 5 (code)

However you installed it, verify it the same way everywhere: check the version, then run hello-world. Docker pulls a tiny test image, runs it in a container that prints a confirmation message, and exits. Seeing that message means the daemon is running and your CLI can reach it.

## Segment 6 (outro)

Next, in Lesson Five, we'll actually use it -- pulling real images and opening an interactive shell inside a container.
