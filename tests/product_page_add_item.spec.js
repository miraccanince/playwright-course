import {test, expect} from "@playwright/test"

test.skip("Product Page Add To Basket", async ({ page })=> {
    await page.goto("/");

    // page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button');
    const addToBasketButton =  page.locator('[data-qa="product-button"]').first();
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    
    await addToBasketButton.waitFor();
    await expect(addToBasketButton).toHaveText("Add to Basket");
    await expect(basketCounter).toHaveText("0");

    await addToBasketButton.click();

    await expect(addToBasketButton).toHaveText("Remove from Basket");
    await expect(basketCounter).toHaveText("1");

    const checkOutLink = page.getByRole('link', { name: 'Checkout' });
    await checkOutLink.waitFor();
    await checkOutLink.click();
    await page.waitForURL("/basket");
})


