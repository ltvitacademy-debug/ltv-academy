A deployed endpoint that works is only half the deliverable. Lesson 16 covered keeping secrets out of code, Lesson 14 covered keeping a service off the public internet — both apply directly to the endpoint you just deployed.

Start with the key. Calling the endpoint directly with a copied key is fine for testing from your own machine, but an application calling it in production shouldn't have that key sitting in a config file. Store it as a Key Vault secret instead, grant your calling application's managed identity access to read it, and DefaultAzureCredential picks it up automatically — nothing pasted anywhere a screen share or a commit history could expose.

Second, the network. Exactly like Lesson 14: check the Networking tab on the workspace behind your endpoint, disable public access, and put a private endpoint behind your own VNet if you have one. For a capstone you're demoing, documenting that you'd do this and showing the toggle is enough — for anything running in production, it isn't optional.

Now monitoring. A healthy endpoint with no logs is a deliverable half done. One Azure CLI command sends diagnostic logs to a Log Analytics workspace: az monitor diagnostic-settings create, pointed at your endpoint's resource ID and a workspace, with metrics turned on. Run it once, and request counts, latency, and error rate start landing automatically — no code change required. It's the same command family that works against almost any Azure resource, not something special to AI endpoints.

Once that setting is active, Lesson 11's Monitor dashboard is where you'd actually watch this endpoint's token usage and latency over time. The deliverable here is the diagnostic setting existing and logs landing — not a long observation period.

Move your endpoint's key into Key Vault, and run the diagnostic-settings command against your own endpoint. Lesson 24 is about presenting all of this as one finished piece of work.
