## Segment 1 (title)

Setting DB_HOST directly in compose.yaml was fine -- it's not sensitive. A real database password or Stripe key is a different story, and it should never end up in a file that gets committed to git.

## Segment 2 (code)

Environment lists variables right in compose.yaml -- fine for non-sensitive config. env_file points at a separate file instead, loaded as variables inside the container.

## Segment 3 (code)

That separate file is .env, holding the real password and API key. This is exactly the file that must never be committed -- it stays local and gitignored.

## Segment 4 (code)

Compose secrets take it one step further: instead of an environment variable, db_password gets mounted as an actual file at slash run slash secrets slash db_password inside the container. Still a plain file on disk, though -- same rule applies, never commit it.

## Segment 5 (steps)

The pattern: gitignore .env and the secrets folder entirely. Commit a .env.example instead, listing the variable names with no real values, so every developer knows what's needed. And in production, real values come from the hosting platform's own secret injection, never from the repository.

## Segment 6 (outro)

That closes out Compose -- structure, multi-container stacks, health, and now configuration. Chapter Seven moves into production concerns: resource limits, logging, hardening, and a preview of what comes after Compose itself.
