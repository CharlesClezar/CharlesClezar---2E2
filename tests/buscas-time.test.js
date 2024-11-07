import { test, expect } from '@playwright/test';
const url = 'https://www.transfermarkt.com.br/'

test('Usando filtros, verifica se o titulo da copa do brasil está aparecendo para algum time que já ganhou', async ({ page }) => {
  await page.goto(url);
  await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();
  await page.getByRole('link', { name: 'Competições' }).click();
  await page.getByRole('button', { name: 'Competição' }).click();
  await page.getByText('Campeonato Brasileiro Série A').click();
  await page.locator('#search-teams').fill('crici');
  await page.getByText('Criciúma EC').click();
  await page.getByRole('button', { name: 'Jogadores' }).click();
  await page.locator('tm-quick-select button').nth(2).click();

  await expect(page.getByRole('link', { name: 'Campeão da Copa do Brasil' })).toBeVisible();
});

test('Verifica os artilheiros de um determinado time', async ({ page }) => {
  await page.goto(url);
  await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();
  await page.getByPlaceholder('Procurar jogador, técnico,').click();
  await page.getByPlaceholder('Procurar jogador, técnico,').fill('criciuma ec');
  await page.getByPlaceholder('Procurar jogador, técnico,').press('Enter');
  await page.locator('#schnellsuche').getByRole('button').click();
  await page.getByRole('link', { name: 'Criciúma EC', exact: true }).click();
  await page.getByRole('link', { name: 'História', exact: true }).click();
  await page.getByRole('link', { name: 'Artilheiros', exact: true }).click();

  await expect(page.getByRole('cell', { name: '1', exact: true })).toBeVisible();
});