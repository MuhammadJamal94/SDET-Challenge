import { Locator, Page } from 'playwright';

export class HomePage {
    readonly page: Page;
    readonly header: Locator;
    readonly newReleasesHeader: Locator;
    readonly newReleasesGrid: Locator;
    readonly newReleasesAlbums: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('link', { name: 'SAS SDET' });
        this.newReleasesHeader = page.getByRole('heading', { name: 'New Releases' });
        this.newReleasesGrid = this.newReleasesHeader.locator('xpath=following-sibling::*[1]');
        this.newReleasesAlbums = this.newReleasesGrid.locator('> div');
        this.searchInput = page.getByPlaceholder('Search...');
    }

    async navigateTo() {
        await this.page.goto('/');
    }

    async getHeader() {
        return this.header;
    }

    async getNewReleasesAlbumsCount() {
        return this.newReleasesAlbums.count();
    }

    async searchForArtist(artist: string) {
        await this.searchInput.fill(artist);
        await this.searchInput.press('Enter');
    }
}