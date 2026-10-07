# Artifact Repositories

Lesson 19 pushed one container image to GitHub Packages. That's one instance of a much bigger pattern: every pipeline run produces things worth keeping — images, but also build logs, compiled binaries, and dependency packages — and all of them need somewhere permanent and versioned to live. An artifact repository is that somewhere.

## What you'll learn

- What an artifact repository actually stores, beyond just container images
- The difference between a container registry (like GHCR) and a general package feed (like Azure Artifacts)
- How Northbridge Retail's engineers see every version of an image they've ever pushed
- Why pulling a specific, pinned version matters more than always pulling "the latest"

## More than one kind of artifact

"Artifact" covers anything a build process produces that's worth keeping:

- **Container images** — pushed to a container registry like GHCR (GitHub Container Registry), Docker Hub, or Azure Container Registry.
- **Packages and libraries** — a compiled `.whl`, a `.jar`, an npm package — pushed to a package feed.
- **Build outputs** — compiled binaries, static site bundles, or installer files, often just called "artifacts" in a CI tool's own UI.

Different tools specialize in different artifact types, but they all solve the same underlying problem: build it once, store it with a version, and let anything downstream — a deployment, a teammate, another pipeline — pull that exact version back out again.

## GitHub Packages: every version, kept

Every time `storefront-api`'s pipeline pushes a new image tag, it doesn't overwrite the last one — the registry keeps every version Northbridge Retail has ever pushed, each listed separately:

![Screenshot of a package's Recent Versions section, with a link to view and manage all versions highlighted.](/courses/ci-cd-pipelines/ch04/20-artifact-repositories/packages-recent-versions-manage-link.png)
*Every pushed tag sticks around as its own version — nothing is silently overwritten just because a newer one exists.*
Source: [GitHub Docs — Deleting and restoring a package](https://docs.github.com/en/packages/learn-github-packages/deleting-and-restoring-a-package)

That history is what makes rollback possible later in this chapter's sibling topics: if `storefront-api:a1b2c3d` turns out to be broken, the previous working version is still sitting there, pullable by its own tag, not gone the moment a newer image replaced it on disk.

## A different kind of feed: Azure Artifacts

Not every build output is a container image. A team publishing an internal Python library or a shared npm package typically uses a dedicated package feed instead — Azure Artifacts is one real example. Creating a feed is a one-time setup step:

![Screenshot of the Azure DevOps dialog for creating a new feed, with name and visibility fields.](/courses/ci-cd-pipelines/ch04/20-artifact-repositories/create-new-feed-azure-devops.png)
*A feed is scoped like a repository — one feed per project or team, holding every package version that team publishes.*
Source: [Microsoft Learn — Publish and download Universal Packages](https://learn.microsoft.com/en-us/azure/devops/artifacts/quickstarts/universal-packages)

Once a package is published to that feed from a pipeline, it's versioned and pullable the same way a container image is — any other pipeline, or a developer's own machine, can install exactly that version by name.

## Pinning a version, not chasing "latest"

The entire point of an artifact repository is undermined if everything downstream just pulls "the newest thing" every time. A Kubernetes deployment manifest that references `storefront-api:latest` will silently start running a different image the next time a pod restarts — with no corresponding code change, no pull request, and no way to know which commit is actually live. Referencing an immutable tag (the commit SHA from Lesson 19) or an explicit version number is what makes "what's running in production right now" an answerable question instead of a guess.

## Key terms

| Term | Meaning |
|---|---|
| Artifact repository | A versioned storage system for build outputs — images, packages, or binaries |
| Container registry | An artifact repository specialized for container images (GHCR, Docker Hub, ACR) |
| Package feed | An artifact repository for libraries and packages (Azure Artifacts, npm registry) |
| Pinning | Referencing an exact, immutable version instead of a mutable pointer like `latest` |
