import { expect } from "@playwright/test";

export class PaymentPage {
    constructor(page) {
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')  // new element for the discount input
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
        this.discountPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.totalPrice = page.locator('[data-qa= "total-value"]')
        this.payButton = page.locator('[data-qa="pay-button"]')

        this.name = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.date = page.locator('[data-qa="valid-until"]')
        this.cvc = page.locator('[data-qa= "credit-card-cvc"]')

    }
    activateDiscount = async () => {
        const discountCode = this.discountCode
        const discountCodeInput = this.discountCodeInput
        const activateDiscountButton = this.activateDiscountButton
        const discountMessage = this.discountMessage
        const discountPrice = this.discountPrice
        const totalPrice = this.totalPrice

        await discountCode.waitFor();
        const code = await discountCode.innerText();

        // Option 1 for laggy inputs: using. fill() with await expect
        await discountCodeInput.waitFor();
        await discountCodeInput.fill(code);
        await expect(discountCodeInput).toHaveValue(code)

        // Option 2 for laggy inputs: slow typing
        // await discountCodeInput.focus()
        // await this.page.keyboard.type(code, { delay: 1000 })
        // expect(await discountCodeInput.inputValue()).toBe(code)

        expect(await discountPrice.isVisible()).toBe(false)
        expect(await discountMessage.isVisible()).toBe(false)

        await activateDiscountButton.waitFor();
        await activateDiscountButton.click();
        // check that it displays "Discount activated"
        await discountMessage.waitFor();
        // check that there is now a discounted price total showing
        await discountPrice.waitFor()

        const discountValueText = await discountPrice.innerText();
        const discountValueOnlySringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlySringNumber, 10)

        await totalPrice.waitFor()
        const totalValueText = await totalPrice.innerText();
        const totalValueOnlySringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlySringNumber, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber);


    }

    fillPaymentDetails = async(paymentDetails) =>{
        await this.name.waitFor()
        await this.name.fill(paymentDetails.firstName)

        await this.cardNumber.waitFor()
        await this.cardNumber.fill(paymentDetails.cardNumber)

        await this.date.waitFor()
        await this.date.fill(paymentDetails.date)

        await this.cvc.waitFor()
        await this.cvc.fill(paymentDetails.cvc)
    }

    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL("http://localhost:2221/thank-you", {timeout: 3000})
    }


}