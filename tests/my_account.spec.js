import {test} from "@playwright/test"
import { MyAccount } from "../page-objects/MyAccount.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"

// jenkins, circleCI, TravisCI, GitHub Actions

test("My account using cookie injection and mocking network request", async ({page}) =>{
    const loginToken= await getLoginToken(adminDetails.username, adminDetails.password)
    
    await page.route("**/api/user**" , async (route, request) => {
       await route.fulfill({
        status:500,
        contentType: "application/json",
        body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
       })
    })

    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await page.pause();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token="+ loginTokenInsideBrowserCode
    },
    [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await page.pause();
})


    
    