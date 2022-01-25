Feature: Form Wizard

  # Feature Description

  # Scenarios in the 3rd Person.
  # Scenarios are abstract with no context.
  #   Scenario Outline: Number Validation
  #   Given a user is presented a number input with a <validation_type> allowed value
  #   When the user inputs <range> than the <validation_type> amount
  #   Then the <validation_type> validation message appears
  #   And the <validation_type> validation message disappears when answer is corrected
 #   And the <validation_type> validation message disappears when answer is corrected
  #   Examples:
  #     | validation_type | range |
  #     | minimum         | less  |
  #     | maximum         | more  |

  # Scenario: Required Field Validation
  #   Given a user is presented with a required input
  #   When the user does not provide a value
  #   Then the required validation message appears
  #   And the required validation message disappears when answer is corrected

  # Scenario: Invalid answers do not prevent navigation
  #   When user enters invalid answers on a step
  #   Then user can proceed to next or previous step

  # Scenario: Existing Validation Errors are displayed by default
  #   When a user returns to a step with an invalid answer
  #   Then the appropriate validation message is present

  # Scenario: Invalid form prevents submission
  #   When a user has not asnwered all mandatory questions with valid answers
  #   Then user cannot submit final answers

  # Scenario: Answers are editable until final submmit
  #   Given a user has not submitted a form
  #   When the user navigates to previous step
  #   Then answers can be edited



  Scenario Outline: Restricted <field> fields are obfuscated by default upon <action>
    When a professional is on Canadian payroll details
    Then the <field> field is obfuscated by default upon <action>
    And the user can select to view the <field> upon <action>
    Examples:
      | Dataset name             | action    | field      |
      | entering SIN             | entering  | sin        |
      # | entering account number  | entering  | account_no |
      | reviewing SIN            | reviewing | sin        |
      | reviewing account number | reviewing | account_no |

  # Scenrios written in the 1st person.
  # These scenarios have context (bank details form)
  Scenario: See Bank Details Form
    Given I have not completed the action item for bank details
    When I navigate to the bank details wizard
    Then I should see the bank details form

  Scenario: Enter Bank Details
    When I am on the form
    And I've entered an answer into all available fields
    Then I can review my answers

  Scenario: Professional is informed upon successful save
    When the professional has successfully saved their banking details
    Then the professional is on the banking details confirmation page

  Scenario: Professional is returned home after acknowledging confirmation
    When the professional acknowledges success confirmation
    Then the user is returned to the professional dashboard

  Scenario Outline: Province Selection is disabled when Province Optional answer is PROCESSING or COMPLETE
    Given a Professional has signed a TD1 province form
    When the province_optional answer is marked <answer>
    Then the province selection is <result> 
    Examples:
      | answer       | result   |
      | IN_PROGRESS  | enabled  |
      | PROCESSING   | disabled |
      | COMPLETE     | disabled |