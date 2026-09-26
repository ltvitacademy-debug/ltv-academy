Clustering groups rows. Dimensionality reduction shrinks columns. Real datasets often carry dozens of features, many saying nearly the same thing. Principal component analysis, or PCA, finds a smaller set of new features that keep as much of the variation as possible.

The idea is simple. The first component is the direction along which the data varies the most. The second is the direction of the most remaining variation, at a right angle to the first. Each component is a weighted blend of the original columns.

Our illustrative dataset has four hundred customers and six features that are really driven by two hidden factors: engagement and value. Visits and app sessions correlate at zero point nine. Spend and basket size correlate at zero point nine five. Across the groups, the correlation is nearly zero.

Scale first, because PCA maximizes variance and would otherwise be dominated by spend. Then fit. The explained variance ratios are zero point four eight five, zero point four six, then almost nothing. Two components explain ninety four and a half percent. A steep cliff, then a flat tail, tells you how many to keep.

Loadings show what each component is made of. Component one weights spend, basket size, and items bought equally: a value axis. Component two weights visits, app sessions, and email opens equally: an engagement axis. PCA rediscovered the two hidden factors. The overall sign is arbitrary, so read the pattern, not the plus or minus.

Left, the scree plot, with the cliff after two components. Right, all four hundred customers in just two numbers each, colored by spend, which climbs along the first axis. Output of the code above.

The trade-off: fewer, uncorrelated features, but components are blends your stakeholders do not recognize. Fit PCA on training data only. Next, the Capstone, where you put the whole course together and build your first models.
