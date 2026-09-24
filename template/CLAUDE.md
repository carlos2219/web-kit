# __NAME__ — sitio web

Vite + React 19 + Tailwind v4, lint con Oxlint. `npm run dev | build | lint | check`.
Hecho con el plugin **web-kit**: el flujo completo está en la skill `web-kit:new-site`.

## Leer antes de cambiar algo

- `README.md`: directiva de marca, tono y reglas. **Prevalece** ante cualquier conflicto.
- `DESIGN.md`: sistema visual (tokens, tipografía, componentes, motion, dirección de arte). Los tokens ya están en `src/index.css`.
- `docs/site.md`: spec multipágina y todo el copy por idioma. Es la guía de implementación.

## Reglas duras

- **Nunca** llevar contenido de `privado/` al sitio, al código ni a commits.
- El copy vive en `src/content/site.js` (un campo `<clave>_<idioma>` por cada idioma en `LANGS`, leído con `t()`). No hardcodear strings visibles en componentes.
- Flujo del copy: `docs/site.md` → `site.js`. Si cambias uno, sincroniza el otro (skill `web-kit:site-copy`).
- Colores, fuentes y radios solo desde los tokens de `src/index.css`. No usar la paleta por defecto de Tailwind, hex sueltos ni dependencias nuevas sin motivo.
- Assets generados en `public/assets/`, con su prompt en `docs/assets.md` (skill `web-kit:assets`).

## Verificación

Los hooks de web-kit revisan cada edición (lint, tokens, copy). Antes de dar un cambio por terminado: `npm run check`, y revisar visualmente en todos los idiomas y en móvil (skill `web-kit:design-loop`).

## Publicar y mejorar

Publicar o actualizar el sitio: skill `web-kit:publish` (Cloudflare Pages, gratis). Presupuesto y servicios contratados: `README.md` §9. El usuario puede no ser desarrollador: habla simple, propone y pide corrección, y nunca gastes dinero ni crees cuentas sin su sí.
