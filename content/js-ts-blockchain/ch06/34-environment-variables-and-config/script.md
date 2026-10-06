# Script — Environment Variables & Config

## Segment 1 (title)

RPC keys and private keys belong outside your code entirely — here's the pattern almost every real Node project uses to keep them there.

## Segment 2 (code: never hardcode a secret)

The moment a real API key is committed to git, it's in that repository's history forever — deleting the line in a later commit doesn't remove it from git log. Every RPC key and private key needs to live outside the code.

## Segment 3 (code: .env and dotenv)

The convention: a dot-env file at the project root holding key-equals-value pairs. Importing dotenv-slash-config at the top of your entry file reads that file once at startup and copies every key into process-dot-env — the rest of your code just reads process.env.RPC_URL like any normal environment variable.

## Segment 4 (steps: .env.example and .gitignore)

A dot-env file must never be committed — it has real secrets. But a new teammate still needs to know which variables the project expects. dot-env goes in dot-gitignore so it's never committed by accident. dot-env-dot-example — with the same variable names but blank values — IS committed, documenting exactly what a new developer needs to fill in.

## Segment 5 (code: connecting to validated config)

process.env.RPC_URL is still string-or-undefined the moment dotenv finishes loading — dotenv only gets the value into process.env, it doesn't validate it. That's exactly the gap Lesson 30's zod schema closes: parse process.env through a schema, and env.RPC_URL comes back guaranteed to exist and be well-formed. Loading and validating are two separate steps solving two separate problems.

## Segment 6 (outro)

Next lesson: reading and writing real files from Node — caching data to disk instead of refetching it from the chain every time.
