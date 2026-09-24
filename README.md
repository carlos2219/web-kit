# web-kit

**De una idea a un sitio web publicado, con calidad de estudio, conversando con Claude Code.**
No necesitas saber programar, y puede costarte cero.

[English](README.en.md) · [Guía paso a paso](docs/guia.md)

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
| [Higgsfield](https://higgsfield.ai/cli) | Generar imágenes y animaciones | Solo con presupuesto |

## Instalación

```bash
claude plugin marketplace add carlos2219/web-kit
claude plugin install web-kit@web-kit
```

Reinicia Claude Code. Dentro de una sesión también funciona `/plugin marketplace add carlos2219/web-kit`.

## Uso

Abre Claude Code en la carpeta donde quieras crear el sitio y escribe:

```
/web-kit:new-site
```

Cuéntale la idea en una o dos frases. Claude te guía por estas fases:

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

| Skill | Qué hace |
|---|---|
| `new-site` | Guía todo el proceso, desde la idea hasta la publicación, y retoma donde quedaste |
| `design-system` | Direcciones visuales, `DESIGN.md`, colores, fuentes y favicon (acepta [getdesign.md](https://getdesign.md) y URLs) |
| `design-loop` | Capturas en escritorio y móvil, evaluación con [rúbrica](skills/design-loop/rubric.md) contra la referencia y correcciones |
| `site-copy` | Textos en N idiomas, sincronizados entre la spec y el código, con reglas anti-jerga |
| `assets` | Tus fotos y videos listos para la web, animaciones CSS/SVG, imágenes generadas con Higgsfield e imagen de vista previa para compartir |
| `publish` | Publicación gratis y actualizaciones; Google (Search Console, Business Profile); dominio, correo, formulario y analítica |
| `retro` | Convierte tus correcciones en reglas del kit |

Además, un **chequeo automático tras cada edición** (solo en sitios web-kit) bloquea los errores típicos del diseño hecho por IA: la paleta por defecto de Tailwind, colores fuera del sistema, emojis usados como íconos, texto escrito directo en el código, traducciones incompletas y frases como "soluciones de vanguardia". Antes de publicar, `check.mjs launch` revisa que no queden huecos sin llenar y que cada página tenga título y descripción.

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

Cada página se compila como HTML propio, con su título, descripción y vista previa. Así los enlaces compartidos por WhatsApp o redes muestran la página correcta, y se generan `sitemap.xml` y `robots.txt` para Google.

## Licencia

[MIT](LICENSE)
