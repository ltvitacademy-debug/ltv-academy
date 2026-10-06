Lesson 7 walked the portal path to a deployment: catalog card, Use this model, confirm the connection, deploy. That still works, and it's the fastest way to get something up. This lesson shows you the SDK path instead, because an endpoint you can also stand up from code is a stronger thing to put in a portfolio than one you only ever clicked into existence.

Start by connecting to your Foundry project's underlying machine learning workspace. Install azure-ai-ml and azure-identity, then build an MLClient with your subscription, resource group, and project name. The first time you run it, a browser window pops up for sign-in — that's expected, and every later call goes through this same client.

An endpoint is the container; a deployment is what actually runs inside it. Create the endpoint first, with a unique name — a timestamp keeps it from colliding with anything else in your subscription. That step typically takes two or three minutes.

Then deploy your model into it. Point a ManagedOnlineDeployment at the model ID from the catalog, pick an instance type and count, and create it. One detail matters here: route a hundred percent of traffic to this deployment explicitly. A fresh deployment starts at zero percent until you say otherwise, even after it finishes deploying.

Two status fields tell you it actually worked. Provisioning state should read Succeeded — the resource got created. Deployment state should read Healthy — the model is actually up and serving requests. Check both on the deployment's details page, or by calling the SDK directly.

Last step: send it a real request and get a real response back. That's the proof this deliverable is done. Copy the Target URI and key before you move on — Lesson 23 is about securing exactly that.
