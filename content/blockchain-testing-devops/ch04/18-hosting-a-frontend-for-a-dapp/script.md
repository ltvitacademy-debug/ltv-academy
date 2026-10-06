# Script — Hosting a Frontend for a dApp

## Segment 1 (title)

A smart contract is trustless because anyone can verify it on-chain. The frontend that talks to it is just a website -- and a website lives or dies on ordinary hosting, DNS, and deploy pipelines, the same as any other product.

## Segment 2 (screenshot: deploy outputs)

A real deploy doesn't just upload HTML. It produces static assets, serverless functions for anything server-rendered, and edge middleware -- all versioned together, all from one push, all instantly rollback-able if something's wrong.

## Segment 3 (screenshot: preview per PR)

Every pull request gets its own live preview URL. That means a reviewer -- or an auditor -- can click "Connect Wallet" on the actual proposed UI before it ever reaches production, not just read a diff and imagine what it does.

## Segment 4 (screenshot: domain verified)

Users don't type a vercel.app or netlify.app URL into a wallet's dApp browser. They type the project's real domain. Verifying DNS is the last unglamorous step between a working build and something people actually trust.

## Segment 5 (steps: three guarantees)

Static export means no server to compromise. Preview-per-PR means review happens against the real UI. A verified custom domain means the thing users load is the thing you actually built -- three separate guarantees, not one.

## Segment 6 (outro)

Hosting a frontend is the easy half of the off-chain stack. Indexers and backend services are the harder half -- they hold state, run continuously, and that's where Lesson 19 picks up: containerizing them properly.
