Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario: Searching for a job
    Given the career page is opened
    Then the logo should be visible
    And the search form should be visible

    When Debrecen, Hungary is selected in the location filter box
    Then Debrecen should be selected in the location filter box

    When Software Test Engineering is selected in the department filter box
    Then Software Test Engineering should be selected in the department filter box

    When the search button is clicked on
    Then there should be a job offer for Test Automation Engineer position
    And the department of the Test Automation Engineer position should be Software Test Engineering
    And the location of the Test Automation Engineer position should be Debrecen, Hungary
    And the apply button of the Test Automation Engineer position should be visible

    When the apply button of the Test Automation Engineer position is clicked on
    Then the description of the job offer should contain "Test Automation Engineer"
    And the description of the job offer should contain "Debrecen"