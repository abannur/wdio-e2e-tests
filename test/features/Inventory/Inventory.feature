Feature: Inventory

    @demo
    Scenario Outline: <TestID> :Demo web interactions
        Given Login to the inventory web app
        Then Inventory page should list <NumberOfProducts>
        #Then Validate all products have valid price

        Examples:
            | TestID    |NumberOfProducts|
            | Inv_TC001 | 6              |