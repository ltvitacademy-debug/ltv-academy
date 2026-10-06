# Script — Multi-Stage Builds for Smaller Images

## Segment 1 (title)

Some Python packages need to compile native code during installation — common in AI libraries wrapping C or Rust extensions. A single-stage Dockerfile bakes that entire compiler toolchain into the final image, even though the running app never touches it again after install finishes.

## Segment 2 (code: the problem)

Every container built from a single-stage image like this carries a full compiler toolchain it will never run. Larger pulls, a larger attack surface, and wasted registry storage for something that did its job during the build and then just sits there.

## Segment 3 (code: the fix)

FROM-AS names a stage. A later stage can copy-from an earlier one, pulling out only specific files, without carrying anything else forward. The builder stage's compiler, its package cache, every intermediate file — none of it makes it into the final image. Only what COPY-from explicitly asks for does.

## Segment 4 (code: what it saves)

The exact numbers depend on the dependencies, but the pattern holds: a build toolchain is often hundreds of megabytes of something the running container will never execute. And a smaller image pulls faster — which matters directly once Chapter 4 gets to autoscaling, where a new instance's startup time is gated on how fast its image pulls.

## Segment 5 (outro)

Separate what you need to build from what you need to run. Next up: the one piece of all this that's genuinely different for GPU workloads.
