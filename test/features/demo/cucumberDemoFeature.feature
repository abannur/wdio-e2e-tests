@smoke
Feature: Cucumber Demo
    I can have more info about the feature...
    I can have more info about the feature...
    I can have more info about the feature...
    - questions/clarification
    - Known issues
    - Things to do

    #only one background is allowed in a feature file
    Background: Launch google page
    Given Google page is opened
    Feature Description
    @smoke
    Scenario: Scenario name
        When Search with WDIO
        Then Click on first search result
        * Url should match https://webdriver.io/ 


    Scenario: Scenario name
        When Search with webdriver
        Then Click on first search result
        And Url should match https://webdriver.io/ 


    Scenario: Demo web interactions
        Given Login to the inventory web app
        |UserType   |UserName               |
        |StdUser    |standard_user          |
        |LockUser   |locked_out_user        |
        |PrblUser   |problem_user           |
        |PerfUser   |performance_glitch_user|
        |ErrUser    |error_user             |
        |VisUser    |visual_user            |
        Given As a standard user I login to the inventory web app
        Then Inventory page should not list <NumberOfProducts>
        Then Validate all products have valid price

    #data tables
