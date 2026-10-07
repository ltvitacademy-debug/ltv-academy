# Script — Artifact Repositories

## Segment 1 (title)

Lesson 19 pushed one container image to GitHub Packages. That's one instance of a bigger pattern — every pipeline run produces things worth keeping, and all of them need somewhere permanent and versioned to live. An artifact repository is that somewhere.

## Segment 2 (steps)

Artifact covers anything a build produces worth keeping. Container images go to a registry like GHCR, Docker Hub, or Azure Container Registry. Packages and libraries — a compiled wheel, a jar, an npm package — go to a package feed. Build outputs like binaries or installers are often just called artifacts in a CI tool's own UI. Different tools, same underlying job: build it once, store it with a version, pull that exact version back out later.

## Segment 3 (screenshot)

Every time storefront-api's pipeline pushes a new tag, it doesn't overwrite the last one. The registry keeps every version Northbridge Retail has ever pushed, each listed separately — which is exactly what makes rolling back to an older version possible later.

## Segment 4 (screenshot)

Not every build output is a container image. A team publishing an internal library typically uses a dedicated feed instead — Azure Artifacts is one real example, with a feed scoped per team, versioning packages the same way a registry versions images.

## Segment 5 (steps)

The whole point of versioning breaks down if everything downstream just pulls the newest thing every time. A deployment referencing latest can silently start running a different image with no corresponding code change and no way to know what's actually live. Referencing a pinned, immutable tag makes that an answerable question instead of a guess.

## Segment 6 (outro)

A pinned, versioned artifact is finally ready to go somewhere real. Chapter five picks up exactly there: deployment environments, and where that artifact actually runs.
