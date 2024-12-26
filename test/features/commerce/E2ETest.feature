Feature: Customer search

    @smoke
    Scenario Outline: <TestID> :External Customer search
        Given Get list of users from reqres.in
        When As a Admin user login to nopcommerce site
        #When Search user in customer list
        Then Verify if all the users exists in customer list
        Then Validate DB result

        Examples:
            | TestID           |
            | E2E_TC001        |