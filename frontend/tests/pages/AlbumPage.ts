import { Locator, Page } from "playwright";

export class AlbumPage {
  readonly page: Page;
  readonly albumName: Locator;
  readonly albumArtist: Locator;
  readonly songsDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.albumName = page.locator("h1.text-center");
    this.albumArtist = page.locator("div.flex-wrap");
    this.songsDiv = page.locator("div.flex-grow").nth(0);
  }

  async verifySongsDisplayed(albumSongs: string[]): Promise<boolean> {
    const displayedSongs = await this.songsDiv
      .locator("h1.font-medium")
      .allTextContents();
    return albumSongs.every((song) => displayedSongs.includes(song));
  }

  async verifyAlbumSongs(albumId: string): Promise<string[]> {
    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          authorization: `Bearer ${await this.getBearerToken()}`,
          accept: "application/json",
        },
      }
    );

    const data = await response.json();
    const albumSongs = data.tracks.items.map((track: any) => track.name);
    return albumSongs;
  }

  async getBearerToken(): Promise<string> {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        authorization:
          "Basic NGNkMWRhNTIyYTYzNGRiZWFjMDI3MzdlM2NmOTY5OGI6NjUzMjdiMWEyODRjNDczM2I0Y2VlNGFlYTJkZjhjNDg=",
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  }
}
