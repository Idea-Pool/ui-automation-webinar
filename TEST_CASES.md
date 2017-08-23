# Test cases

## Search for a job

| # | Action | Expected |
|--:|:-------|:---------|
| 1 | Open EPAM career page | The page is opened AND the search form is visible |
| 2 | <ol><li>Click on Location filter box</li><li>Select Hungary / Debrecen</li></ol> | The location filter box should contain Debrecen | 
| 3 | <ol><li>Click on Teams and Roles filter box</li><li>Select Software Test Engineering</li></ol> | The teams and roles filter box should contain Software Test Engineering tile |
| 4 | Search button is clicked | <ol><li>The Test Automation Engineer position should be visible</li><li>The category of the position should be Software Test Engineering</li><li>The location of the position should be Debrecen, Hungary</li><li>There should be an Apply button for the position</li></ol> |
| 5 | Click on Apply button of the position | <ol><li>The job description should contain Debrecen</li><li>The job description should contain Automation Engineer</li></ol> |