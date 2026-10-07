## Segment 1 (title)

Docker Hub works fine for day-to-day development, but Northbridge's production deploys run on Azure and AWS -- and both clouds offer their own private, managed registries wired straight into that infrastructure's own identity system.

## Segment 2 (screenshot)

This is the real Azure Portal screen for creating a Container Registry. It lives inside Northbridge's own Azure subscription, authenticated by the same Azure identity that already controls their virtual machines and AKS cluster -- no separate Docker Hub account to manage.

## Segment 3 (code)

az acr login authenticates Docker using the Azure CLI session that's already signed in -- same shape as docker login, just backed by Azure identity instead of a password. Tag the image with the registry's own hostname, northbridgeacr dot azurecr dot io, and push.

## Segment 4 (screenshot)

And here's the result -- a pushed image showing up in the registry's Repositories view, exactly the way it would on Docker Hub's own repository page, just inside Northbridge's Azure subscription instead.

## Segment 5 (code)

Amazon ECR is AWS's equivalent, used for checkout's deploy to ECS. Authentication is a two-step dance: aws ecr get-login-password fetches a twelve-hour token from AWS, piped straight into docker login instead of typing a password. From there it's the same tag-then-push as everywhere else.

## Segment 6 (outro)

Registries solved getting images shipped around. Chapter 5 picks up the next problem: keeping a container's data alive across restarts, and getting containers talking to each other.
