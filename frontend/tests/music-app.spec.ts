import { test, expect, Locator } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ArtistPage } from "../pages/ArtistPage";

test.describe("Music App Tests", () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let artistPage: ArtistPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    artistPage = new ArtistPage(page);

    await page.goto("/");
  });

  test("New Releases content is displayed on the Home page", async () => {
    await expect(homePage.header).toBeVisible();
    await expect(homePage.newReleasesHeader).toBeVisible();
    await expect(homePage.newReleasesHeader).toHaveText("New Releases");
    await expect(homePage.newReleasesGrid).toBeVisible();
    // Check if at least one album is present in the New Releases section
    await expect(homePage.newReleasesAlbums).toHaveCount(
      await homePage.getNewReleasesAlbumsCount()
    ); // Expect at least one album to be present
  });

  test("Search for an artist using the search feature", async () => {
    await homePage.searchForArtist("Michael Bublé");
    await expect(homePage.page).toHaveURL(/search/);
    // Check if the search results are displayed
    await searchResultsPage.checkHeader("Michael Bublé");
    expect(searchResultsPage.checkSearchResults("Michael Bublé")).toBeTruthy();
  });

  test("Follow through to one of the artist's albums", async () => {
    let temp: Locator;
    await homePage.searchForArtist("Michael Bublé");
    await searchResultsPage.checkHeader("Michael Bublé");
    expect(searchResultsPage.checkSearchResults("Michael Bublé")).toBeTruthy();
    // await searchResultsPage.foundArtistDiv?.click();
    // temp = await searchResultsPage.getFoundArtist("Michael Bublé");
    // await temp.click();
    await expect(searchResultsPage.page).toHaveURL(/artist/);
    await searchResultsPage.page.waitForLoadState('networkidle');
    expect(artistPage.albumsHeader).toBeVisible();
    await artistPage.selectRandomAlbum();
    await searchResultsPage.page.waitForLoadState('networkidle');
  });

  test("Confirm album details and all song details are displayed within the album", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");
    const searchInput = await page.locator('input[placeholder="Search"]');
    await searchInput.fill("Artist Name");
    await searchInput.press("Enter");
    const artistResult = await page.locator("text=Artist Name");
    await artistResult.click();
    const album = await page.locator("text=Album Name");
    await album.click();
    const albumDetails = await page.locator("text=Album Details");
    await expect(albumDetails).toBeVisible();
    const songDetails = await page.locator('li:has-text("Song Name")');
    await expect(songDetails).toBeVisible();
  });
});
