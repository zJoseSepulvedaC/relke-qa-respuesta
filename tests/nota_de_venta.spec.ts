import { test, expect } from "@playwright/test";

test("Login y navegación inicial a Nota de Venta", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Correo Electrónico").fill("qa_junior@relke.cl");
  await page.getByPlaceholder("Contraseña").fill("Demo123456!");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await page.click(".navbar-brand");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Ventas " }).click();
  await page.getByRole("link", { name: "Notas de venta" }).click();
  await page.waitForSelector("#btn-new-invoice", { timeout: 3000 });

  await expect(page.getByText("Mostrar:")).toBeVisible();

  // Click en "Crear nueva nota"
  await page.click("#btn-new-invoice");

  // Espera que cargue el formulario
  await page.waitForSelector("form");

  // Seleccionar "Casa matriz" en sucursal
  await page.getByLabel("Sucursal").selectOption({ label: "Casa matriz" });

  // Seleccionar "Principal" en bodega
  await page.getByLabel("Bodega").selectOption({ label: "Principal" });

  // Seleccionar cliente (elige el primero del listado si es un dropdown)
  await page.click('[data-test="cliente-select"]'); // Ajusta selector si es necesario
  await page.getByRole("option").first().click();

  // Seleccionar "Pesos" como moneda
  await page.getByLabel("Moneda").selectOption({ label: "Pesos" });

  // Agregar producto (usa campo de búsqueda si hay)
  await page.click('[data-test="agregar-producto"]'); // Ajusta si cambia el selector
  await page.getByRole("option").first().click();

  // Esperar que aparezca el total
  const totalField = page.locator('[data-test="total-venta"]'); // Ajusta selector según DOM
  await expect(totalField).toBeVisible();

  const totalText = await totalField.innerText();
  const totalNumber = Number(totalText.replace(/\D/g, ""));

  // Validar que el total sea mayor a 0
  expect(totalNumber).toBeGreaterThan(0);

  // Guardar
  await page.click('[data-test="guardar-nota"]'); // Ajustar al botón correcto

  // Validar que vuelve al listado y aparece la nota
  await page.waitForSelector("table"); // Asegurarse de volver a la lista
  await expect(page.locator("table")).toContainText(totalText);
});
