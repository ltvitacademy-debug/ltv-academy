# Script — The Software Delivery Lifecycle

## Segment 1 (title)

Every pipeline in this course automates one journey: the path a change takes from an idea to running code a customer uses. This lesson names every stage of that journey, so the rest of the course has a shared map.

## Segment 2 (steps)

There are six stages: plan, code, build, test, release, and deploy or operate. Plan and code are fundamentally human — deciding what to build and writing the first version. Build is where CI, C, D actually starts touching things: compiling and packaging the code, usually into a container image in this course. Test, release, and deploy finish the job, and operate feeds whatever happens in production back into the next planning cycle.

## Segment 3 (steps)

Let's trace one change at Northbridge Retail: a save for later button on the cart. A product manager writes a one-paragraph spec in planning. A developer codes it on a branch, builds the backend endpoint, and opens a pull request. Merging that pull request triggers a pipeline that builds a new cart service image and runs its unit and integration tests. Once those pass, the image is tagged one point fourteen point zero and released, then rolled out to the Kubernetes cluster.

## Segment 4 (steps)

CI slash CD automates stages three through six — build, test, release, deploy. Plan and code stay human; a pipeline can't decide what a product should do or write the first draft of a feature for you. What CI slash CD removes is everything manual and repetitive that used to sit between a finished pull request and that code running in front of a customer: someone manually running tests, manually building an image, manually restarting a service.

## Segment 5 (outro)

Up next, lesson three: continuous integration, delivery, and deployment — three words people use interchangeably that actually mean specific, different things.
