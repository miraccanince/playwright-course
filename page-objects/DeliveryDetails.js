import { expect } from "@playwright/test";

export class DeliveryDetails {
    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.countryDropDwon= page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.saveAddressFirstName= page.locator('[data-qa="saved-address-firstName"]')
        this.saveAddressLastName= page.locator('[data-qa="saved-address-lastName"]')
        this.saveAddressStreet= page.locator('[data-qa="saved-address-street"]')
        this.saveAddressPostCode= page.locator('[data-qa="saved-address-postcode"]')
        this.saveAddressCity= page.locator('[data-qa="saved-address-city"]')
        this.saveAddressCountry= page.locator('[data-qa="saved-address-country"]')


        
        this.ContinueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async (userAddress) => {
        
        await this.firstName.waitFor();
        await this.firstName.fill(userAddress.firstName);

        await this.lastName.waitFor();
        await this.lastName.fill(userAddress.lastName);

        await this.street.waitFor();
        await this.street.fill(userAddress.street);

        await this.postCode.waitFor();
        await this.postCode.fill(userAddress.postCode)

        await this.city.waitFor();
        await this.city.fill(userAddress.city);

        await this.countryDropDwon.waitFor();
        await this.countryDropDwon.selectOption(userAddress.country);
    }
    saveDetails = async () => {
        const addressCountBeforeSaving = await this.saveAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1 )
        
        await this.saveAddressFirstName.first().waitFor();
        expect(await this.saveAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue())

        await this.saveAddressLastName.first().waitFor();
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastName.inputValue())

        await this.saveAddressStreet.first().waitFor();
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.street.inputValue())

        await this.saveAddressPostCode.first().waitFor();
        expect(await this.saveAddressPostCode.first().innerText()).toBe(await this.postCode.inputValue())

        await this.saveAddressCity.first().waitFor();
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.city.inputValue())

        await this.saveAddressCountry.first().waitFor();
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.countryDropDwon.inputValue())
 

    }

    continueToPayment = async () => {
        await this.ContinueToPaymentButton.waitFor();
        await this.ContinueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, {timeout:3000})
    }
   
}
