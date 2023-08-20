import { expect } from "@playwright/test";

export class Checkout {
    
    constructor(page){
        this.page = page;

        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.basketItemRemoveButton= page.locator('[data-qa="basket-card-remove-item"]');
        this.continueToCheckOutButton = page.locator('[data-qa="continue-to-checkout"]')
       
    }

    removeCheapestProduct = async () => {
        const basketItemRemoveButton = this.basketItemRemoveButton;
        const basketItemPrice = this.basketItemPrice;
        const basketCards = this.basketCards;

        const itemsBeforeRemoval = await basketCards.count();

        
        const allPriceTexts = await basketItemPrice.allInnerTexts();
        // { allPriceTexts: [ '499$', '599$', '320$' ] } -> [499, 599, 320]
        const justNumbers = allPriceTexts.map((element)=> {
            const withDollarSign= element.replace("$",""); // 499$ -> 499
            return parseInt(withDollarSign,10);
        })
        const smallestPrice = Math.min(justNumbers);
        const smallestPriceIndex= justNumbers.indexOf(smallestPrice);
        
        const specificRemoveButton = basketItemRemoveButton.nth(smallestPriceIndex);

        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(basketCards).toHaveCount(itemsBeforeRemoval - 1)
    }
    continueToCheckOut = async () => {
        const continueToCheckOutButton =   this.continueToCheckOutButton
        await continueToCheckOutButton.waitFor()
        await continueToCheckOutButton.click();
        await this.page.waitForURL(/\/login/, {timeout: 3000});
    }
    
}