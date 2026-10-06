# Script — Managing Dependencies & Model Weights

## Segment 1 (title)

A loose requirements file resolves differently depending on what's available the day you build — risky anywhere, but especially risky for AI, where a minor version bump can silently change numerical output.

## Segment 2 (code: pinning)

Pin with an exact equals sign, not a greater-than-or-equal. Lesson 3's build cache only stays valid as long as requirements.txt itself doesn't change — pinning also means the cached layer from last week is still correct today.

## Segment 3 (code: bake in or download)

Model weights can get into a container three ways. Bake them in with COPY, and the image is self-contained, but a multi-gigabyte checkpoint makes every build, push, and pull slower. Download them at build time with RUN, and the Dockerfile stays small, but every build now depends on that URL being reachable.

## Segment 4 (code: volume mount)

Or mount them as a volume at runtime. The image stays small and generic, the weights live outside it entirely, and they're swappable without a rebuild. For anything beyond a small, rarely-changing model file, this is usually the right default.

## Segment 5 (code: choosing)

Small and stable, bake it in. Fetched from a model registry, download at build time. Large, frequently updated, or GPU-deployed — mount it as a volume. That same volume pattern is what makes Lesson 11's GPU deployments practical.

## Segment 6 (outro)

Pin your dependencies, and choose deliberately where weights live. Next up: the other thing that should never be baked into an image — secrets.
