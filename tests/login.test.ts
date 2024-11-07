import { test, expect } from '@playwright/test';

test('Acessando a area de login e preenchendo sem Captcha (deve retornar erro)', async ({ page }) => {
  await page.goto('https://www.transfermarkt.com.br/');
  await page.locator('iframe[title="Iframe title"]').contentFrame().getByLabel('Aceitar e continuar').click();

  // Acessa a area de login
  await page.getByRole('button', { name: 'Log-In' }).click();
  await page.getByRole('link', { name: 'Inscreva-se agora' }).click();

  //Deve acessar a URL de login
  await expect(page).toHaveURL('https://www.transfermarkt.com.br/profil/registrieren');

  //Preencher os campos
  await page.getByLabel('Nome de usuário*').click();
  await page.getByLabel('Nome de usuário*').fill('UsuarioTeste');
  await page.locator('#vorname').click();
  await page.locator('#vorname').fill('Usuario Teste');
  await page.locator('#nachname').click();
  await page.locator('#nachname').fill('Teste');
  await page.getByLabel('E-Mail*').click();
  await page.getByLabel('E-Mail*').fill('usuario@teste.com');
  await page.locator('#RegisterForm_email2').click();
  await page.locator('#RegisterForm_email2').fill('usuario@teste.com');
  await page.locator('#passwort1').click();
  await page.locator('#passwort1').fill('TesteUsuario123456@');
  await page.locator('#passwort2').click();
  await page.locator('#passwort2').fill('TesteUsuario123456@');
  await page.locator('#RegisterForm_nutzungsbedingungen_flag').check();
  await page.locator('#RegisterForm_newsletter_flag').check();
  await page.getByRole('button', { name: 'Inscreva-se agora' }).click();

  //Deve retornar erro de quizCaptcha
  await expect(page.getByText('quizCaptcha contém termos inv')).toBeVisible();
});