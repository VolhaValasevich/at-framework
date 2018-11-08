@main @header
Feature: Main Page Header

    @topbar
    Scenario: Verify user can view global sites
        Given I open "https://www.sandisk.com/" url
        When I click "Header > Country Bar > Global Icon"
        Then Page title should be "SanDisk Global Sites"

    @topbar
    Scenario: Verify user can perform search from the top bar
        Given I open "https://www.sandisk.com/" url
        When I click "Header > Country Bar > Search Container > Search Icon"
        And I type "text" in "Header > Country Bar > Search Container > Search Input"
        And I type "ENTER" in "Header > Country Bar > Search Container > Search Input"
        Then Page title should be "SanDisk Search Results"

    @navbar
    Scenario: Verify links in the navigation bar have correct titles
        Given I open "https://www.sandisk.com/" url
        When I wait until "Header > Navigation Bar" is present
        Then I should see the following lines in "Header > Navigation Bar > Navigation Links"
            | "FOR HOME"      |
            | "FOR BUSINESS"  |
            | "OEM DESIGN"    |
            | "ABOUT SANDISK" |
            | "SUPPORT"       |

    @navbar
    Scenario Outline: Verify user can click on the <title> link in the navigation bar
        Given I open "https://www.sandisk.com/" url
        When I wait until "Header > Navigation Bar" is present
        And I click "Header > Navigation Bar > Navigation Links #<index>"
        Then Page title should be "<title>"

        Examples:
            | index | title                                                     |
            | 1     | Global Leader in Flash Memory Storage Solutions \| SanDisk|
            | 2     | For Business - Sandisk Flash Storage Solutions            |
            | 3     | Sandisk - OEM Design Solutions                            |
            | 4     | About SanDisk - Expanding the Possibilities of Storage    |