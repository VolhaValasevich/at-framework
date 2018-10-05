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