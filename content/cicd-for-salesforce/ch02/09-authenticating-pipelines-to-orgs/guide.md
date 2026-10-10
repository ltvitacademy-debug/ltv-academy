# Lesson 9 — Authenticating Pipelines to Orgs

**Chapter 2 · Pipelines in Practice · Lesson 9 of 19**

## What you'll learn

- Why interactive, browser-based login (`sf org login web`) cannot work on a CI runner
- The real JWT Bearer flow setup: Connected App, digital signature, and the `sf org login jwt` command
- The four GitHub secrets a JWT-based pipeline needs, and what each one holds
- Why the JWT flow is the recommended approach over the simpler SFDX auth URL shortcut

## Why `sf org login web` is a dead end in CI

Day to day, authenticating the CLI to an org usually means `sf org login web`, which opens a browser, you log in, and the CLI stores a session. A GitHub Actions runner has no browser a human can interact with — it's a disposable machine that spins up, runs your job, and disappears. CI authentication has to be fully non-interactive, which is exactly what the **JWT Bearer flow** is built for.

## The JWT Bearer flow, piece by piece

The flow depends on a Connected App in the target org configured for digital signatures, plus an RSA key pair: the **private key** stays only in GitHub, and the matching **certificate** (public key) is uploaded to the Connected App in Salesforce Setup. Once that's configured, authenticating from CI is one command:

```yaml
      - name: Authenticate to Salesforce
        env:
          SF_PRIVATE_KEY: ${{ secrets.SF_PRIVATE_KEY }}
          SF_CLIENT_ID: ${{ secrets.SF_CLIENT_ID }}
          SF_USERNAME: ${{ secrets.SF_USERNAME }}
          SF_INSTANCE_URL: ${{ secrets.SF_INSTANCE_URL }}
        run: |
          printf '%s\n' "$SF_PRIVATE_KEY" > server.key
          sf org login jwt \
            --client-id "$SF_CLIENT_ID" \
            --jwt-key-file server.key \
            --username "$SF_USERNAME" \
            --instance-url "$SF_INSTANCE_URL" \
            --alias ci-target \
            --set-default
          rm -f server.key
```

## The four secrets

Create these under the repository's **Settings → Secrets and variables → Actions**, never committed to the repo itself:

- **`SF_CLIENT_ID`** — the Consumer Key from the org's Connected App.
- **`SF_PRIVATE_KEY`** — the full contents of the private key file, including the `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE KEY-----` lines.
- **`SF_USERNAME`** — the username of a **dedicated integration user** created specifically for the pipeline, never a real person's login.
- **`SF_INSTANCE_URL`** — the org's My Domain URL.

Writing the private key to a temporary file (`server.key`) inside the job, then deleting it with `rm -f` right after login, keeps the key off disk for longer than the single step that needs it. Passing secrets through `env:` rather than inlining `${{ secrets.* }}` directly into the shell script avoids quoting problems with a multi-line key value, and GitHub automatically masks any secret value that appears in logs.

## Why JWT over the SFDX auth URL shortcut

A faster-looking alternative exists: run `sf org login web --verbose` once locally, copy the printed **SFDX auth URL**, and store that single string as one GitHub secret instead of four. It works, but that URL *is* a live session credential — anyone who gets it has exactly the access the original login session had, with no separate key pair to rotate and no Connected App-level control over it. JWT is the safer default for a shared pipeline specifically because the private key and the Connected App are two separate, independently revocable pieces: you can rotate the certificate on the Connected App without touching the integration user's password, and you can see and manage the Connected App's access from Setup the way you can't with a bare session URL.

## Key terms

| Term | Meaning |
|---|---|
| JWT Bearer flow | A non-interactive OAuth flow using a signed token instead of a browser login |
| Connected App | The Salesforce Setup object configured with a digital signature for JWT auth |
| Dedicated integration user | A Salesforce user created specifically for pipeline access, not a real person |
| `sf org login jwt` | The CLI command performing JWT-based, non-interactive authentication |
| SFDX auth URL | A single-string session credential; simpler but less safely rotatable than JWT |

## Lab

Write out, step by step, everything that has to exist *before* the `sf org login jwt` command above can succeed: what you'd configure in the Connected App, what you'd generate as a key pair, which of the two halves goes where, and which four values you'd store as GitHub secrets. Then explain, in your own words, why a dedicated integration user is safer than using a real administrator's own username for this.

## Check yourself

Can you explain why `sf org login web` fundamentally cannot work inside a GitHub Actions job? Can you name all four JWT secrets and say what each one is for, without looking back at the lesson?
