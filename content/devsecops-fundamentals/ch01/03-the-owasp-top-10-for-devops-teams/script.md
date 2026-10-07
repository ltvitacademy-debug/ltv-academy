# Script — The OWASP Top 10 for DevOps Teams

## Segment 1 (title)

Threat modeling finds risks specific to your own system. The OWASP Top 10 is the industry's shared vocabulary for the risk categories that show up again and again across almost every web application, including the services Northbridge Retail runs. You need to recognize these by name, because they're what your scanning tools will report back to you.

## Segment 2 (code)

OWASP, the Open Worldwide Application Security Project, publishes this ranked list of the ten most critical web application risk categories, rebuilt periodically from real vulnerability data. Each entry is a category, not one specific bug — starting with broken access control, security misconfiguration, software supply chain failures, cryptographic failures, and injection.

## Segment 3 (code)

The second five: insecure design, authentication failures, software or data integrity failures, security logging and alerting failures, and mishandling of exceptional conditions. You don't need to memorize all ten — you need to recognize them when a scanner names one.

## Segment 4 (steps)

As a DevOps or platform engineer, you're less likely to write the application-layer bug yourself and far more likely to configure the pipeline that catches it. Three categories sit closest to your role: security misconfiguration, in your infrastructure-as-code and container defaults; software supply chain failures, in your dependencies and build pipeline; and logging and alerting failures, in your observability stack.

## Segment 5 (steps)

The list is a prioritization aid, not a ceiling. It's the categories most commonly found and most broadly applicable — not every risk Northbridge Retail's systems could ever face. A good scanning practice will surface findings that don't map neatly to any Top 10 entry, and that's expected.

## Segment 6 (outro)

Next up, lesson four: security across the software lifecycle.
