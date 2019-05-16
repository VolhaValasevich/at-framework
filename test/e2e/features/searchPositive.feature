Feature: iKnow Search

  @pass
  Scenario: User searches for a "tax" term and opens a document
    Given I open base url
    When I clear value in "Home Search Input"
    And I type "tax" in "Home Search Input"
    And I click "Search Submit Button"
    And I wait until "Search Results" is present
    Then Count of "Clusters" should not be "0"
    And Count of "Clusters > Results" should not be "0"
    And Count of "Highlighted Terms" should not be "0"
    And Text of "Highlighted Terms #1" should contain "tax" being case insensitive

    When I remember text of "Clusters > Results #1 > Title" as "title"
    And I click "Clusters > Results #1 > Title"
    And I wait until "Document Area" is visible
    Then Text of "Document Title" should contain "$title"
    And Text of "Highlighted Terms #1" should contain "tax" being case insensitive