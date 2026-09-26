# Script — Bivariate Analysis

## Segment 1 (title)

Bivariate analysis compares two variables at a time. This is where EDA starts producing the findings people care about: which customers spend more, which region churns most, whether longer relationships mean more orders.

## Segment 2 (steps)

The right technique depends on the types of the two variables, so name them first. Two numeric columns call for a scatter plot and a correlation. A numeric column against a category calls for a group by summary or a box plot. Two categories call for a cross tab, or bars of rates. Naming the types picks the tool for you.

## Segment 3 (code)

Here is a scatter plot of tenure against orders, next to a bar chart of churn rate by region. Because churned is a zero-or-one column, its mean is the churn rate, so a bar plot of that column draws rates directly. The code is on screen; we turn off the error bars to keep it simple.

## Segment 4 (screenshot)

On the left, the cloud rises from lower left to upper right. Customers with longer tenure tend to have more orders. The correlation for those two columns is about zero point five five. On the right, South stands out with the tallest bar.

## Segment 5 (code)

Now compare total spend across channels, showing mean and median side by side. The means say app customers spend the most. But the medians are almost identical, between about one seventeen and one twenty-nine. The means differ because two enormous values landed in the app and web groups. Comparing means when outliers are present can make a difference that is really just two rows.

## Segment 6 (code)

For two categories, use a cross tab and normalize by row so you compare rates. South churns at about twenty-nine percent, East at fifteen. But South has only ninety-nine customers, so its rate can swing more. Treat this as a lead worth testing later, not a conclusion, and remember that association is not causation.

## Segment 7 (outro)

Match the tool to the variable types, compare medians as well as means, and check group sizes. Up next, multivariate exploration: three or more variables at once.
