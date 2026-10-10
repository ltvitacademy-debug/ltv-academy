# Lesson 7 — Connected Apps

**Chapter 1 · Identity Foundations · Lesson 7 of 24**

## What you'll learn

- What a Connected App is and why it's the central object tying OAuth, SAML, and OIDC together inside Salesforce
- Step by step, how to create one in App Manager and enable OAuth settings
- Where the Consumer Key and Consumer Secret come from, and how to handle them responsibly
- How OAuth policies (like "Admin approved users are pre-authorized") control who can actually use a connected app

## What a Connected App is

A **Connected App** is the framework Salesforce uses to let an external application integrate with it using standard protocols — SAML, OAuth, and OpenID Connect. Every one of the protocols covered in Lessons 4–6 eventually needs a Connected App (or, for SAML specifically, a Connected App acting as the service provider definition) configured on the Salesforce side before an external system can actually use it. If SSO, OAuth, and OIDC are the protocols, the Connected App is the Salesforce-side registration record that makes each of them concrete and controllable.

Note on current naming: as of recent releases, Salesforce has been steering new integrations toward **External Client Apps** for some scenarios, with connected app creation gated behind a setting ("Allow creation of connected apps") under External Client Apps → Settings. The underlying OAuth concepts in this lesson apply to both; check which path is current in your org before building.

## Creating a Connected App, step by step

From Setup, search Quick Find for **App Manager**, and click **New Connected App**:

![The App Manager page in Salesforce Setup, reached via the Quick Find search box, with the New Connected App button visible.](/courses/identity-and-access-management/ch01/07-connected-apps/app-manager-new-connected-app.jpg)
*App Manager — the home for every connected app in the org, and the starting point for registering a new integration.*

The creation form asks for:

1. **Connected App Name** and **API Name** — must be unique within the org; the API name is auto-derived but can be adjusted.
2. **Contact Email** — required, used for Salesforce notifications about the app.
3. **Enable OAuth Settings** — the checkbox that turns this from a passive app listing into an actual OAuth client. Checking it reveals:
   - **Callback URL** — must exactly match the redirect URI the external application will send; this is the OAuth equivalent of the SAML ACS URL from Lesson 4.
   - **Selected OAuth Scopes** — exactly which scopes (Lesson 5) this app's tokens will carry.
4. Save. Salesforce may take a few minutes to fully provision the new Connected App across the org.

## Consumer Key and Consumer Secret

Once saved, Salesforce generates a **Consumer Key** (the OAuth `client_id`) and a **Consumer Secret** (the OAuth `client_secret`). These are retrieved from **Manage Consumer Details** on the connected app's detail page:

![The Manage Connected Apps screen in Salesforce Setup, showing the Consumer Key and Consumer Secret fields for a connected app, with Copy buttons next to each.](/courses/identity-and-access-management/ch01/07-connected-apps/consumer-key-and-secret.jpg)
*Consumer Key and Consumer Secret — the credentials an external application uses to identify itself to Salesforce during an OAuth flow.*

The Consumer Secret must be treated like a password: it should go into a secrets manager or encrypted configuration, never into source control, a spreadsheet, or a chat message. A leaked Consumer Secret lets an attacker impersonate the connected app itself for any OAuth flow that relies on it (notably Client Credentials and Web Server flows), which is a materially different — and often worse — risk than a single leaked user password.

## Controlling who can use the app: OAuth policies

Creating the connected app isn't the end of the configuration. Under **Manage** → **Edit Policies**, an admin sets the **Permitted Users** policy, which controls who's allowed to actually authorize and use this integration:

- **All users may self-authorize** — any user can grant the app access to their own data the first time they try to use it.
- **Admin approved users are pre-authorized** — only users explicitly granted access (via profile or permission set assignment to the connected app) can use it; this is the standard choice for sensitive integrations, and it's also what allows OAuth flows like JWT Bearer to skip the interactive consent screen entirely, since the admin has already pre-authorized the integration user.

## Key terms

| Term | Meaning |
|---|---|
| Connected App | The Salesforce object that registers an external application's integration via SAML/OAuth/OIDC |
| Consumer Key | The OAuth client ID generated for a connected app |
| Consumer Secret | The OAuth client secret generated for a connected app; must be protected like a password |
| Callback URL | The redirect URI Salesforce sends the OAuth response to |
| Permitted Users policy | Controls whether users self-authorize or must be admin pre-authorized to use the app |

## Lab

In a free Developer Edition org, go to Setup → App Manager → New Connected App. Create a test connected app named "IAM Course Test App" with:

1. A contact email and OAuth enabled.
2. A callback URL of `https://login.salesforce.com/services/oauth2/success` (a safe placeholder for testing).
3. Only the `api` and `refresh_token` scopes selected — deliberately leaving out `full`.

After saving, open **Manage** → **Edit Policies** and set Permitted Users to "Admin approved users are pre-authorized." Write down what you'd need to do next (hint: assign a profile or permission set) before any user could actually use this app.

## Check yourself

- What is the relationship between a Connected App and the OAuth/SAML/OIDC protocols from the previous four lessons?
- Where do the Consumer Key and Consumer Secret come from, and how should the secret be handled?
- What's the practical difference between "All users may self-authorize" and "Admin approved users are pre-authorized"?
