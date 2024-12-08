import { setWorldConstructor } from "@wdio/cucumber-framework";

import{expect} from "chai";

class CustomWorld{
    testId: string
    aapId: string
    //function
    constructor()
    {
        this.aapId=""
        this.testId=""
    }
}

setWorldConstructor(CustomWorld)