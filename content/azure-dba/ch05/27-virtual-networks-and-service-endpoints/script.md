# Script — Virtual Networks & Service Endpoints

## Segment 1 (title)

An IP firewall rule trusts a header claiming to be from a certain address. A VNet service endpoint trusts something stronger — it extends your Virtual Network's own identity onto Azure SQL's public endpoint, so the rule can say "only traffic Azure itself confirms came from this subnet."

## Segment 2 (code: IP rule vs VNet rule)

An IP-based rule lets in anything claiming to be from a range. A VNet service endpoint rule lets in only traffic Azure itself confirms came from a specific subnet in a specific VNet — network identity, not a spoofable header.

## Segment 3 (steps: turning it on)

Enabling a service endpoint takes two matching configurations — the Microsoft.Sql endpoint turned on for the subnet itself, and a Virtual Network rule added on the Azure SQL server naming that exact subnet. Miss either side and it silently doesn't work.

## Segment 4 (outro)

A service endpoint still routes to Azure SQL's public endpoint — just through a tighter gate. It doesn't give the database a private IP, and the public endpoint still technically exists. Next up: Private Endpoints and Private Link, which remove that public endpoint entirely.
