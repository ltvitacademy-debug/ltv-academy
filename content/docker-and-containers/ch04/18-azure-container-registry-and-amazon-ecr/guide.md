# Azure Container Registry & Amazon ECR

Docker Hub works fine for Northbridge's day-to-day development, but production deploys run on Azure and AWS infrastructure — and both clouds offer their own private, managed registries that plug directly into the rest of that infrastructure's identity and permissions. This lesson covers both: Azure Container Registry (ACR) for the catalog service's AKS deployment, and Amazon ECR for checkout's ECS deployment.

## What you'll learn

- What ACR and ECR actually are, and why a team already in Azure or AWS reaches for them over Docker Hub
- How to create and push to an Azure Container Registry with `az acr login`
- How to authenticate and push to Amazon ECR with `aws ecr get-login-password`
- The shared shape both workflows follow, despite different CLIs

## Azure Container Registry

ACR is a private Docker registry hosted inside Northbridge's own Azure subscription. Because it lives in Azure, it authenticates through the same Azure identity (IAM) that already controls their virtual machines and AKS cluster — no separate Docker Hub account for the team to manage.

```text
$ az acr create --resource-group northbridge-rg --name northbridgeacr --sku Basic
$ az acr login --name northbridgeacr
Login Succeeded

$ docker tag northbridgeretail/catalog:1.5 northbridgeacr.azurecr.io/catalog:1.5
$ docker push northbridgeacr.azurecr.io/catalog:1.5
```

`az acr login` authenticates Docker against the registry using the Azure CLI session that's already signed in — the same pattern as `docker login`, just backed by Azure identity instead of a Docker Hub password. Every image pushed here is tagged with the registry's own hostname, `northbridgeacr.azurecr.io`, instead of Docker Hub's implicit one.

## Amazon ECR

Amazon ECR is AWS's equivalent — a private registry tied to an AWS account and IAM permissions, used for checkout's deployment to ECS. ECR authentication is a two-step dance: fetch a short-lived password from AWS, then feed it to `docker login`.

```text
$ aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
Login Succeeded

$ docker tag northbridgeretail/checkout:2.1 \
  123456789012.dkr.ecr.us-east-1.amazonaws.com/checkout:2.1
$ docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/checkout:2.1
```

`aws ecr get-login-password` returns a token valid for 12 hours, piped straight into `docker login` instead of typing a password — the AWS CLI's own credentials (already configured for the rest of Northbridge's AWS work) are what actually authorize the request.

## The same shape, two different clouds

Both workflows follow the exact pattern from Lesson 16 — authenticate, tag with the registry's hostname, push — just with cloud-specific login commands standing in for a Docker Hub username and password. Northbridge doesn't choose ACR *or* ECR; the catalog service's images live in ACR because it deploys to AKS, and checkout's live in ECR because it deploys to ECS.

## Key terms

- **Azure Container Registry (ACR)** — Azure's managed private container registry, authenticated through Azure IAM
- **`az acr login`** — authenticates Docker against an ACR registry using the current Azure CLI session
- **Amazon ECR (Elastic Container Registry)** — AWS's managed private container registry, authenticated through AWS IAM
- **`aws ecr get-login-password`** — returns a short-lived token used to authenticate Docker against ECR
- **Registry hostname** — the `<registry>.azurecr.io` or `<account-id>.dkr.ecr.<region>.amazonaws.com` prefix an image must be tagged with before it can be pushed to that registry
