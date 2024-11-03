import { Locator, Page } from "playwright";

export class ArtistPage {
  readonly page: Page;
  readonly albumsHeader: Locator;
  readonly artistAlbumsGrid: Locator;
  readonly artistAlbums: Locator;

  constructor(page: Page) {
    this.page = page;
    this.albumsHeader = page.getByRole("heading", { name: "Albums" });
    this.artistAlbumsGrid = this.albumsHeader.locator(
      "xpath=following-sibling::*[1]"
    );
    this.artistAlbums = this.artistAlbumsGrid.locator("> div");
  }

  async selectRandomAlbumAndGetDetails() {
    let albumDetails: { id: string; name: string; artist: string } = {
      id: "",
      name: "",
      artist: "",
    };
    const artistDivCount = await this.artistAlbums.count();

    if (artistDivCount === 0) {
      throw new Error("No albums found.");
    }

    const randomIndex = Math.floor(Math.random() * artistDivCount);
    const randomAlbumDiv = this.artistAlbums.nth(randomIndex);
    albumDetails = await this.getAlbumDetails(randomAlbumDiv);
    await randomAlbumDiv.click();
    return albumDetails;
  }

  async getAlbumDetails(artistDiv: Locator) {
    if (!artistDiv) {
      throw new Error("No artist found. Please run checkSearchResults first.");
    }

    const albumLink = artistDiv.locator("a");
    const href = await albumLink.getAttribute("href");
    const albumId = href?.split("/").pop() || "";
    const albumName = await artistDiv.locator("p").first().innerText();
    const artistName = await artistDiv.locator("p").nth(1).innerText();

    return {
      id: albumId,
      name: albumName,
      artist: artistName,
    };
  }
}
