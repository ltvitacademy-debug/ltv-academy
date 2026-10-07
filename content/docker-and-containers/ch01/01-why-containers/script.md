## Segment 1 (title)

Welcome to Docker and Containers. This is Chapter One, Container Fundamentals, and this first lesson answers the question everyone asks before touching a single command: why do we need containers at all?

## Segment 2 (steps)

Picture Northbridge Retail's engineering team. A developer builds the product-catalog app on their laptop, it works perfectly, and then it breaks the moment it's deployed to a test server — because the test server has a different version of Node installed, or a missing system library. That's the "it works on my machine" problem, and before containers, teams fought it constantly: mismatched environments, one app's dependencies colliding with another's on the same server, and new hires losing a day or two just getting their laptop set up to match everyone else's.

## Segment 3 (steps)

A container solves this by packaging an application together with its runtime, its libraries, and its configuration into a single image. That image runs the same way on a laptop, a test server, or in production, because it's literally the same bits every time. And unlike running a separate virtual machine for each app, containers share the host machine's operating system kernel, so they stay lightweight — isolated from each other without each one carrying around a full copy of an OS.

## Segment 4 (steps)

At Northbridge, the product-catalog service runs on Node.js with one set of dependencies, and the checkout service runs on Python with a completely different set. Running both directly on the same host invites version conflicts. Running each one in its own container means neither service ever touches the other's dependencies, and both can be deployed, scaled, and updated independently.

## Segment 5 (outro)

That's the why. Next, in Lesson Two, we'll compare containers directly against virtual machines, and see exactly why containers start in milliseconds while a VM takes minutes.
