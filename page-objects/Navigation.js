import { isDesktopViewPort } from "../utils/isDesktopViewPort";

export class Navigation {
    constructor(page) {
        this.page = page;
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' });
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    getBasketCount = async () => {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    goToCheckOut = async() => {
        // if mobile viewport, first open the burger menu
        if (!isDesktopViewPort(this.page)) {
            await this.mobileBurgerButton.waitFor();
            await this.mobileBurgerButton.click();
         }
       
        const checkOut = this.checkOutLink
        const page = this.page
        await checkOut.waitFor();
        await checkOut.click();
        await page.waitForURL("/basket");
    }
 }