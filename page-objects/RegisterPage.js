
export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: 'Register' })

    }

    signUpAsNewUser = async (email, password) => {
        const emailInput = this.emailInput;
        const passwordInput = this.passwordInput;
        const registerButton = this.registerButton;

        await emailInput.waitFor();
        await emailInput.fill(email)

        await passwordInput.waitFor();
        await passwordInput.fill(password);

        await registerButton.waitFor();
        await registerButton.click();
    }
}
