# web-kit

Plugin de Claude Code para construir sitios web anti-slop de forma repetible. Nació de enso (`../engineering_services`).

## Uso

En Claude Code, desde la carpeta donde quieras crear el sitio:

```
/web-kit:new-site
```

Responde la entrevista de una vez. Después el pipeline avanza solo y te pide aprobación en tres puntos: el **brief**, la **spec con el copy** y el **piloto** (el hero y la navegación). Si cortas la sesión, abre Claude Code en el sitio y corre `/web-kit:new-site` otra vez: detecta la fase por los archivos y continúa.

| Skill | Qué hace |
|---|---|
| `new-site` | Orquesta el pipeline: brief → estructura base → DESIGN.md → spec y copy → piloto → páginas → assets → lanzamiento. |
| `design-system` | Arma `DESIGN.md` a partir de referencias (getdesign.md, archivos o URLs) y lo convierte en tokens, fuentes y favicon. |
| `design-loop` | Toma capturas en escritorio y móvil, las compara con la referencia, puntúa con `rubric.md` y corrige, hasta que pase. |
| `site-copy` | Sincroniza el copy entre spec → `site.js` en N idiomas, con reglas de redacción. |
| `assets` | Dirección de arte → prompts para Higgsfield → optimización → registro en `docs/assets.md`. |
| `retro` | Convierte cada corrección tuya en una regla, skill o parte de la plantilla, para el próximo sitio. |

Automático en cada edición (hook), solo en sitios web-kit: oxlint, tokens de diseño (sin paleta por defecto, hex sueltos, emojis ni texto hardcodeado) y copy (idiomas completos, sin jerga de IA ni términos vetados de la marca).
Antes de publicar: `node scripts/check.mjs launch` en el sitio.

## Instalación (una vez por máquina)

```bash
claude plugin marketplace add "C:\Users\carlos\OneDrive\CH\Profesional\web-kit"
claude plugin install web-kit@web-kit
```

Opcional: Higgsfield (`npm i -g @higgsfield/cli`, luego `higgsfield auth login` y `npx skills add higgsfield-ai/skills`), ffmpeg (`winget install Gyan.FFmpeg`) y la extensión Claude in Chrome, que usa el design loop.

## Mejorar el kit

Al terminar cada fase o sitio, corre `/web-kit:retro`. Por cada edición del kit: sube `version` en `.claude-plugin/plugin.json`, haz commit, y luego corre `claude plugin marketplace update web-kit` y `claude plugin update web-kit@web-kit`.

## Estructura

```
.claude-plugin/   plugin.json + marketplace.json (marketplace local)
hooks/            on-edit.cjs: lint y checks tras cada Write/Edit
scripts/          check.mjs (copy | design | launch), new-site.mjs (crea la estructura base)
skills/           las 6 skills
template/         sitio base: Vite + React 19 + Tailwind v4, router sin dependencias, copy en N idiomas
```

Límites conocidos: el sitio es una SPA renderizada en el cliente, así que los meta tags por página se aplican con JS. Si el SEO o las previsualizaciones en redes sociales se vuelven críticos, agrega prerender.
