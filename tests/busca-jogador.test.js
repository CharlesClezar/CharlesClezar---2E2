import { test, expect } from '@playwright/test';
const url = 'https://www.transfermarkt.com.br/'

test('Busca por um jogador usando a pesquisa', async ({ page }) => {
  await page.goto(url);
  await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();
  await page.getByPlaceholder('Procurar jogador, técnico,').click();
  await page.getByPlaceholder('Procurar jogador, técnico,').fill('lionel messi');
  await page.getByPlaceholder('Procurar jogador, técnico,').press('Enter');
  await page.getByText('Lionel Messi').click();
  
   // Verifica se a URL é a esperada
   await expect(page).toHaveURL('https://www.transfermarkt.com.br/lionel-messi/profil/spieler/28003');
});

test('Verifica se um jogador que já ganhou copa do mundo possui o titulo em sua pagina', async ({ page }) => {
    await page.goto(url);
    await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();
    await page.getByPlaceholder('Procurar jogador, técnico,').click();
    await page.getByPlaceholder('Procurar jogador, técnico,').fill('lionel messi');
    await page.locator('#schnellsuche').getByRole('button').click();
    await page.getByRole('link', { name: 'Lionel Messi' }).first().click();
    await page.getByText('Lionel Messi').click();
    
  
    await expect(page.getByRole('link', { name: 'Campeão do Mundo' })).toBeVisible();
  });