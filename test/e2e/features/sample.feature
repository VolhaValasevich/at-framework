Feature: Main Page

    Scenario: Verify user can click on an icon
    Given I open "https://www.sandisk.com/home" url
    When I wait "10" seconds
    Then Text of "Product List > Results Bar > Selected Category" should equal "Featured Items"
