import { test, expect } from '@playwright/test';
const url = 'https://www.transfermarkt.com.br/'

test('Verifica se há transferencia sendo listada', async ({ page }) => {
  await page.goto(url);
  await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();
  await page.getByRole('link', { name: 'Transferências e Rumores' }).click();
  await page.getByRole('link', { name: 'Principais transferências', exact: true }).click();

  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
});