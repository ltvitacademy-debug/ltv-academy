# Script — Environment Variables & Secrets

## Segment 1 (title)

A Northbridge Retail engineer once pushed a quick fix with the carrier's API key hardcoded right in the Python file. Nothing was stolen, but when it surfaced in the commit history months later, the key had to be rotated immediately. Secrets never belong in source code, not even just for now.

## Segment 2 (code)

Python reads environment variables through os.environ. Square-bracket lookup raises if the variable isn't set, while get lets you supply a fallback. For something a script truly can't run without, like an API key, failing loudly is usually the right call — you want a missing secret caught immediately, not silently defaulted to an empty string.

## Segment 3 (code)

Setting real environment variables by hand gets old fast, so the common pattern is a dot-env file loaded with python-dotenv. load_dotenv reads that file and injects its values into os.environ, so the rest of your code just calls os.environ normally, never knowing whether the value came from a real environment variable or a local file.

## Segment 4 (steps)

This is the rule that got broken: never hardcode a key or password directly in a script, and add the dot-env file to gitignore the moment you create it, not later. And if a secret does leak, deleting it from the file isn't the fix — it's still sitting in the git history. The fix is rotating it: issue a new one and revoke the old.

## Segment 5 (steps)

A dot-env file is for local development only — it's still a plaintext file on a laptop. Production systems should pull secrets from a dedicated manager like AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault, which add encryption, auditing, and rotation a plain file can't. Northbridge's production scripts now fetch the carrier key from a vault at runtime.

## Segment 6 (outro)

os.environ reads config and secrets that live outside your source file, dot-env makes that convenient for local work as long as it's git-ignored, and real secrets belong in a vault beyond your own laptop. Next up, lesson thirteen: Jinja2 templating, for generating config files instead of hand-writing every environment's version.
