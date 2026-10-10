# Lesson 16 — Namespaces

**Chapter 3 · Packaging and Workflows · Lesson 16 of 22**

## What you'll learn

- What a namespace actually does for a managed package
- Where a namespace is created versus where it's registered
- Why linking a namespace to an org is a one-way, careful decision
- How a namespace relates to sfdx-project.json

## A prefix that prevents collisions

A **namespace** is a short, registered prefix (for example `acme_`) applied to every component in a managed package — a custom field becomes `acme__Some_Field__c`, an Apex class becomes referenced through `acme.SomeClass`. Its purpose is collision prevention: when a managed package is installed into a customer's org, the namespace guarantees the package's components can't accidentally collide with, or be confused with, something the customer already built themselves. Unlocked packages can use a namespace too, but it's far more central to managed packages, where hidden code makes naming collisions a more serious problem.

## You can share one namespace across multiple packages

A namespace isn't a one-package-per-prefix rule. Salesforce explicitly recommends using a **single namespace shared across all of an organization's managed 2GP packages** (and the same applies to unlocked packages) — sharing a namespace makes code sharing between those packages easier, since components across packages in the same namespace can reference each other more directly.

## Where a namespace is created versus registered

This is a two-step process, and the two steps happen in two different places:

1. **Create** the namespace in a dedicated Developer Edition org — not the Dev Hub, and not a scratch org. This is simply where the namespace prefix gets reserved on Salesforce's side.
2. **Register** (link) that namespace to your Dev Hub through the **Namespace Registry**, found under Setup in the Dev Hub org, performed by a System Administrator or a user with the relevant Salesforce DX Namespace Registry permissions.

Once a namespace is linked to a Dev Hub, every scratch org, sandbox, patch org, or branch org that needs to build or test that namespace's packages also needs to be linked to that same Namespace Registry entry — scratch orgs can't be namespace-associated without it.

## Irreversibility — read this twice

**Once you associate a namespace with an org, you cannot change it or reuse that namespace elsewhere.** This is exactly the kind of one-way decision Lesson 4 described for enabling Dev Hub, and it applies here too: never link a namespace you intend to keep for actual production use to a throwaway testing or learning org. Use a disposable namespace for experimentation, and treat your real namespace — the one tied to your real, shipping managed packages — as something you only ever link deliberately, to orgs you fully intend to keep that association permanently.

## Connecting back to sfdx-project.json

Once a namespace is registered and linked, it's declared in the project via the `namespace` property in `sfdx-project.json` (Lesson 8). Any 2GP package you create from that project becomes associated with the namespace named there — this is the mechanism that ties a project's actual package creation back to the registration work covered in this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Namespace | A registered prefix applied to a managed package's components to prevent collisions |
| Namespace Registry | The Dev Hub Setup page where a created namespace gets linked/registered |
| Create vs. register | Creating a namespace happens in a Developer Edition org; registering links it to a Dev Hub |
| `namespace` (sfdx-project.json) | The project property declaring which registered namespace new packages are tied to |

## Lab

A company is about to register its first namespace, `nimbus`, planning to use it for all of its future managed packages. Write out the correct order of operations: which org type the namespace should be created in, which org it should then be registered/linked to, and what should never happen to that namespace once linked. Then explain why a team experimenting with packaging for the first time should deliberately use a disposable, throwaway namespace instead of `nimbus` for their test runs.

## Check yourself

Can you explain what problem a namespace solves for a managed package installed into a customer's org? Can you describe the two separate steps — create and register — and name the one irreversible fact about linking a namespace to an org?
