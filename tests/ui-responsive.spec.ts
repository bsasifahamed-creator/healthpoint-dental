import { expect, test } from '@playwright/test';

type Viewport = { name: string; width: number; height: number };

const viewports: Viewport[] = [
  { name: 'mobile', width: 390, height: 844 }, // iPhone 12/13-ish
  { name: 'tablet', width: 834, height: 1112 }, // iPad Air-ish
  { name: 'desktop', width: 1440, height: 900 },
];

async function getHorizontalOverflow(page: any) {
  return await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
}

async function assertNotClippedWithinViewport(page: any, locator: any) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  const vw = page.viewportSize()?.width ?? 0;
  expect(box.x).toBeGreaterThanOrEqual(-2);
  expect(box.x + box.width).toBeLessThanOrEqual(vw + 2);
}

for (const vp of viewports) {
  test.describe(`${vp.name} layout`, () => {
    test(`no overflow and key CTAs visible (${vp.width}×${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'networkidle' });

      // Basic structure
      await expect(page.locator('main')).toBeVisible();

      // Key copy present (hero / trust / services / reviews / cta)
      const h1 = page.getByRole('heading', { name: /Trusted dental care/i });
      const trustH2 = page.getByRole('heading', { name: /Care you can/i });
      const servicesH2 = page.getByRole('heading', { name: /Plain prices/i });
      const reviewsH2 = page.getByRole('heading', { name: /stars from/i });
      const ctaH2 = page.getByRole('heading', { name: /Reserve/i });

      await expect(h1).toBeVisible();
      await expect(trustH2).toBeVisible();
      await expect(servicesH2).toBeVisible();

      // Scroll down for later headings so we don't fail due to lazy rendering
      await trustH2.scrollIntoViewIfNeeded();
      await expect(trustH2).toBeVisible();
      await servicesH2.scrollIntoViewIfNeeded();
      await expect(servicesH2).toBeVisible();
      await reviewsH2.scrollIntoViewIfNeeded();
      await expect(reviewsH2).toBeVisible();
      await ctaH2.scrollIntoViewIfNeeded();
      await expect(ctaH2).toBeVisible();

      // Overflow guard (allow tiny subpixel drift / WebGL rounding)
      const overflowX = await getHorizontalOverflow(page);
      expect(overflowX).toBeLessThanOrEqual(12);

      // Hero CTA buttons should be visible at top without overlap
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
      const heroBook = page.getByRole('button', { name: /Book Appointment/i }).first();
      const heroWhatsApp = page.getByRole('button', { name: /WhatsApp/i }).first();
      await expect(heroBook).toBeVisible();
      await expect(heroWhatsApp).toBeVisible();

      await assertNotClippedWithinViewport(page, heroBook);
      await assertNotClippedWithinViewport(page, heroWhatsApp);

      // CTA section contact blocks should not clip horizontally
      await ctaH2.scrollIntoViewIfNeeded();
      const cta = page.locator('#scene-cta');
      const office = cta.getByText(/Office 603/i).first();
      const timing = cta.getByText(/1:00 PM — 9:00 PM/i).first();
      const phone = cta.getByText(/\+971 58 588 6915/i).first();

      await expect(office).toBeVisible();
      await expect(timing).toBeVisible();
      await expect(phone).toBeVisible();

      await assertNotClippedWithinViewport(page, office);
      await assertNotClippedWithinViewport(page, timing);
      await assertNotClippedWithinViewport(page, phone);
    });
  });
}

