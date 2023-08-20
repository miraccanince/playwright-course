export class LoginPage {
    constructor(page) {
        this.page = page
        this.moveToSignUpButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveToSignUp = async () => {
        const moveToSignUpButton = this.moveToSignUpButton
        await moveToSignUpButton.waitFor();
        await moveToSignUpButton.click();
        await this.page.waitForURL(/\/signup/, { timeout: 3000 });
    }
}
