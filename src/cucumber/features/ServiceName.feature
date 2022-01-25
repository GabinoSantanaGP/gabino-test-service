Feature: Feature name

  # Feature Description

  # Scenarios in the 3rd Person.
  # Scenarios are abstract with no context.
  #   Scenario Outline: Number Validation
  #   Given a user is presented a number input with a <validation_type> allowed value
  #   When the user inputs <range> than the <validation_type> amount
  #   Then the <validation_type> validation message appears
  #   And the <validation_type> validation message disappears when answer is corrected
  #   Examples:
  #     | validation_type | range |
  #     | minimum         | less  |
  #     | maximum         | more  |

  Scenario Outline: increment variable
    Given a variable set to 1
    When the variable is incremented by 1
    Then the variable should contain 2
    Examples:
      | var | increment | result |
      | 1   | 1         | 2      |
