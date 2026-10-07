## Segment 1 (title)

Chapter One proved Docker works. Now we start treating images the way Northbridge Retail actually will -- specific versions, pulled deliberately, started with the flags a real service needs.

## Segment 2 (code)

docker run pulls an image automatically if it's missing, but you can pull on its own with docker pull. Docker checks locally, then downloads layer by layer from Docker Hub. Northbridge's platform team pulls images ahead of time on CI runners, so the first real deploy doesn't stall waiting on a download.

## Segment 3 (code)

node colon 20 is a tag -- a human-friendly label that can move. Docker Hub can repoint it to a newer build tomorrow, and your next pull gets different bytes under the same name. A digest is the opposite: a SHA-256 hash of the exact content, and it never changes. Northbridge uses easy tags for development, but pins the exact digest for production deploys.

## Segment 4 (code)

Here's docker run with the flags you'll use constantly. Dash d runs it detached, in the background. Dash dash name gives it a memorable handle instead of a random one. Dash p maps a host port to the container's port. And dash e sets an environment variable inside the container.

## Segment 5 (steps)

Before pulling a third-party image, check it on Docker Hub: does it carry an Official Image badge, was it updated recently, and is there a specific version tag rather than just latest? Northbridge's base images are all official images for exactly that reason.

## Segment 6 (outro)

That's pulling and running images with intent. Next up: the full container lifecycle -- create, start, stop, pause, and remove.
