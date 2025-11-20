// tests/input-validado.spec.ts
import { test, expect } from '@playwright/test';

test.describe('InputValidado', () => {
  test.beforeEach(async ({ page }) => {
    // Navega a la página principal (usa baseURL del config)
    await page.goto('/');
  });

  test('no permite números ni caracteres especiales', async ({ page }) => {
    const input = page.locator('input[type="text"]');

    await input.fill('abc123');
    // Busca el mensaje de error específico
    const error = page.getByText('Solo se permiten letras (sin números ni caracteres especiales).');

    await expect(error).toBeVisible();
    await expect(page.getByText('Valor válido.')).toHaveCount(0);
  });

  test('muestra error si hay 3 caracteres o menos', async ({ page }) => {
    const input = page.locator('input[type="text"]');

    await input.fill('abc'); // 3 caracteres
    const error = page.getByText('Debe tener más de 3 caracteres.');

    await expect(error).toBeVisible();
    await expect(page.getByText('Valor válido.')).toHaveCount(0);
  });

  test('muestra error si hay 7 caracteres o más', async ({ page }) => {
    const input = page.locator('input[type="text"]');

    await input.fill('abcdefg'); // 7 caracteres
    const error = page.getByText('Debe tener menos de 7 caracteres.');

    await expect(error).toBeVisible();
    await expect(page.getByText('Valor válido.')).toHaveCount(0);
  });

  test('marca como válido cuando hay entre 4 y 6 letras', async ({ page }) => {
    const input = page.locator('input[type="text"]');

    await input.fill('abcd'); // 4 letras
    const mensajeValido = page.getByText('Valor válido.');

    await expect(mensajeValido).toBeVisible();
    await expect(page.getByText('Solo se permiten letras')).toHaveCount(0);
    await expect(page.getByText('Debe tener más de 3 caracteres.')).toHaveCount(0);
    await expect(page.getByText('Debe tener menos de 7 caracteres.')).toHaveCount(0);
  });
});
