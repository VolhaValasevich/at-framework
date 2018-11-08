@home
Feature: Home Page general tests

    @slider
    Scenario Outline: User can switch slides
        Given I open "https://www.sandisk.com/home" url
        When I click "Slider Section > Buttons #<index>"
        And I wait until "Slider Section > Slides #<index>" is present
        Then Text of "Slider Section > Slides #<index> > Title" should equal "<title>"
        And "Slider Section > Slides #<index> > Button" should be visible

        Examples:
            | index | title                                  |
            | 1     | SANDISK EXTREME PORTABLE SSD           |
            | 2     | iXPAND MINI                            |
            | 3     | WORLD'S\nHIGHEST-CAPACITY MICROSD CARD |
            | 4     | SANDISK ULTRA FIT\nUSB 3.1 FLASH DRIVE |

    @product_chooser
    Scenario: User can see results sorted by category
        Given I open "https://www.sandisk.com/home" url
        When I remember text of "Product List > Results Panel > Search Results #2 > Product Title" as "$productName"
        And I click "Product List > Filter Panel > Product Type Filter > Options #1 > Button"
        Then Text of "Product List > Results Panel > Search Results #1 > Product Title" should equal "$productName"

    @product_chooser
    Scenario: User can see results filtered by host
        Given I open "https://www.sandisk.com/home" url
        When I remember number of "Product List > Results Panel > Search Results" as "$resultsNumber"
        And I click "Product List > Filter Panel > Option Filter #1 > Options #2 > Button"
        Then Count of "Product List > Results Panel > Search Results" should not be "$resultsNumber"

    @product_chooser
    Scenario: User can view product page after clicking on a search result
        Given I open "https://www.sandisk.com/home" url
        When I remember page title as "$homePageTile"
        And I click "Product List > Results Panel > Search Results #1 > Button #2"
        Then Page title should not be "$homePageTile"

    Scenario: User can see an error message if they didn't agree to Privacy Statement before subscribing
        Given I open "https://www.sandisk.com/home" url
        When I remember attribute "class" of "Subscribe Section > Checkbox Error Message" as "$checkboxErrorMessageClass"
        And I click "Subscribe Section > Sign Up Button"
        Then Attribute "class" of "Subscribe Section > Checkbox Error Message" should not be "$checkboxErrorMessageClass"

    Scenario: User can click on the links in the navbar
        Given I open "https://www.sandisk.com/home" url
        When I remember index of "Header > Navigation Links" containing text "SSD" as "$ssdIndex"
        And I click "Header > Navigation Bar > Navigation Links #$ssdIndex"
        Then Page title should be "Solid State Drives | SanDisk"

    Scenario: User can scroll the window
        Given I open "https://www.sandisk.com/home" url
        When I scroll to "Functional Footer > Main Links Section > Main Links #1"
        Then Element "Functional Footer > Main Links Section > Main Links #1" should be visible in the viewport