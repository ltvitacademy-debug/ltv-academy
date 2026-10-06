# Configuring Suppliers

**Chapter 1 · Design and Configuration · Lesson 6 of 25**

With the enterprise structure and chart of accounts in place, you can finally configure master data that transactions will actually reference. This lesson sets up LTV's four suppliers — the ones you'll buy from throughout Chapter 2, and the ones at the center of two of Chapter 3's six problems.

## What you'll learn

- LTV's four suppliers, their sites, and what each one supplies
- How a supplier site ties to a business unit and a payment method
- Why Meridian Bearing Supply Co. gets configured as a preferred supplier with an EFT-enabled bank account
- The setup decisions that make Chapter 2's purchasing lessons possible

## LTV's four suppliers

| Supplier | What they supply | Primary BU |
|---|---|---|
| **Meridian Bearing Supply Co.** | Bearings and mechanical MRO parts | US Manufacturing & Distribution BU |
| **Palmetto Steel & Alloy Supply** | Raw steel for Fabrication | US Manufacturing & Distribution BU |
| **Vantage Electrical Components Inc.** | Electrical components for control panels | US Manufacturing & Distribution BU |
| **Crescent Freight Logistics** | Inbound and outbound freight | US Manufacturing & Distribution BU |

All four are configured under the US Manufacturing & Distribution BU, since Chapter 2's purchasing activity runs through the Savannah plant.

## Configuring Meridian Bearing Supply Co.

Meridian gets the most detailed setup because it's LTV's preferred MRO supplier and the one Chapter 2's purchasing lesson follows start to finish:

- **Supplier record:** Meridian Bearing Supply Co., supplier type "Manufacturing," tax organization type "Corporation."
- **Supplier site:** one site, "Meridian — Primary," assigned to the US Manufacturing & Distribution BU, with its own set of payables options (payment terms Net 30, matching required at the three-way level since bearings are a stocked, received item).
- **Payment method:** Electronic Funds Transfer (EFT), with a supplier bank account on file — Chapter 2's payments lesson uses this exact EFT setup.
- **Preferred supplier flag:** set, which is what makes Meridian the natural default when Marcus Ibarra sources the bearing purchase order in lesson 9.

## Configuring the other three suppliers

Palmetto Steel & Alloy Supply, Vantage Electrical Components Inc., and Crescent Freight Logistics are configured with the same pattern — one primary site each under the US BU, Net 30 terms, three-way matching for stocked goods — but without the preferred-supplier flag, since this capstone's transaction walkthrough centers on Meridian. They exist so your practice environment has a realistic, multi-supplier roster, the same way a real implementation would never configure just one supplier and call it done.

## Why supplier setup has to come before purchasing

A requisition or purchase order can't be created against a supplier that doesn't exist, and it can't be paid without a valid payment method and bank account on the supplier site. Every field configured in this lesson is a field lesson 9 through 11 will actually use — there's no decorative setup here.

## Key terms

| Term | Meaning |
|---|---|
| Supplier site | The business-unit-specific instance of a supplier record that actually transacts |
| Preferred supplier | A flag that makes a supplier the default sourcing choice for matching item categories |

## Recap

LTV's four suppliers — Meridian Bearing Supply Co., Palmetto Steel & Alloy Supply, Vantage Electrical Components Inc., and Crescent Freight Logistics — are now configured under the US Manufacturing & Distribution BU, with Meridian set up in full detail as the preferred MRO supplier with EFT payment enabled. Next up, lesson 7: configuring customers — the other side of LTV's transaction activity.
