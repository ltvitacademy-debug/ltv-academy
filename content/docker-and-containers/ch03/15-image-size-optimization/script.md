## Segment 1 (title)

Multi-stage builds handle the biggest win. This closing lesson covers the smaller, still-worthwhile habits Northbridge applies to every image after that.

## Segment 2 (code)

Base image choice alone makes a big difference. The full node image includes a complete Debian userland with build tools most apps never touch. The slim variant strips most of that out. Alpine goes further, built on a different, smaller Linux distribution entirely -- smallest of the three, though worth checking for compatibility before switching production images to it.

## Segment 3 (code)

Without a dockerignore file, COPY dot dot sends everything in the build context to the Docker daemon -- including a huge local node_modules, the entire git history, stray log files -- even if the Dockerfile only uses a fraction of it. Dockerignore keeps those out entirely, shrinking the image and speeding up the build.

## Segment 4 (code)

Each RUN is its own layer, and a layer keeps everything written during it, including a cache you delete in a later instruction. Deleting it in a separate RUN doesn't shrink anything -- it's already baked into the earlier layer. Chaining install and cleanup into one RUN means the cache never outlives the layer that created it.

## Segment 5 (code)

docker history breaks a built image down layer by layer, in size order -- exactly where to look when an image is bigger than expected and you need to find which instruction is responsible.

## Segment 6 (outro)

That closes Chapter Three -- Dockerfiles, layers, CMD and ENTRYPOINT, multi-stage builds, and keeping images lean. Chapter Four picks up from here: pushing Northbridge's image to a registry so it can run anywhere.
