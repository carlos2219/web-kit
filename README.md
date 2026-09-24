# web-kit

**De una idea a un sitio web publicado, con calidad de estudio, conversando con Claude Code.**
No necesitas saber programar, y puede costarte cero.

[English](README.en.md) · [Guía paso a paso](docs/guia.md)

## Inicio rápido

```bash
claude plugin marketplace add carlos2219/web-kit   # instalar (una vez)
claude plugin install web-kit@web-kit
mkdir mi-sitio && cd mi-sitio && claude --chrome    # abrir en la carpeta del sitio
```

Dentro de Claude Code escribe `/web-kit:new-site` y cuenta tu idea. Claude te guía por todo lo demás.

| Comando | Úsalo para |
|---|---|
| `/web-kit:new-site` | Empezar un sitio, retomarlo o saber qué sigue |
| `/web-kit:design-loop` | Pulir algo que no te convence visualmente |
| `/web-kit:design-system` | Cambiar colores, tipografía o estilo |
| `/web-kit:site-copy` | Cambiar o traducir textos |
| `/web-kit:assets` | Preparar tus fotos y videos, o generar imágenes y animaciones |
| `/web-kit:publish` | Publicar, actualizar, conectar un dominio, aparecer en Google |
| `/web-kit:retro` | Al terminar: convierte tus correcciones en mejoras del kit |

No hace falta memorizarlos. Pedir en lenguaje normal también funciona: *"se ve muy apagado"*, *"cambia el título del inicio"*, *"publica los cambios"*, *"ya compré un dominio"*.

## Por qué web-kit

web-kit es un plugin para [Claude Code](https://claude.com/claude-code). Convierte "hazme una página web" en un proceso guiado:

- **Claude te pregunta de a poco.** Te propone borradores y opciones para elegir, y tú corriges. No hay formularios largos ni jerga.
- **Ves lo que se construye.** Te muestra capturas de cada paso y te pide opinión.
- **Diseño con criterio, no "hecho por IA".** Parte de referencias reales, define un sistema visual (`DESIGN.md`) y compara el resultado contra la referencia hasta que esté a la altura.
- **Gratis por defecto.** Publica en Cloudflare Pages sin costo. El dominio propio, las animaciones generadas y demás extras de pago se agregan cuando quieras, sin rehacer el sitio, y nunca sin preguntarte.
- **Mejora con cada sitio.** Lo que corrijas se convierte en reglas para el siguiente.

## Qué necesitas

| | Para qué | Obligatorio |
|---|---|---|
| [Claude Code](https://claude.com/claude-code) | Es donde trabajas | Sí |
| [Node.js](https://nodejs.org) 22 o superior | Construir el sitio | Sí |
| [Git](https://git-scm.com) | Guardar versiones | Sí |
| Extensión Claude in Chrome (iniciar con `claude --chrome`) | Que Claude vea el sitio y lo compare con la referencia | Recomendado |
| [ffmpeg](https://ffmpeg.org) (`winget install Gyan.FFmpeg` · `brew install ffmpeg`) | Preparar tus fotos y videos para la web | Si usas material propio |
| [Higgsfield](https://higgsfield.ai/cli) | Generar imágenes y animaciones | Solo con presupuesto |

## Uso

Al escribir `/web-kit:new-site`, Claude te guía por estas fases:

| Fase | Qué te pide Claude | Qué obtienes |
|---|---|---|
| 1. Idea | Objetivo, acción principal (WhatsApp, formulario…), idiomas y presupuesto, con opciones para elegir. Después corriges un borrador del brief. | La directiva de marca en `README.md` y el proyecto creado |
| 2. Dirección visual | Elegir entre 3 direcciones con capturas de referencia | `DESIGN.md`: colores, tipografía, animación y dirección de arte |
| 3. Contenido | Aprobar el mapa del sitio y los titulares | `docs/site.md`, con todo el texto en cada idioma |
| 4. Piloto | Opinar sobre el inicio del sitio en escritorio y móvil | Un hero pulido que marca el estilo del resto |
| 5. Páginas | Revisar la captura de cada página | El sitio completo |
| 6. Visuales | Aprobar qué se genera y cuánto cuesta (si hay presupuesto) | Imágenes y animaciones coherentes entre sí |
| 7. Publicación | Crear una cuenta gratis de Cloudflare cuando te lo indique | El sitio en línea en `tusitio.pages.dev` |

¿Cortaste a mitad de camino? Vuelve a escribir `/web-kit:new-site`: detecta en qué fase quedó y sigue. Para cambios posteriores, basta con pedirlos: *"cambia el texto del inicio"*, *"publica los cambios"*, *"ya compré un dominio"*.

## Presupuesto

| Necesidad | Gratis | Mejora de pago (opcional) |
|---|---|---|
| Publicar | Cloudflare Pages | — |
| Dirección web | `tusitio.pages.dev` | Dominio propio, unos 10–15 USD al año |
| Correo `hola@tudominio` | Reenvío a tu Gmail | Enviar desde el dominio, unos 1–7 USD al mes |
| Contacto | WhatsApp o formulario con Web3Forms (250 mensajes al mes) | — |
| Estadísticas | Cloudflare Web Analytics | — |
| Aparecer en Google | Search Console y perfil de Google Business (negocios locales) | — |
| Imágenes y animación | Tus fotos y videos (comprimidos, sin datos GPS), animaciones con código | Higgsfield, desde unos 9 USD al mes |

Precios de referencia a septiembre de 2026. Claude verifica el precio vigente antes de recomendarte algo.

## Qué incluye

Siete skills (los comandos del inicio rápido), más un **chequeo automático tras cada edición** (solo en sitios web-kit) bloquea los errores típicos del diseño hecho por IA: la paleta por defecto de Tailwind, colores fuera del sistema, emojis usados como íconos, texto escrito directo en el código, traducciones incompletas y frases como "soluciones de vanguardia". Antes de publicar, `check.mjs launch` revisa que no queden huecos sin llenar y que cada página tenga título y descripción.

Cada página se compila como HTML propio, con su título, descripción y vista previa. Así los enlaces compartidos por WhatsApp o redes muestran la página correcta, y se generan `sitemap.xml` y `robots.txt` para Google.

La plantilla del sitio usa Vite, React 19, Tailwind v4 y Oxlint, con un router sin dependencias y el copy separado del código.

## Estructura

```
.claude-plugin/   manifiesto del plugin y marketplace
hooks/            chequeo automático tras cada edición
scripts/          check.mjs (copy | design | launch) · new-site.mjs (crea el proyecto)
skills/           las 7 skills
template/         sitio base que se copia en cada proyecto nuevo
docs/guia.md      guía paso a paso para principiantes
```

## Contribuir

Los issues y pull requests son bienvenidos, sobre todo reglas nuevas para `scripts/check.mjs` o la [rúbrica](skills/design-loop/rubric.md) que atrapen errores reales. Si lo modificas para ti: haz fork, clónalo y regístralo con `claude plugin marketplace add <ruta-del-clon>`. La skill `retro` edita tu copia. Tras cada cambio, sube `version` en `.claude-plugin/plugin.json` y corre `claude plugin marketplace update web-kit` y `claude plugin update web-kit@web-kit`.

## Licencia

[MIT](LICENSE)
