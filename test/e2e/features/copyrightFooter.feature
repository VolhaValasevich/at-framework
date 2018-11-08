@footer
Feature: Copyright Footer

    Scenario: Verify copyright links have correct text
        Given I open "https://www.sandisk.com/" url
        When I wait until "Copyright Footer" is present
        Then I should see the following lines in "Copyright Footer > Copyright Links Bar > Copyright Links"
            | "Legal"                         |
            | "Terms of Use"                  |
            | "Trademarks"                    |
            | "Privacy Statement"             |
            | "California Supply Chains Act"  |
            | "Your CA Privacy Rights"        |
            | "Taiwan BSMI RoHS"              |
            | "About Ads & Cookies Statement" |
