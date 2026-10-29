# Lesson 12 — A Smoke Test: Confirming the Environment Actually Works

**Chapter 3 · Deploying Compute & Storage · Lesson 12 of 32**

## What you'll learn

- What a smoke test actually is, and why it's a deliberate, five-minute step, not an afterthought
- A real, concrete smoke test for the environment built across this chapter: can the VM or EC2 instance reach the storage account or bucket, write a file, and read it back
- Why checking a basic service response matters too, not just network reachability
- Why skipping this step means problems get discovered later, at a worse time, instead of now

## What a smoke test actually is

A **smoke test** is a quick, basic check that a deployed system works end-to-end, run immediately after deployment, before it carries any real traffic or real data. The name comes from hardware testing: power on a new circuit and see if smoke comes out. It's not a full test suite, and it's not meant to catch every bug — it's meant to catch the handful of showstopper problems (nothing can connect, the wrong permission was never actually granted, a typo in a resource name) before anyone finds out the hard way.

## The concrete test for this environment

Every piece built across this chapter gets exercised by one simple action: write a test file to storage, from the VM, using the identity wired up in Lesson 11, then read it back.

```
# Azure — from the VM, authenticated via its managed identity
echo "smoke test" > smoke-test.txt
az storage blob upload \
  --account-name ltvappstorage01 \
  --container-name app-data \
  --name smoke-test.txt \
  --file smoke-test.txt \
  --auth-mode login

az storage blob download \
  --account-name ltvappstorage01 \
  --container-name app-data \
  --name smoke-test.txt \
  --file smoke-test-check.txt \
  --auth-mode login
```

```
# AWS — from the EC2 instance, authenticated via its instance profile
echo "smoke test" > smoke-test.txt
aws s3 cp smoke-test.txt s3://ltv-app-prod-data/smoke-test.txt
aws s3 cp s3://ltv-app-prod-data/smoke-test.txt smoke-test-check.txt
```

If the upload succeeds, Lesson 9's network path and Lesson 11's identity grant both work. If the download succeeds and the file matches, the round trip is confirmed. If either command fails, you now know exactly where to look — at the network path or at the identity grant — because that's all this test touches.

## Don't stop at connectivity — check the service too

Reaching storage confirms the network and identity chain works, but it doesn't confirm the application itself is actually running correctly. A basic service check closes that gap:

```
curl -I http://localhost/health
```

A `200 OK` response means the application process is up and responding, not just that the VM is reachable. An environment that passes the storage round trip but fails this check still isn't done — the VM and storage are wired correctly, but whatever's supposed to be running on that VM isn't.

## Why skipping this step costs more later

Every piece of this smoke test takes a few minutes to run. Skipping it doesn't eliminate the risk it would have caught — it just delays discovery to a worse moment: a misconfigured role assignment or an unreachable subnet gets found when a real user hits an error in production, or when a teammate tries to use the environment weeks later and has no idea whether the problem is new or was always broken. Running the smoke test now, while you still remember exactly what you just built and why, is the cheapest time this problem will ever be to diagnose.

## Key terms

| Term | Meaning |
|---|---|
| Smoke test | A quick, basic end-to-end check run immediately after deployment, before real use begins |
| Round trip (storage) | Writing a test file and reading it back, confirming both directions of the connection work |
| Service health check | A basic check (e.g. an HTTP endpoint) confirming the application itself is responding, not just the network |
| Mean time to detect | How long it takes to discover a problem exists — a smoke test minimizes this to minutes instead of weeks |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: if the storage round trip in this lesson's smoke test fails, what two things does that tell you to check first, and why does running this test now cost less than skipping it?
