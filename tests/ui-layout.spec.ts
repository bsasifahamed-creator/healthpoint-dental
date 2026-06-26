import { expect, test } from '@playwright/test';

test.describe('Landing page UI layout audit', () => {
  test('hero and sections stay aligned without overflow', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Trusted dental care/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Care you can/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Plain prices/i })).toBeVisible();

    const overflowX = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflowX).toBeLessThanOrEqual(2);

    const heroButtons = page.locator('section').first().getByRole('button');
    await expect(heroButtons.nth(0)).toBeVisible();
    await expect(heroButtons.nth(1)).toBeVisible();

    const firstButtonBox = await heroButtons.nth(0).boundingBox();
    const secondButtonBox = await heroButtons.nth(1).boundingBox();
    expect(firstButtonBox).not.toBeNull();
    expect(secondButtonBox).not.toBeNull();

    if (firstButtonBox && secondButtonBox) {
      const overlap =
        firstButtonBox.x < secondButtonBox.x + secondButtonBox.width &&
        firstButtonBox.x + firstButtonBox.width > secondButtonBox.x &&
        firstButtonBox.y < secondButtonBox.y + secondButtonBox.height &&
        firstButtonBox.y + firstButtonBox.height > secondButtonBox.y;
      expect(overlap).toBeFalsy();
    }
  });
});
