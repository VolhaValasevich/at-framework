Feature: Main Page

    Scenario: Verify user can click on an icon
    Given I open "https://www.sandisk.com/home" url
    When I wait until "Product List > Results Bar > Selected Category" is present
    Then Text of "Product List > Results Bar > Selected Category" should equal "Featured Items"

    Scenario: Verify user can click on a navigation link
    Given I open "https://www.sandisk.com/" url
    When I wait until "Header > Navigation Bar" is present
    And I click "FOR HOME" text in "Header > Navigation Bar > Navigation Links"
    Then "Product List" should be visible

    Scenario: Verify user can click on a navigation link by number
    Given I open "https://www.sandisk.com/" url
    When I wait until "Header > Navigation Bar" is present
    And I click "Header > Navigation Bar > Navigation Links #2"
    Then Page title should be "For Business - Sandisk Flash Storage Solutions"

    Scenario: Verify user can click on a button by number
    Given I open "https://www.sandisk.com/home" url
    When I click "Product List > Results Panel > Search Results #2 > Button #2"
    Then Page title should be "SanDisk iXpand Mini Flash Drive"