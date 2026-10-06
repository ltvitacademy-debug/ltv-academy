# Script — Organizations, Editions and Licenses

## Segment 1 (title)

This lesson covers what a Salesforce org actually is, the editions Salesforce sells, and the licenses that determine what each individual user can do.

## Segment 2 (steps: editions)

Every company gets its own organization, or "org" — your private, walled-off slice of the multitenant platform from Lesson 11. Salesforce sells that org at different edition tiers: Essentials for very small teams, Professional for growing teams with some limits, Enterprise as the most common tier with full automation and customization, and Unlimited or the free Developer Edition at the top.

## Segment 3 (screenshot: license query 1)

Here's a real query against the UserLicense object in a Salesforce org, pulled straight from Setup. It shows TotalLicenses — how many the company purchased — against UsedLicenses — how many are actually assigned to users right now.

## Segment 4 (screenshot: license query 2)

Here's a second batch of license types from that same org, including ExpirationDate — some licenses, like trials or certain add-on products, expire and need renewing. When Total and Used are equal, an admin literally cannot create another user of that type until more are purchased.

## Segment 5 (code: edition vs license)

So edition and license answer two different questions: edition asks what features can even exist in this org, while license asks what a specific person can do. Every user gets exactly one user license for base access, plus optional permission set or feature licenses layered on top for add-on products.

## Segment 6 (outro)

Next lesson, you'll learn about metadata-driven architecture — why almost everything you configure in Salesforce isn't really "code" in the traditional sense, and why that matters enormously for how customization actually works.
