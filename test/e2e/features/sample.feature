Feature: Main Page

    Scenario: Verify user can click on an icon
    Given I open "https://www.sandisk.com/home" url
    When I wait until "Product List > Results Bar > Selected Category" is present
    Then Text of "Product List > Results Bar > Selected Category" should equal "Featured Items"
