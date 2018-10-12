Feature: Home Page general tests

    Scenario Outline: User can switch slides
        Given I open "https://www.sandisk.com/home" url
        When I click "Slider Section > Buttons #<index>"
        And I wait until "Slider Section > Slides #<index>" is present
        Then Text of "Slider Section > Slides #<index> > Title" should equal <title>
        And "Slider Section > Slides #<index> > Button" should be visible

        Examples:
            | index | title                                    |
            | 1     | "SANDISK EXTREME PORTABLE SSD"           |
            | 2     | "iXPAND MINI"                            |
            | 3     | "WORLD'S\nHIGHEST-CAPACITY MICROSD CARD" |
            | 4     | "SANDISK ULTRA FIT\nUSB 3.1 FLASH DRIVE" |

    Scenario: User can see results sorted by category
        Given I open "https://www.sandisk.com/home" url
        When I remember text of "Product List > Results Panel > Search Results #2 > Product Title" as "$productName"
        Then I click "Product List > Filter Panel > Product Type Filter > Options #1 > Button"
        Then Text of "Product List > Results Panel > Search Results #1 > Product Title" should equal "$productName"