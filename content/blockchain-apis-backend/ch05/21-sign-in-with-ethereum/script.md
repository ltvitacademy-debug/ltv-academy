# Script — Sign-In With Ethereum

## Segment 1 (title)

A login flow is the reverse of what every earlier chapter did: a user shows up with their own wallet and has to prove they control it, without a password and without your server touching their key. Message signing is the mechanism — SIWE is the standard for doing it safely.

## Segment 2 (code: the real message format)

This is the actual example from the EIP-4361 spec itself. Every field matters: domain is what lets a wallet detect phishing, nonce is what stops a captured signature from being replayed, chain ID and issued-at scope it further.

## Segment 3 (steps: the flow end to end)

The backend issues a nonce, the frontend builds the message and asks the wallet to sign it, the wallet shows the user that message before signing, and the signature comes back to the backend to verify.

## Segment 4 (code: building it with siwe)

The reference siwe library builds this from a plain object. prepareMessage turns the structured fields into the exact spec-conformant string the wallet signs — matching that format exactly is what server-side verification depends on.

## Segment 5 (outro)

This lesson covered the message. Lesson 22 covers the other half: actually verifying the signature against it on the server, and what can go wrong if you skip a step.
