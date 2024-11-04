import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ArtistPage } from "../pages/ArtistPage";
import { AlbumPage } from "../pages/AlbumPage";

interface AlbumDetails {
  id: string;
  name: string;
  artist: string;
}

test.describe("Music App Tests", () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let artistPage: ArtistPage;
  let albumPage: AlbumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    artistPage = new ArtistPage(page);
    albumPage = new AlbumPage(page);

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
    let albumDetails: AlbumDetails;

    await homePage.searchForArtist("Michael Bublé");
    await searchResultsPage.checkHeader("Michael Bublé");
    expect(searchResultsPage.checkSearchResults("Michael Bublé")).toBeTruthy();
    await expect(searchResultsPage.page).toHaveURL(/artist/);
    await searchResultsPage.page.waitForLoadState("networkidle");
    expect(artistPage.albumsHeader).toBeVisible();
    albumDetails = await artistPage.selectRandomAlbumAndGetDetails();
    await searchResultsPage.page.waitForLoadState("networkidle");
    await expect(albumPage.albumName).toHaveText(albumDetails.name);
  });

  test("Confirm album details and all song details are displayed within the album", async () => {
    let albumDetails: AlbumDetails;

    await homePage.searchForArtist("Michael Bublé");

    await searchResultsPage.checkHeader("Michael Bublé");
    await searchResultsPage.checkSearchResults("Michael Bublé");
    await searchResultsPage.page.waitForLoadState("networkidle");

    // Select a random album and get its details
    albumDetails = await artistPage.selectRandomAlbumAndGetDetails();
    console.log(albumDetails);

    await expect(artistPage.page).toHaveURL(
      new RegExp(`/album/${albumDetails.id}`)
    );

    // Verify album details
    await expect(albumPage.albumName).toHaveText(albumDetails.name);
    await expect(albumPage.albumArtist).toHaveText(albumDetails.artist);
    await expect(albumPage.songsDiv).toBeVisible();

    // Verify song details
    const albumSongs = await albumPage.verifyAlbumSongs(albumDetails.id);
    expect(albumPage.verifySongsDisplayed(albumSongs)).toBeTruthy();
  });
});
