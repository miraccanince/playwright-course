import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewPort } from "../utils/isDesktopViewPort.js";

export class ProductsPage {
  constructor(page) {
    this.page = page
    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropDown = page.locator('[data-qa="sort-dropdown"]');
    this.productTittle = page.locator('[data-qa="product-title"]');

  }

  visit = async () => {
    await this.page.goto("/");
  }

  sortByCheapest = async () => {

    const sortDropDown = this.sortDropDown
    const productTittle = this.productTittle;

    const productTittleBeforeSorting = await productTittle.allInnerTexts();
    await sortDropDown.selectOption("price-asc")
    const productTittleAfterSorting = await productTittle.allInnerTexts();
    expect(productTittleAfterSorting).not.toEqual(productTittleBeforeSorting);
  }

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButtons.nth(index)
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page)
    //only desktop viewport
    let basketCountBeforeAdding; // undefined value
    if (isDesktopViewPort(this.page)) {
       basketCountBeforeAdding = await navigation.getBasketCount()
    }
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    //only desktop viewport
    if (isDesktopViewPort(this.page)) {
      const basketCountAfterAdding = await navigation.getBasketCount()
      expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }
  }
}

