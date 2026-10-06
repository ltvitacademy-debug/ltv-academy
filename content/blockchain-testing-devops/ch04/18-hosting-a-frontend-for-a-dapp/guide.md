# Lesson 18 — Hosting a Frontend for a dApp

**Chapter 4 · Hosting the Off-Chain Stack · Lesson 18 of 29**

## What you'll learn

- Why a dApp's frontend needs the same hosting discipline as any other production web app
- What a real deploy actually ships: static assets, serverless functions, edge middleware
- How preview deployments let reviewers click through the real UI before merge
- Why a verified custom domain is the last trust boundary between your build and your users

## The contract is trustless. The frontend isn't.

A smart contract's guarantees come from the chain: anyone can read the bytecode, replay the transactions, verify the source against the deployed address (Chapter 3, Lesson 14). None of that applies to the website that calls the contract. The frontend is ordinary client-side code, served from ordinary infrastructure, and it inherits every normal web risk -- a compromised build pipeline, a hijacked DNS record, a stale deploy serving an old contract address. Hosting it properly isn't optional polish; it's the thing standing between "the contract is safe" and "the thing users actually interact with is safe."

## What a deploy actually produces

![Vercel's deployment summary, showing static assets, serverless functions, and ISR functions all produced and versioned together from a single deploy.](/courses/blockchain-testing-devops/ch04/18-hosting-a-frontend-for-a-dapp/deploy-outputs.png)

Most dApp frontends aren't pure static sites anymore -- a Next.js app routing wallet-connect state, fetching from an indexer (Lesson 19), and server-rendering a few pages produces a mix of static assets, serverless functions, and sometimes edge middleware. A platform like Vercel or Netlify builds and versions all of it together from one push, and every piece of that deploy can be rolled back atomically if something's wrong -- not patched file by file.

## A preview URL for every pull request

![Netlify's deploy preview flow: each pull or merge request automatically gets its own live preview URL, separate from production.](/courses/blockchain-testing-devops/ch04/18-hosting-a-frontend-for-a-dapp/deploy-preview-git-example.png)

This is the single biggest quality-of-life upgrade over hosting a frontend by hand: every pull request automatically gets a live, shareable URL running the actual proposed code. A reviewer can connect a test wallet and click through the real flow -- not just read a diff and imagine what the UI does. For a dApp, where a frontend bug can mean a user signs the wrong transaction, that's not a nice-to-have.

## Pointing a real domain at it

![Vercel's domain verification status, showing a custom domain confirmed "Configured Correctly" via DNS records.](/courses/blockchain-testing-devops/ch04/18-hosting-a-frontend-for-a-dapp/domain-properly-configured.png)

Nobody types a `.vercel.app` or `.netlify.app` URL into a wallet's in-app browser. They type (or bookmark, or Google) the project's actual domain. Verifying that DNS is correctly configured is the last unglamorous step connecting the build pipeline above to something users actually trust enough to load and connect a wallet to.

## Key terms

| Term | Meaning |
|---|---|
| Static export | A frontend build that ships as plain HTML/JS/CSS with no server process to compromise |
| Preview deployment | A live, shareable URL automatically generated for a pull request, separate from production |
| DNS verification | Confirming a custom domain's records correctly point at the hosting platform before traffic relies on it |

## Check yourself

You're ready for Lesson 19 when you can explain: why does a preview-per-PR deployment matter more for a dApp frontend than for a typical web app, and what three separate guarantees does this lesson's closing steps card describe?
