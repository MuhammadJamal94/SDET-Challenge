import { expect } from "@playwright/test";
import { Locator, Page } from "playwright";

export class ArtistPage {
  readonly page: Page;
  readonly albumsHeader: Locator;
  readonly artistAlbumsGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    this.albumsHeader = page.getByRole("heading", { name: "Albums" });
    this.artistAlbumsGrid = this.albumsHeader.locator(
      "xpath=following-sibling::*[1]"
    );
  }

  async selectRandomAlbum() {
    const albumsDivs = this.artistAlbumsGrid.locator("div");
    const artistDivCount = await albumsDivs.count();

    if (artistDivCount === 0) {
      throw new Error("No albums found.");
    }

    const randomIndex = Math.floor(Math.random() * artistDivCount);
    const randomAlbumDiv = albumsDivs.nth(randomIndex);
    await randomAlbumDiv.click();
  }
}
