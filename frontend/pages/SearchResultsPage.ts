import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";

export class SearchResultsPage {
  readonly page: Page;
  readonly header: Locator;
  readonly artistsResultsGrid: Locator;
  readonly artistsHeader: Locator;
  foundArtistDiv?: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(".text-3xl");
    this.artistsHeader = page.getByRole('heading', { name: 'Artists' });
    this.artistsResultsGrid = this.artistsHeader.locator('xpath=following-sibling::*[1]');
  }

  async checkHeader(artistName: string) {
    await expect(this.header).toHaveText(`Search result for: ${artistName}`);
  }

async checkSearchResults(artistName: string) {
    const artistDivs = this.artistsResultsGrid.locator('div');
    const artistDivCount = await artistDivs.count();

    for (let i = 0; i < artistDivCount; i++) {
            const artistDiv = artistDivs.nth(i);
            const artistNameText = await artistDiv.locator('p').first().innerText();
            if (artistNameText.includes(artistName)) {
                    this.foundArtistDiv = artistDiv;
                    // return true;
                    await artistDiv.click();
                    return artistDiv;
            }
    }

    throw new Error(`Artist ${artistName} not found in search results.`);
}

async getFoundArtist(artistName: string) {
    const artistDivs = this.artistsResultsGrid.locator('div');
    const artistDivCount = await artistDivs.count();

    for (let i = 0; i < artistDivCount; i++) {
            const artistDiv = artistDivs.nth(i);
            const artistNameText = await artistDiv.locator('p').first().innerText();
            if (artistNameText.includes(artistName)) {
                    return this.foundArtistDiv = artistDiv;
            }
    }

    throw new Error(`Artist ${artistName} not found in search results.`);
}
}
