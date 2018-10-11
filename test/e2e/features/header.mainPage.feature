Feature: Main Page Header

    Scenario: Verify user can view global sites
        Given I open "https://www.sandisk.com/" url
        When I click "Header > Country Bar > Global Icon"
        Then Page title should be "SanDisk Global Sites"

    Scenario: Verify user can perform search from the top bar
        Given I open "https://www.sandisk.com/" url
        When I click "Header > Country Bar > Search Container > Search Icon"
        And I type "text" in "Header > Country Bar > Search Container > Search Input"
        And I type "ENTER" in "Header > Country Bar > Search Container > Search Input"
        Then Page title should be "SanDisk Search Results"

    Scenario Outline: Verify links in the navigation bar have correct titles
        Given I open "https://www.sandisk.com/" url
        When I wait until "Header > Navigation Bar" is present
        Then Text of <element> should equal <text>

        Examples:
            | element                                         | text            |
            | "Header > Navigation Bar > Navigation Links #1" | "FOR HOME"      |
            | "Header > Navigation Bar > Navigation Links #2" | "FOR BUSINESS"  |
            | "Header > Navigation Bar > Navigation Links #3" | "OEM DESIGN"    |
            | "Header > Navigation Bar > Navigation Links #4" | "ABOUT SANDISK" |
            | "Header > Navigation Bar > Navigation Links #5" | "SUPPORT"       |

    Scenario Outline: Verify user can click on the links in the navigation bar
        Given I open "https://www.sandisk.com/" url
        When I wait until "Header > Navigation Bar" is present
        And I click <element>
        Then Page title should be <title>

        Examples:
            | element                                         | title                                                       |
            | "Header > Navigation Bar > Navigation Links #1" | "Global Leader in Flash Memory Storage Solutions \| SanDisk"|
            | "Header > Navigation Bar > Navigation Links #2" | "For Business - Sandisk Flash Storage Solutions"            |
            | "Header > Navigation Bar > Navigation Links #3" | "Sandisk - OEM Design Solutions"                            |
            | "Header > Navigation Bar > Navigation Links #4" | "About SanDisk - Expanding the Possibilities of Storage"    |