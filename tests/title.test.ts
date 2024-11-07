import { test, expect } from '@playwright/test';
const url = 'https://www.transfermarkt.com.br/'

test('Verifica se o titulo da pagina está correto', async ({ page }) => {
    await page.goto(url);
    
    // Verifica se o titulo da pagina está correto
    await expect(page).toHaveTitle('Mercado de transferências, rumores, valores de mercado e notícias | Transfermarkt');
});