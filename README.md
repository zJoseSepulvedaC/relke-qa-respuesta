# 🧪 QA Playwright Challenge – Relke

Este repositorio contiene mi solución para el desafío técnico de automatización QA solicitado por Relke. La prueba fue realizada utilizando Playwright con TypeScript, y automatiza el flujo completo de creación de una Nota de Venta.

¿Qué automatización agregue a la solución?

El test automatizado realiza lo siguiente:

1. Inicia sesión con las credenciales entregadas, en este caso desde el código y no almacenado en Storage o DB.
2. Navega a la sección de Ventas > Notas de venta.
3. Crea una nueva nota con los datos mínimos requeridos:
   - Sucursal: Casa matriz
   - Bodega: Principal
   - Cliente: primero disponible
   - Moneda: Pesos
   - Producto: primero disponible
4. Verifica que:
   - Se calcula un total mayor a $0
   - La nota se guarda correctamente
   - Aparece en el listado final con el total reflejado

Todo el flujo fue validado sin usar esperas estáticas (`waitForTimeout`) y con selectores lo más estables posible.

Elegí mantener el código simple y claro, priorizando la estabilidad de los selectores y validaciones relevantes según lo que se pide. Usé getByRole, getByLabel y locator para evitar depender de clases que puedan cambiar.

Decidí no usar POM ya que era un solo flujo y el foco era más en validar correctamente que en estructurar en exceso.

¿Como usar el test?

Primero clona este repo y paráte en la carpeta del proyecto:

```bash
git clone https://github.com/tu_usuario/relke-qa-respuesta.git
cd relke-qa-respuesta

```
